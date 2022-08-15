import os
import csv
from uuid import uuid4
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
import django
django.setup()
from django.core.files import File
from PIL import Image as ING
from words.word.models import Word,Sclass,BookName
from django.core.files.temp import NamedTemporaryFile

f = open('test.csv','r', encoding="UTF-8")
rdr = csv.reader(f)
Word.objects.all().delete()
print("Start")
for line in rdr:
    tmp = Word.objects.create(book_name=line[0],day=int(line[1].split('일')[0]),word_eng=line[2])
    tmp.save()
    try:
        test = BookName.objects.get(name=line[0])
    except:
        tmp_b = BookName.objects.create(name=line[0])
        tmp_b.save()
   

print("Done")
