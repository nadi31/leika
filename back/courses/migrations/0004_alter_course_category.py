# Generated by Django 3.2.6 on 2021-08-31 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_alter_course_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='category',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Art'), (2, 'Sport'), (3, 'Pro'), (4, 'Tours'), (5, 'Jeux'), (6, 'Creatifs'), (7, 'Culture'), (8, 'Culinaire'), (9, 'Langues')], null=True),
        ),
    ]