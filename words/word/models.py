from django.db import models
from birthday import BirthdayField, BirthdayManager
from treebeard.mp_tree import MP_Node
import uuid
# Create your models here.
class Word(models.Model):
    book_name = models.CharField(max_length=50,null=True)
    day = models.IntegerField(null=True)
    word_eng  = models.CharField(max_length=50,null=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    def __str__(self):
        return '{} - {}'.format(self.book_name, self.word_eng)

class FailWord(models.Model):
    student  = models.ForeignKey('Student',related_name='word_std',on_delete=models.PROTECT)
    fail_words = models.ManyToManyField(Word,related_name='word_fail',null=True, blank=True)

class BookName(models.Model):
    name = models.CharField(max_length=50,null=True)
    def __str__(self):
        return '{}'.format(self.name)

class Test(models.Model):
    student = models.ForeignKey('Student',related_name='std_test',on_delete=models.PROTECT)
    score = models.BooleanField(default=False)
    test_date = BirthdayField(null=True)
    start_day = models.IntegerField(null=True)
    end_day = models.IntegerField(null=True)
    book_name = models.CharField(max_length=50,null=True)
    test_words = models.ManyToManyField(Word,related_name='test_word',null=True, blank=True)
    fail_words = models.ManyToManyField(Word,related_name='fail_word',null=True, blank=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    def __str__(self):
        return '{} - {}'.format(self.student, self.test_date)

class Sclass(MP_Node):
    name = models.CharField(max_length=50,null=True)
    node_order_by = ['name']

    def get_previous(self): 
        if not self.is_root():            
            return self.get_prev_sibling() 

    def get_next(self): 
        if not self.is_root():            
            return self.get_next_sibling()

    def get_is_root(self):
        return self.is_root()

    def __str__(self):        
        return self.name

class Student(models.Model):
    name = models.CharField(max_length=50,null=True)
    birth =  BirthdayField(null=True)
    phone_number = models.CharField(max_length=50,null=True)
    bigo = models.TextField(max_length=300)
    sclasss = models.ManyToManyField(Sclass,related_name='std_class')
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    def __str__(self):
        return self.name



