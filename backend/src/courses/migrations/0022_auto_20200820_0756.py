# Generated by Django 3.0.8 on 2020-08-20 07:56

from django.db import migrations, models
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0021_auto_20200820_0753'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='img',
            field=models.ImageField(blank=True, default='../media/sewing.png', null=True, upload_to='gallery'),
        ),
        migrations.AddField(
            model_name='course',
            name='thumbnail',
            field=easy_thumbnails.fields.ThumbnailerImageField(blank=True, null=True, upload_to='gallery'),
        ),
    ]
