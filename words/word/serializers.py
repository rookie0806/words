from rest_framework import serializers
from . import models
import json
from datetime import datetime, date

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = (
            'name',
            'sclasss',
            'uuid',
            'birth',
            'phone_number',
            'bigo',
        )


class SclassSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    class Meta:
        model = models.Sclass
        fields = ('get_previous','name')
        
    def children(self, object):
        print(object.get_next())
        return json.dumps(object.get_next())

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BookName
        fields = (
            '__all__'
        )

class SimpleStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = (
            'uuid',
            'name',
            'birth',
        )

class WordSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Word
        fields = (
            'book_name',
            'day',
            'word_eng',
            'id',
            'uuid'
        )

class TestSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    test_words = serializers.SerializerMethodField() 
    class Meta:
        model = models.Test
        fields = (
            'student',
            'test_date',
            'start_day',
            'end_day',
            'book_name',
            'uuid',
            'test_words',
        )
    def get_test_words(self, instance):
        songs = instance.test_words.all()#.order_by('id')
        return WordSerializer(songs, many=True).data

class SimpleTestSerializer(serializers.ModelSerializer):
    test_words_count = serializers.SerializerMethodField()
    fail_words_count = serializers.SerializerMethodField()
    test_day = serializers.SerializerMethodField()
    class Meta:
        model = models.Test
        fields = (
            'student',
            'test_date',
            'start_day',
            'end_day',
            'book_name',
            'uuid',
            'test_words_count',
            'fail_words_count',
            'score',
            'test_day'
        )
    def get_test_day(self, instance):
        days = ['월', '화', '수', '목', '금', '토', '일']
        day = instance.test_date.weekday()
        return days[day]

    def get_test_words_count(self, obj):
        test = models.Test.objects.get(uuid=obj.uuid).test_words.count()
        return test
    def get_fail_words_count(self, obj):
        test = models.Test.objects.get(uuid=obj.uuid).fail_words.count()
        return test