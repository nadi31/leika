# Generated by Django 3.0.8 on 2020-07-17 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0010_auto_20200717_0818'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='thumbnail',
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
    ]
