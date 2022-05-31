from django.db import models
import inspect
import os
# djsr/authentication/models.py
from django.contrib.auth.models import AbstractUser

# from django.contrib.auth.models import User

#from courses.models import Course
from django.contrib.auth.models import AbstractUser
# from django.contrib.auth.forms import UserCreationForm

from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from json import JSONEncoder
import json
import jwt
import collections
from rest_framework.test import APIRequestFactory


class MyUser(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'administrator'),
        (2, 'cub'),
        (3, 'giver'),
    )
    user_type1 = models.PositiveSmallIntegerField(
        choices=USER_TYPE_CHOICES, blank=True, null=True)
    user_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'MyUser'

   
      #  self.password = self.set_password(password)
        # self.save()
    # def save(self, *args, **kwargs):
     #   print ("**PRINT**"+ " psw: "+str(self.csrfmiddlewaretoken))

        # MyUser.save(str(self.query))

        # receive_user=receive_user,

    # message.save() - no needs in save() when you use create() method
        # MyUser.receive_user.add(receive_user)

        # if self.user_type1:
        #key = '9d00kz_e*tk8@f+(1(igmaw&qo@&sc@5kss0mh6a-c$+jhw+bz'
        #container_passw = Password(self.password)
        #json_data = json.dumps(container_passw.__dict__)
        #print("DATA: " + json_data)
        # self.password = jwt.encode(
        # {'password': self.password},  key, algorithm="HS256")
        # print("ENCODED: " + self.password)
        #factory = APIRequestFactory()
        # request = factory.post(
        #     'user/create/', json.dumps({"email": self.email, "username": self.username, "user_type1": self.user_id}),  content_type='application/json')
        # print("REQUEST " + request.data)
    #super(MyUser, self).save(*args, **kwargs)

        # +
        # password = self.password
        #  self.password = jwt.encode({"password": password},
        #                             key, algorithm="HS256")
        # super().save( *args, **kwargs)


# class Password(object):
 #   def __init__(self, password: str):
  #      self.password = str(password)


class Administrator(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    user_type1 = 1

    class Meta:
        db_table = 'Administrator'

    def __str__(self):
        return self.user.email


class Adress(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    zip_code = models.CharField(max_length=10, null=True, blank=True)
    city = models.CharField(max_length=100)
    apartment_number = models.CharField(max_length=10, null=True, blank=True)
    country = models.CharField(max_length=100, null=True, blank=True)
    add_ons = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.name


class Cub(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE,)
    user_type1 = 2
    phone = models.CharField(max_length=12, null=True, blank=True)
    # adress = models.ForeignKey(Adress, on_delete=models.CASCADE)
    points = models.IntegerField(null=True, blank=True)
   # dateCub = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.email

    class Meta:
        db_table = 'Cub'


class Giver(models.Model):

    user = models.ForeignKey(MyUser, on_delete=models.CASCADE,)
    user_type1 = 3
    img1 = models.ImageField(null=True, blank=True,
                             upload_to="gallery", default='../media/sewing.png')

    adress = models.ForeignKey(
        Adress, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    appelation = models.TextField(null=True, blank=True)
    siret = models.CharField(max_length=12, null=True, blank=True)
    phone = models.CharField(max_length=12, null=True, blank=True)

    class Meta:
        db_table = 'Giver'

    def __str__(self):
        return self.user.email


# @ receiver(pre_save, sender=MyUser)

# def create_password(sender,  instance, created, **kwargs):
    #print ("Je suis l'instance"+ str(csrfmiddlewaretoken))

     #key = '9d00kz_e*tk8@f+(1(igmaw&qo@&sc@5kss0mh6a-c$+jhw+bz'
        #container_passw = Password(self.password)
        #json_data = json.dumps(container_passw.__dict__)
        #print("DATA: " + json_data)
        # self.password = jwt.encode(
        # {'password': self.password},  key, algorithm="HS256")
@ receiver(post_save, sender=MyUser)
def create_user_profile(sender, instance, created, **kwargs):
    print("IDDDDD " + str(instance.user_id))
    print("PAss " + str(instance.password))
    print("JE SUIS: " + str(instance.user_type1))
    if instance.user_type1 == 1:
        Administrator.objects.create(user=instance)
    elif instance.user_type1 == 2 :
        print("ENREGISTREMENT CUBBBBBBBBB*****")
        Cub.objects.create(user=instance)
        print("ENREGISTREMENT CUBBBBB*" + instance.password)
    elif instance.user_type1 == 3:
        Giver.objects.create(user=instance)

# send
# end
# send
# send
