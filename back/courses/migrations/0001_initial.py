# Generated by Django 3.2.6 on 2022-05-31 04:01

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import easy_thumbnails.fields
import shortuuid.django_fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentification', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateHour', models.DateTimeField(default=django.utils.timezone.now)),
                ('ref', shortuuid.django_fields.ShortUUIDField(alphabet=None, length=11, max_length=11, prefix='')),
                ('cub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentification.cub')),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=300, null=True)),
                ('accroche', models.TextField(blank=True, null=True)),
                ('aSavoir', models.TextField(blank=True, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('annulation', models.TextField(blank=True, null=True)),
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
                ('category', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'arts_plastiques'), (2, 'arts_de_scene'), (3, 'loisirs_creatifs'), (4, 'professionnel'), (5, 'culinaire'), (6, 'culture'), (7, 'linguistique'), (8, 'sport'), (9, 'jeux'), (10, 'beaute_bien_etre'), (11, 'tours_circuits')], null=True)),
                ('sub_category', models.CharField(blank=True, max_length=200, null=True)),
                ('age', models.CharField(blank=True, max_length=100, null=True)),
                ('value', models.IntegerField(blank=True, null=True)),
                ('date_fin', models.DateField(blank=True, null=True)),
                ('courseHourIsCreated', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='authentification.giver')),
            ],
        ),
        migrations.CreateModel(
            name='CourseHour',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=None)),
                ('hour', models.TimeField(blank=True, null=True)),
                ('dateFin', models.DateField(default=None)),
                ('hourFin', models.TimeField(blank=True, null=True)),
                ('seats', models.IntegerField(blank=True, null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.course')),
            ],
        ),
        migrations.CreateModel(
            name='Wishlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courses', models.ManyToManyField(to='courses.Course')),
                ('cub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentification.cub')),
            ],
        ),
        migrations.CreateModel(
            name='SingleBooking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('seats', models.IntegerField(blank=True, null=True)),
                ('isCommented', models.BooleanField(blank=True, default=False, null=True)),
                ('booking', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.booking')),
                ('courseHour', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.coursehour')),
                ('courses', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.course')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.IntegerField(blank=True, null=True)),
                ('commentOn', models.BooleanField(blank=True, null=True)),
                ('comment_cub', models.TextField(blank=True, max_length=1000, null=True)),
                ('dateHour', models.DateTimeField(default=django.utils.timezone.now)),
                ('booking', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.singlebooking')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.course')),
                ('cub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentification.cub')),
            ],
        ),
    ]
