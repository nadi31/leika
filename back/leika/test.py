from django.core.wsgi import get_wsgi_application
import environ
import settings
from django.core.mail import EmailMessage


import os

env = environ.Env()
environ.Env.read_env()
print(env("DB_USER"))

os.environ['DJANGO_SETTINGS_MODULE'] = 'leika.settings'


def send_email(subject, body, email):
    os.environ['DJANGO_SETTINGS_MODULE'] = 'leika.settings'
    try:
        email_msg = EmailMessage(subject, body, settings.EMAIL_HOST_USER, [
                                 settings.EMAIL_HOST_USER], reply_to=[email])
        email_msg.send()
        print("SENT")
        return "Message sent :)"
    except Exception as e:
        print("ERROR" + str(e))
        return "Message failed, try again later :("


send_email("yeah i know", "blow some mo", "nadiaelmehdi8@gmail.com")
