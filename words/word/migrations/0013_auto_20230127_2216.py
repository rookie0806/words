# Generated by Django 3.2.14 on 2023-01-27 13:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('word', '0012_alter_test_student'),
    ]

    operations = [
        migrations.AlterField(
            model_name='failword',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='word_std', to='word.student'),
        ),
        migrations.AlterField(
            model_name='test',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='std_test', to='word.student'),
        ),
    ]