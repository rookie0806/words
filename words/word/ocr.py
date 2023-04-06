import re
import pdfplumber
import openpyxl
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.files.base import ContentFile, File
from . import models, serializers
from rest_framework.permissions import AllowAny
import datetime
from django.db.models import Q
from datetime import date
import os
from django.views.decorators.csrf import csrf_exempt   
import json 
from django.utils.decorators import method_decorator
from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
import csv

def pdftoexcel(savename,name):
    print (os.getcwd ())
    scriptpath = os.path.dirname(__file__)
    filename = os.path.join(scriptpath, '../media/excelfile/sample.xlsx')
    wb =openpyxl.load_workbook(filename)
    sheet = wb.get_sheet_by_name('Sheet1')
    sheet['A2'] = "test"
    regex = r"\d+\s\w+\s\d+\s[a-zA-Z]+\s\d+\s\w+\s"
    code = 5004
    invoceorder = 1
    invoceorder2 = 1
    lastinvoicenum = "0"
    previnvocenum = "1234567890" 
    prevnum = 0
    scriptpath = os.path.dirname(__file__)
    filename = os.path.join(scriptpath, '../media/pdffile/'+savename+".pdf")
    print(filename)
    with pdfplumber.open(filename) as pdf:
        for i in range(0,len(pdf.pages)):
            page = pdf.pages[i]
            text = page.extract_text()
            text = text.replace(",","").replace(".","")
            if "Delivery note" in text and "nvoice" not in text:
                pass
            else:
                #print("---------------------------------------------",i)
                #print(text)
                #print("---------------------------------------------",i)
                try:
                    invocenum = text.split('dat')[1].split(' ')[1].split(' ')[0]
                    try:
                        invocenum = invocenum.split('\n')[0]
                    except:
                        pass
                    invocenum = invocenum.replace('C','0')
                    #print(invocenum,"test")
                    #print(previnvocenum)
                    for k in range(0,prevnum):
                        if((len(sheet['C'+str(invoceorder-k)].value)<8 or sheet['C'+str(invoceorder-k)].value.isdigit()==False) and invoceorder!=1):
                            #print("YESS!")
                            #print(sheet['C'+str(invoceorder-k)].value)
                            #print(invoceorder)
                            sheet['C'+str(invoceorder-k)] = invocenum
                            if(sheet['C'+str(invoceorder-k-1)]==invocenum):
                                sheet['B'+str(invoceorder-k)] = int(sheet['B'+str(invoceorder-k-1)].value) + 1
                            else:
                                sheet['B'+str(invoceorder-k)] = 1
                            #print(sheet['C'+str(invoceorder-i)].value)
                    #previnvocenum = str(invocenum)
                    invocelist = re.findall(regex, text) 
                    prevnum = 0
                    for j in range(0,len(invocelist)):
                        #print(invocelist[j])
                        invoce = invocelist[j].split(' ')
                        materialid = invoce[1]
                        quanitity = invoce[2]
                        unit = invoce[3]
                        if(unit=='c'):
                            unit = 'PC'
                        if(len(invocenum)>=5 and len(materialid)>=9):
                            if(lastinvoicenum!=invocenum):
                                invoceorder2 = 1
                            sheet['A'+str(invoceorder+1)] = code
                            sheet['B'+str(invoceorder+1)] = invoceorder2
                            sheet['C'+str(invoceorder+1)] = invocenum
                            sheet['D'+str(invoceorder+1)] = materialid
                            sheet['E'+str(invoceorder+1)] = ""
                            sheet['F'+str(invoceorder+1)] = quanitity
                            sheet['G'+str(invoceorder+1)] = unit
                            #print(lastinvoicenum,code,invoceorder,invocenum,materialid,"",quanitity,unit)
                            invoceorder = invoceorder + 1
                            invoceorder2 = invoceorder2 + 1
                            lastinvoicenum = invocenum
                            prevnum = prevnum + 1
                            
                except Exception as e:
                    #print(e)
                    pass
    name = name.split('.pdf')[0] + ".xlsx"
    scriptpath = os.path.dirname(__file__)
    filename = os.path.join(scriptpath, "../media/excelfile/"+name)
    wb.save(filename)
    print(filename)
    with open(filename, 'rb') as f:
        tmp = models.ExcelFile.objects.create(name=name,excelfile=File(f, name=os.path.basename(f.name)))
        tmp.save()
        return tmp
 