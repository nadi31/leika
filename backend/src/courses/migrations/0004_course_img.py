# Generated by Django 3.0.8 on 2020-07-16 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_course_datefin'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='img',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
