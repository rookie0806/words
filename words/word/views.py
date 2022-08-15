from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from . import models, serializers
from rest_framework.permissions import AllowAny
import datetime
from django.db.models import Q
from datetime import date
import os
from django.views.decorators.csrf import csrf_exempt   
import json 
from django.utils.decorators import method_decorator
class Search(APIView):
    def get(self, request, format=None):
        student_search = request.query_params.get('name', None)
        if student_search is not None:
            std = models.Student.objects.filter(Q(name__contains=student_search)|Q(sclasss__name__contains=student_search)).order_by('-uuid')
            serializer = serializers.SimpleStudentSerializer(std, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class StudentInfo(APIView):
    def get(self, request, format=None):
        student_id = request.query_params.get('id', None)
        if student_id is not None:
            std = models.Student.objects.get(uuid=student_id)
            serializer = serializers.StudentSerializer(std)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class TestInfo(APIView):
    def get(self, request, format=None):
        uuid = request.query_params.get('uuid', None)
        if uuid is not None:
            test = models.Test.objects.get(uuid=uuid)
            serializer = serializers.TestSerializer(test)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class getStudentTest(APIView):
    def get(self, request, format=None):
        stu_uuid = request.query_params.get('uuid', None)
        if stu_uuid is not None:
            test = models.Test.objects.filter(student=stu_uuid).order_by('-id')
            serializer = serializers.SimpleTestSerializer(test,many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class setTestFail(APIView):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super(MyView, self).dispatch(*args, **kwargs)
    @csrf_exempt
    def post(self, request, format=None):
        uuid = request.data['uuid']
        fail_words = request.data['fail_words']
        test = models.Test.objects.get(uuid=uuid)
        for i in range(0,len(fail_words)):
            print(models.Word.objects.get(uuid=fail_words[i]))
            test.fail_words.add(models.Word.objects.get(uuid=fail_words[i]).id)
        test.save()
        return Response(status=status.HTTP_201_CREATED)

class StudentRegister(APIView):
    def post(self,request,format=None):
        serializer = serializers.StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Maketest(APIView):
    permission_classes = ()
    authentication_classes = ()
    @csrf_exempt
    def post(self,request,format=None):
        try:
            start_day = int(request.data['start_day'])
            end_day = int(request.data['end_day'])
            cnt = int(request.data['cnt']) #percent로 받음
            uuid = request.data['uuid']
            book_name = request.data['book_name']
            test_date = request.data['test_date']
            length = len(models.Word.objects.filter(Q(book_name=book_name)&Q(day__gte=start_day)&Q(day__lte=end_day)))
            much = 105
            if(int(length*cnt/100)<105):
                much = int(length*cnt/100)
            data = models.Word.objects.filter(Q(book_name=book_name)&Q(day__gte=start_day)&Q(day__lte=end_day)).order_by('?')[:much]
            user = models.Student.objects.get(uuid=uuid)
            today = datetime.datetime(int(test_date.split('-')[0]),int(test_date.split('-')[1]),int(test_date.split('-')[2]))
            new_test = models.Test.objects.create(student=user,test_date=today,start_day=start_day,end_day=end_day,book_name=book_name)
            for i in range(0,len(data)):
                new_test.test_words.add(data[i].id)
            new_test.save()
            
            data = {"status" : new_test.uuid}
            return Response(data=data,status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            data = {"status" : "fail"}
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
class getClass(APIView):
    def get(self,request,format=None):
        classes = models.Sclass.dump_bulk()
        return Response(data=classes,status=status.HTTP_200_OK)

class getClassPerson(APIView):
    def get(self,request,format=None):
        classes = request.query_params.get('id', None)
        user = models.Student.objects.filter(sclasss__id=classes)
        print(user)
        if(len(user)!=0):
            if(len(user)==1):
                print(user[0].name)
                user_serializer = serializers.SimpleStudentSerializer(user[0])
                print(user_serializer.data)
                return  Response(data=[user_serializer.data],status=status.HTTP_200_OK)
            else:
                user_serializer = serializers.SimpleStudentSerializer(user,many=True)
                return  Response(data=user_serializer.data,status=status.HTTP_200_OK)
        else:
            return  Response(status=status.HTTP_404_NOT_FOUND)

class setStudentBigo(APIView):
    permission_classes = ()
    authentication_classes = ()
    @csrf_exempt
    def post(self, request, format=None):
        uuid = request.data['uuid']
        bigo = request.data['bigo']
        tmp = models.Student.objects.get(uuid=uuid)
        tmp.bigo = bigo
        tmp.save()
        return Response(status=status.HTTP_200_OK)

class getBook_name(APIView):
    def get(self, request, format=None):
        book_name = models.BookName.objects.all()
        b_serializer = serializers.BookSerializer(book_name,many=True)
        return Response(data=b_serializer.data,status=status.HTTP_200_OK)

class deletebook(APIView):
    def get(self, request, format=None):
        models.Word.objects.all().delete()
        return Response(status=status.HTTP_200_OK)

class deleteTest(APIView):
    def get(self, request, format=None):
        uuid = request.query_params.get('uuid', None)
        try:
            test = models.Test.objects.get(uuid=uuid)
            test.delete()
            data = {"status" : "delete"}
            return Response(data=data,status=status.HTTP_200_OK)
        except:
            data = {"status" : "fail"}
            return Response(data=data,status=status.HTTP_400_BAD_REQUEST)


class failWordRegister(APIView):
    permission_classes = ()
    authentication_classes = ()
    @csrf_exempt
    def post(self, request, format=None):
        uuid = request.data['uuid']
        fail_word = request.data['fail_word']
        try:
            user = models.Student.objects.get(uuid=uuid)
            std = models.FailWord.objects.get(student=uuid)
            std.fail_words.add(models.Word.objects.get(id=fail_word))
            word = models.Word.objects.get(id=fail_word).word_eng
            std.save()
            data = {"word" : word}
            return Response(data=word,status=status.HTTP_200_OK)
        except:
            user = models.Student.objects.get(uuid=uuid)
            std =  models.FailWord.objects.create(student=user)
            std.fail_words.add(models.Word.objects.get(id=fail_word))
            word = models.Word.objects.get(id=fail_word).word_eng
            std.save()
            data = {"word" : word}
            return Response(data=word,status=status.HTTP_200_OK)

class makeExcelAndImg(APIView):
    def get(self, request, format=None):
        uuid = request.query_params.get('uuid', None)
        test = models.Test.objects.get(uuid=uuid)
        return Response(data,status=status.HTTP_200_OK)
        '''if(os.path.isfile(settings.MEDIA_ROOT + "\\image\\"+ uuid + '.png')):
            data = {"url" : "/media/image/"+ uuid + '.png'}
            return Response(data,status=status.HTTP_200_OK)
        else:
            wb=openpyxl.load_workbook(settings.MEDIA_ROOT + '\\excel\\test.xlsx')
            sheet = wb.active
            sheet["P10"] = test.student.name
            sheet["L10"] = test.start_day
            sheet["N10"]= test.end_day
            sheet["P13"]= test.test_date
            test_data = test.test_words.all().order_by('id')
            print(len(test_data))
            start_hang = 16
            end_hang = 63
            day_yul = ["E","I","M"]
            no_yul = ["F","J","N"]
            word_yul = ["G","K","O"]
            start_yul = 0
            cnt = 0
            while start_yul<=3:
                for i in range(start_hang,end_hang+1):
                    if(cnt>=len(test_data)):
                        start_yul = 3
                        break
                    else:
                        sheet[day_yul[start_yul]+str(i)] = test_data[cnt].day
                        sheet[no_yul[start_yul]+str(i)] =  test_data[cnt].id
                        sheet[word_yul[start_yul]+str(i)] =  test_data[cnt].word_eng
                        cnt = cnt + 1
                start_yul = start_yul + 1
            wb.save(settings.MEDIA_ROOT + "\\excel\\"+ uuid + '.xlsx')
            excel2img.export_img(settings.MEDIA_ROOT + "\\excel\\"+ uuid + '.xlsx',settings.MEDIA_ROOT + "\\image\\"+ uuid + '.png',"","Sheet1!D7:Q64")
            data = {"url" : "/media/image/"+ uuid + '.png'}
            return Response(data,status=status.HTTP_200_OK)
        '''