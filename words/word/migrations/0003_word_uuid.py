# Generated by Django 3.2.14 on 2022-08-02 15:30

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('word', '0002_rename_stduent_test_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='word',
            name='uuid',
            field=models.UUIDField(default=uuid.uuid4, editable=False),
        ),
    ]
