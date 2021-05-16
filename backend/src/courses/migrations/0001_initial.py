# Generated by Django 3.0.8 on 2021-04-11 06:50

from django.db import migrations, models
import django.db.models.deletion
import easy_thumbnails.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentification', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=300, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('date', models.DateField(blank=True, null=True)),
                ('hour', models.TimeField(blank=True, null=True)),
                ('isVerified', models.BooleanField(default=False)),
                ('price', models.FloatField(blank=True, null=True)),
                ('img1', models.ImageField(blank=True, default='../media/sewing.png', null=True, upload_to='gallery')),
                ('img2', models.ImageField(blank=True, default='../media/sewing.png', null=True, upload_to='gallery')),
                ('img3', models.ImageField(blank=True, default='../media/sewing.png', null=True, upload_to='gallery')),
                ('isDiscounted', models.BooleanField(default=False)),
                ('discount', models.FloatField(blank=True, null=True)),
                ('isRemote', models.BooleanField(default=False)),
                ('points', models.IntegerField(blank=True, null=True)),
                ('seats', models.IntegerField(blank=True, null=True)),
                ('needCertificate', models.BooleanField(default=False)),
                ('dateFin', models.DateField(blank=True, null=True)),
                ('hourFin', models.TimeField(blank=True, null=True)),
                ('thumbnail1', easy_thumbnails.fields.ThumbnailerImageField(blank=True, null=True, upload_to='gallery')),
                ('thumbnail2', easy_thumbnails.fields.ThumbnailerImageField(blank=True, null=True, upload_to='gallery')),
                ('thumbnail3', easy_thumbnails.fields.ThumbnailerImageField(blank=True, null=True, upload_to='gallery')),
                ('isIntermediate', models.BooleanField(default=False)),
                ('isBeginner', models.BooleanField(default=False)),
                ('isAdvanced', models.BooleanField(default=False)),
                ('category', models.CharField(blank=True, max_length=200, null=True)),
                ('sub_category', models.CharField(blank=True, max_length=200, null=True)),
                ('age', models.CharField(blank=True, max_length=100, null=True)),
                ('value', models.IntegerField(blank=True, null=True)),
                ('date_fin', models.DateField(blank=True, null=True)),
                ('courseHourIsCreated', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='authentification.Giver')),
            ],
        ),
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courses', models.ManyToManyField(to='courses.Course')),
                ('cub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentification.Cub')),
            ],
        ),
        migrations.CreateModel(
            name='ShoppingCart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courses', models.ManyToManyField(blank=True, to='courses.Course')),
                ('cub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentification.Cub')),
            ],
        ),
        migrations.CreateModel(
            name='CourseHour',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=None)),
                ('hour', models.TimeField(blank=True, null=True)),
                ('dateFin', models.DateField(default=None)),
                ('hourFin', models.TimeField(blank=True, null=True)),
                ('seats', models.IntegerField(blank=True, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(blank=True, null=True)),
                ('hour', models.TimeField(blank=True, null=True)),
                ('courses', models.ManyToManyField(blank=True, to='courses.Course')),
                ('cub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentification.Cub')),
            ],
        ),
    ]
