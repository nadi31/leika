from django.db import models

# djsr/authentication/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from courses.models import Course


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'administrator'),
        (2, 'cub'),
        (3, 'giver'),

    )
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)

    user_id = models.AutoField(primary_key=True)


class Administrator(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)


class Cub(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    adress = models.ForeignKey(Adress, on_delete=models.CASCADE)
    points = models.IntegerField(null=True, blank=True)
    dateCub = models.DateField(null=True, blank=True)


class Adress(models.Model):
    name = models.CharField(max_length=200)
    zip_code = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    apartment_number = models.CharField(max_length=10)
    country = models.CharField(max_length=100)
    add_ons = models.CharField(max_length=1000)


class Booking(models.Model):
    date = models.DateField(null=True, blank=True)
    hour = models.TimeField(null=True, blank=True)
    courses = models.ManyToManyField(course.Course, blank=True)
    cub = models.OneToOneField(Cub)


class Wishlist(models.Model):
    courses = models.ManyToManyField(course.Course, blank=True)
    cub = models.OneToOneField(Cub)


class ShoppingCart(models.Model):
    courses = models.ManyToManyField(course.Course, blank=True)
    cub = models.OneToOneField(Cub)


class Giver(models.Model):
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    adress = models.ForeignKey(Adress, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
