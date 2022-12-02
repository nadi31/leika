from django.db import models
import inspect
import requests
from django.utils.crypto import get_random_string
import os
from rest_framework.authtoken.models import Token
from django.http import HttpResponse, HttpRequest
from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.translation import ugettext_lazy as _
from .token import account_activation_token
from django.contrib.auth.models import AbstractUser
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth import authenticate, login
from rest_framework.response import Response

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
    #username = None
    email = models.EmailField(_('email address'), unique=True)
    user_type1 = models.PositiveSmallIntegerField(
        choices=USER_TYPE_CHOICES, blank=True, null=True)
    user_id = models.AutoField(primary_key=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

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
@receiver(post_save, sender=MyUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # print('Activate your leikka account.')

        # FRONTEND_URL = ('http://localhost:3000')
        # BACKEND_URL = ('http://localhost:8000')
        # token = get_random_string(length=32)
        # tok = Token.objects.create(user=instance.email, key=token)

        # tok.save()

        # verify_link = FRONTEND_URL + '/email-verify/' + token
        # subject, from_email, to = 'Verify Your Email', 'noreply@leikka.com', instance.email
        # html_content = render_to_string('email.html', {
        #                                 'verify_link': verify_link, 'base_url': FRONTEND_URL, 'backend_url': BACKEND_URL})
        # #text_content = strip_tags(html_content)

        # msg = EmailMultiAlternatives(subject, html_content, from_email, [to])
        # msg.attach_alternative(html_content, "text/html")
        # msg.send()
        # mail_subject = 'Activate your leikka account.'
        # message = ('Hi %s,Please click on the link to confirm your registration,%s',
        #            instance.first_name,
        #            # 'domain': current_site.domain,
        #            # urlsafe_base64_encode(force_bytes(instance.pk)),
        #            account_activation_token.make_token(instance),
        #            )

        # to_email = instance.email

        # print(to_email)
        # email = EmailMessage(
        #     mail_subject, message, to=[to_email]
        # )
        # try:
        #     email.send()
        #     print("email sent............................")
        # # return HttpResponse('Please confirm your email address to complete the registration')
        # except Exception as e:
        #     print(e)

        #     raise Http404
        # or

        #current_site = get_current_site(request)

        print("IDDDDD " + str(instance.user_id))
        print("PAss " + str(instance.password))
        print("JE SUIS: " + str(instance.user_type1))
        #token = Token.objects.create(user=instance)

        if instance.user_type1 == 1:

            Administrator.objects.create(user=instance)
        elif instance.user_type1 == 2:
            print("ENREGISTREMENT CUBBBBBBBBB*****")
            Cub.objects.create(user=instance)
            instance.is_active = False
            instance.save()
            print("ENREGISTREMENT CUBBBBB*" + instance.password)

        elif instance.user_type1 == 3:
            Giver.objects.create(user=instance)
            instance.is_active = False
            instance.save()


"""else:
        print("YOU ARE TRYING TO LOG IN")
        user = authenticate(username=instance.email,
                            password=instance.password)
        #user = MyUser.objects.get(email=instance.email)
      r = requests.post('http://localhost:8000/api/token/obtain/', data={"username": instance.email,
                                                                           "password": instance.password})
 print("USER", r) 
       if r is not None:
            print("IN***")

            username = instance.email
            password = instance.password
            
            newrequest = HttpRequest()
            newrequest.method = 'POST'
            newrequest.user = user
            engine = import_module(settings.SESSION_ENGINE)
            session_key = None
            newrequest.session = engine.SessionStore(session_key)
        if user is not None:
            if user.is_active:
                print("ACTIVE")
                login(newrequest, user)
                print("LOGED IN") """
# Redirect to a success page.

# Return a 'disabled account' error message
""" 
            else:
                # Return an 'invalid login' error message.

                return HttpResponse("Signed in")

        else:
            print("OUT***")
            return HttpResponse("Not signed in") """

# end
# send
# send
