# Generated by Django 3.2.6 on 2023-05-02 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adress',
            name='lng',
            field=models.DecimalField(blank=True, decimal_places=20, max_digits=40, null=True),
        ),
    ]
