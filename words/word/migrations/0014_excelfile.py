# Generated by Django 3.2.14 on 2023-03-05 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('word', '0013_auto_20230127_2216'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExcelFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, null=True)),
                ('excelfile', models.FileField(null=True, upload_to='')),
            ],
        ),
    ]