from django.contrib import admin
from . import models
from treebeard.forms import movenodeform_factory
from treebeard.admin import TreeAdmin



# Register your models here.
@admin.register(models.Word)
class WordAdmin(admin.ModelAdmin):
    list_display = (
        'book_name',
        'day',
        'word_eng',
        'word_kor',
        'uuid'
    )

# Register your models here.
@admin.register(models.BookName)
class WordAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )

# Register your models here.
@admin.register(models.FailWord)
class FailWordAdmin(admin.ModelAdmin):
    list_display = (
        'student',
    )

@admin.register(models.Student)
class StudentAdmin(admin.ModelAdmin):
    search_fields = ['sclasss__name']
    list_display = (
        'name',
        'birth',
        'phone_number',
        'uuid'
    )

@admin.register(models.Test)
class TestAdmin(admin.ModelAdmin):
    list_display = (
        'student',
        'start_day',
        'end_day',
        'test_date',
        'uuid'
    )


class SclassAdmin(TreeAdmin):
    form = movenodeform_factory(models.Sclass)

admin.site.register(models.Sclass, SclassAdmin)