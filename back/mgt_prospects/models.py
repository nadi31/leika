from django.db import models


class Prospect(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    first_name = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=12, null=True, blank=True)
    siret = models.CharField(max_length=200, null=True, blank=True)
    email = models.CharField(max_length=200, null=True, blank=True)
    ville = models.CharField(max_length=200, null=True, blank=True)
    activities = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        db_table = 'Prospect'
 