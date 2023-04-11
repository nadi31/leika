from django.http import HttpRequest
from django.shortcuts import render
from rest_framework.parsers import JSONParser
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
import json
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes
from .models import MyUser, Giver, Adress, Cub, Prospect
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate, login
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from .serializers import *
import os
from rest_framework.generics import ListAPIView
from rest_framework.parsers import MultiPartParser
from rest_framework import permissions
from django.core.mail import EmailMultiAlternatives
from django.core.mail import send_mail
from .permissions import *
from .perm import GiverAdminOrReadOnlyCourses
# vue pour les adresses des givers
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


class UserOublieView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (
        permissions.AllowAny, )

    def post(self,  request, format='json'):
        print("RESTRSTRSD" + str(request.data['email']))

        myu = MyUser.objects.get(email=request.data['email'])
        # envoyer les emails...
        # token

        token = Token.objects.create(user=myu)
        print("TOK "+request.data[
            'email'])
        # 2. envoie du mail
        subject, from_email, to = 'Leikka: réinitaliser mot de passe', settings.EMAIL_HOST_USER, request.data[
            'email']

        verify_link = "http://localhost:3000/mdp/" + token.key
        html_content = render_to_string('mdp.html', {'first_name': myu.first_name,
                                                     'verify_link': verify_link, 'base_url': "http://localhost:3000/", })
        text_content = strip_tags(html_content)
        msg = EmailMultiAlternatives(
            subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        return Response(status=status.HTTP_201_CREATED)


class UserMdpOublieView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (
        permissions.AllowAny, )

    def get(self, request, pk, *args, **kwargs):
        print(request.GET)
        myUser = MyUser.objects.get(
            user_id=pk)

        t = Token.objects.create(
            user=myUser)
        print(t.user)
        # email send

        return Response({'token': t.key}, status=status.HTTP_201_CREATED)

    def post(self,  request, format='json'):

        print("RESTRSTRSD" + str(request.data['token']["token"]))

        token = Token.objects.get(key=request.data['token']["token"])
        myjson = {}

        print(""+str(token.user))
        print("pass****************** " + request.data.get("password"))
        myjson["password"] = request.data.get("password")
        myjson["username"] = token.user
        myjson["email"] = token.user
        # request._body = json.dumps(myjson)
        # request.POST["user_type1"] = 3
        print("myuser", myjson)
        print("req", request.data)
        myser = MyUser.objects.get(
            email=token.user)
        print("HERE*** " + str(myser))
        if myser.user_type1 == 2:
            myUser_serializer = CubUpdateMdpSerializer(
                data=myjson)

        if myser.user_type1 == 3:

            myUser_serializer = GiverSerializerMDP(
                data=myjson)

        print("REQ**", request.data)

        instance_seri = myUser_serializer.update(myser, myjson)
        token.delete()

        if myUser_serializer.is_valid():

            json = myUser_serializer.data

            # myUser_serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            print('error', myUser_serializer.errors)
            return Response(myUser_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (
        permissions.AllowAny, )

    def get(self, request, token, *args, **kwargs):
        t = Token.objects.get(
            key=self.kwargs['token'])
        print(t.user)
        myser = MyUser.objects.filter(
            email=t.user)
        serializer = MyUserSerializer(myser, many=True)
        print("SERIALIZER2**", serializer)
        res = serializer.data

        return Response(res)

    def post(self, request, *args, **kwargs):
        myuser = MyUser.objects.filter(username=request.data['email'])
        myus = MyUser.objects.get(username=request.data['email'])
        myuser.update(is_active=True)
        token = Token.objects.filter(user=myus.user_id)

        token.delete()
        return Response(status=status.HTTP_201_CREATED)


class TokenCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = (IsAll, )

    def get(self, request, email, *args, **kwargs):
        t = Token.objects.filter(
            user=self.kwargs['email'])

        serializer = TokenSerializer(t, many=True)
        print("SERIALIZER2**", serializer)
        res = serializer.data

        return Response(res)

    def post(self, request, *args, **kwargs):
        tokenserializer = TokenSerializer(data=request.data)
        print("REQ", request.data)
        if tokenserializer.is_valid():
            token, _ = Token.objects.get_or_create(user=request.email)
           # if request.POST['creation_front'] != True:
            tokenserializer.save()
            # course = Course.objects.filter(id=request.data.get("coursesID"))
            # createCourseHour(course_serializer.data)
            return Response({'token': token}, status=status.HTTP_201_CREATED)

# vue pour les adresses des givers


class AdressCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser,)
    permission_classes = (IsGiver, )

    def get(self, request, *args, **kwargs):

        adress = Adress.objects.all()
        serializer = AdressSerializer(adress, many=True)
        # print("SERIALIZER2**", serializer)
        res = serializer.data

        return Response(res)

    def post(self, request, *args, **kwargs):
        adress_serializer = AdressSerializer(data=request.data)
        print("REQ", request.data)
        if adress_serializer.is_valid():
           # if request.POST['creation_front'] != True:
            adress_serializer.save()
            # course = Course.objects.filter(id=request.data.get("coursesID"))
            # createCourseHour(course_serializer.data)
            return Response(adress_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', adress_serializer.errors)
            return Response(adress_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# vue pour les adresses des givers


class AdressDetailView(APIView):
    permission_classes = (IsAll,)

    def get(self, request, *args, **kwargs):

        adress = Adress.objects.filter(
            id=self.kwargs['pk'])
        serializer = AdressSerializer(adress, many=True)
        print("SERIALIZER2**", serializer)
        res = serializer.data

        return Response(res)

    def post(self, request, pk, format='json'):
        # Giver.objects.filter(self.kwargs['pk'])

        Adress.objects.filter(id=self.kwargs['pk']).update(
            zip_code=request.data.get("zip_code"),
            apartment_number=request.data.get("apartment_number"),
            city=request.data.get("city"),
            country=request.data.get("country"),
            add_ons=request.data.get("add_ons"),
            name=request.data.get("name"),

        )

        serializer = AdressSerializer(data=request.data)
        if serializer.is_valid():
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# vue pour les givers


class GiverDetailView(APIView):
    permission_classes = (IsAll,)
    parser_classes = (MultiPartParser,)

    # queryset = Giver.objects.all()

    def get(self, request, *args, **kwargs):
        user = Giver.objects.filter(id=self.kwargs['pk'])
        serializer = GiverSerializer(user, many=True)
        adress = Adress.objects.filter(
            id=request.data.get('adress'))
        serializer2 = AdressSerializer(adress, many=True)
        # print("SERIALIZER2**", serializer)
        res = serializer.data

        return Response(res)

    def post(self, request, pk, format='json'):
        print("RES = " + str(request.POST))
        myuser = MyUser.objects.get(username=request.data['email'])
       # myuser= MyUser.objects.get(user_id=self.kwargs['pk'])
        if request.POST.get('password'):

            print("RES = " + str(request.data))
            # request.data.pop('username')
            print("RES = " + str(request.data))
            # pwd= MyUser.set_password(request.data['raw_password'])
            # print("PASS"+ str(pwd))
            # user.update(password=pwd

            # user.update(password=request.data.pop('password'))
            # user.save()
        # user.save()

            myuser = MyUser.objects.get(username=request.data['email'])
            myjson = {}

            myjson["password"] = request.data.get("password")
            myjson["username"] = request.data.get("email")
            myjson["email"] = request.data.get("email")
            # request._body = json.dumps(myjson)
            # request.POST["user_type1"] = 3
            print("myuser", myjson)
            print("req", request.data)

            # request._body = json.dumps(myjson)
            # request.POST["user_type1"] = 3
            print("myuser", myjson)
            print("req", request.data)
            # essai

            myUser_serializer = GiverSerializerMDP(
                data=myjson)
            myUser_serializer.update(myuser, myjson)

            # if myUser_serializer.is_valid():
            #  print("ME OR THE PS5")
            #  myUser_serializer.update(myuser, myjson)

           # else:
            # print('error', myUser_serializer.errors)
            user = Giver.objects.filter(id=self.kwargs['pk'])
            print(request.data.get("description"))

        Giver.objects.filter(id=pk).update(
            description=request.data.get("description"), phone=request.data.get("phone"), appelation=request.data.get("appelation"), siret=request.data.get("siret"))
        req = request.POST.copy()
        print("***REQ1: ", req)
        if req.get("img1") != None:
            req.pop("img1")
        print("***REQUEST: ", request.FILES.get("img1"))
        print("***REQ2: ", req)
        # req.pop('img1')
        # req.FILES.pop('img1')
        # print("***REQ: ", req.data)
        serializer = GiverSerializer(data=req)
        if request.FILES.get("img1") != None:
            # if request.data.get("img1") != None:
            print("BGUYFHGF")
            obj = Giver.objects.get(user=request.data.get("user"))
            print("OBJECT", obj)
            obj.img1 = request.data.get("img1")
            obj.save()
        if serializer.is_valid():
            json = serializer.data

            #print("ERRUE R" + e)
            return Response(json, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # print("SERIALIZER", serializer)
        # print("DATTTA", request.data)

        # user.img1 = request.FILES.get('img1')

        # obj.description = request.data.get("description")
        # obj.phone = request.data.get("phone")
        # obj.appelation = request.data.get("appelation")
        # obj.siret = request.data.get("siret")
        # obj.img1 = request.data.get('img1')
        # rint("OULALA** ", user.img1)

        # obj.save()"""

        # ...
        # do some stuff with uploaded file
        # ...
        # return Response(status=204)

        # Giver.objects.filter(user=request.data.get("user")).update(description=request.data.get("description"), phone=request.data.get(
        #    "phone"), appelation=request.data.get("appelation"), siret=request.data.get("siret"), img1=request.FILES.get('img1'))
        # rint("OULALA** ", user.img1)

        # user.save()
        #    user.save(commit=False)

# vue pour obtenir les tokens=> pour tout le monde


class ObtainTokenPairWithColorView(TokenObtainPairView):
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )

        print('Connecting')
        print(request.data)
        user = authenticate(username=request.data['email'],
                            password=request.data['password'])
        if user is not None:
            print('Login')
            login(request, user)
            print('OK')
        # else:
         #   print('NULL')
          #  return Response(status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():

            return Response(
                serializer.validated_data,
                status=status.HTTP_200_OK
            )
        else:
            print('error', serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)


# class MyUser(ListAPIView):

#    permission_classes = (permissions.AllowAny,)

#    def get(self, request, *args, **kwargs):
#        user = MyUser.objects.all()
#        serializer = MyUserSerializer(user, many=True)
#        return Response(serializer.data)

#
class AdressUpdateCreateView(APIView):

    permission_classes = (permissions.AllowAny,)
    parser_classes = (JSONParser,)

    def delete(self, request, *args, **kwargs):
        print("REQ", request.data)
        print("FILTER " + self.kwargs['pk'])

        Adress.objects.filter(giver=self.kwargs['pk']).delete()
        #courses = CourseHour.objects.filter(course=self.kwargs['pk'])
        #serializer = OffersSerializer(off, many=True)

        return Response(status=status.HTTP_201_CREATED)


class CustomUserCreate(APIView):

    permission_classes = (permissions.AllowAny,)
    parser_classes = (JSONParser,)

    def get(self, request, *args, **kwargs):
        user = MyUser.objects.all()
        serializer = CustomUserSerializer(user, many=True)

        return Response({id: user.user_id}, status=status.HTTP_201_CREATED)

    def post(self, request, format='json'):
        print(request.data)
        req = request.data
        phone = req.pop('phone', None)
        print(req)
        serializer = CustomUserSerializer(data=req)
        print(request.data)

        if serializer.is_valid():
            user = serializer.save()
            print("USER_ID" + str(user.user_id))
            # 1. créer le token

            token = Token.objects.create(user=user)
            print("TOK "+request.data[
                'email'])
            # 2. envoie du mail
            subject, from_email, to = 'Inscription Leikka', settings.EMAIL_HOST_USER, request.data[
                'email']

            verify_link = "http://localhost:3000/email-verify/" + token.key
            html_content = render_to_string('email.html', {'first_name': request.data[
                'first_name'],
                'verify_link': verify_link, 'base_url': "http://localhost:3000/", })
            text_content = strip_tags(html_content)
            msg = EmailMultiAlternatives(
                subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()

            if request.data['user_type1'] == 2:
                obj = Cub.objects.get(user=user.user_id)
                print(phone)
                obj.phone = phone
                obj.save()

        if user:
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CubList(APIView):

    permission_classes = (IsAdminOrSuperUser,)
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        # user = MyUser.objects.all()
        user = Cub.objects.all()
        serializer = CubSerializer(user, many=True)
        # cub = user.cub_set.all()
        return Response(serializer.data)


class CubView(APIView):

    permission_classes = (IsCub,)
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        # user = MyUser.objects.all()
        user = MyUser.objects.filter(user_id=self.kwargs['pk'])
        serializer = MyUserCubSerializer(user, many=True)
        # cub = user.cub_set.all()
        return Response(serializer.data)

    def post(self,  request, pk, format='json'):
        user = MyUser.objects.filter(user_id=self.kwargs['pk'])
        user.update(last_name=request.data.get("last_name"), email=request.data.get(
            "email"), username=request.data.get("email"), first_name=request.data.get("first_name"))
        req = request.POST.copy()

        serializer = CubUpdateSerializer(data=req)
        if request.data.get("phone"):
            req.pop("phone")
            user_cub = Cub.objects.filter(user=self.kwargs['pk'])
            # os.remove(user_cub.phone)
            user_cub.update(phone=request.data.get("phone"))
           # serializer = CubUpdatePhoneSerializer(data=req)
        if serializer.is_valid():
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CubPhoneView(APIView):
    permission_classes = (IsCub,)

    def get(self, request, *args, **kwargs):
        user = Cub.objects.filter(user=self.kwargs['pk'])
        serializer = CubSerializer(user, many=True)
        # cub = user.cub_set.all()
        return Response(serializer.data)


class ProspectView(APIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = [JSONParser]

    queryset = Prospect.objects.all()
    serializer_class = ProspectsSerializer

    def post(self, request, *args, **kwargs):
        serializer = ProspectsSerializer(data=request.data)
        print("REQ", request.data)
        if serializer.is_valid():
           # if request.POST['creation_front'] != True:
            serializer.save()
            # course = Course.objects.filter(id=request.data.get("coursesID"))
            # createCourseHour(course_serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProspView(APIView):
    permission_classes = (IsAdminOrSuperUser,)

    def get(self, request, *args, **kwargs):
        pros = Prospect.objects.all()
        serializer = ProspectsSerializer(pros, many=True)
        return Response(serializer.data)


class CubUpdateMdpView(APIView):
    permission_classes = (IsCub,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get(self, request, *args, **kwargs):
        user = MyUser.objects.filter(user_id=self.kwargs['pk'])
        serializer = MyUserSerializer(user, many=True)
        # cub = user.cub_set.all()
        return Response(serializer.data)

    def post(self,  request, pk, format='json'):
        print("RESTRSTRSD" + str(request.data))

        myuser = MyUser.objects.get(username=request.data['username'])
       # myuser= MyUser.objects.get(user_id=self.kwargs['pk'])
        if request.data['password']:

            print("RES = " + str(request.data))
            # request.data.pop('username')
            print("RES = " + str(request.data))
            # pwd= MyUser.set_password(request.data['raw_password'])
            # print("PASS"+ str(pwd))
            # user.update(password=pwd

            # user.update(password=request.data.pop('password'))
            # user.save()
        # user.save()

            user = CubUpdateMdpSerializer(data=request.data)

            if user.is_valid():
                instance_seri = user.update(myuser, request.data)

                json = user.data

                return Response(json, status=status.HTTP_201_CREATED)
            else:
                print('error', user.errors)
                return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


class GiverCreateView(APIView):
    permission_classes = (IsGiver,)
    parser_classes = (MultiPartParser, FormParser, JSONParser,)

    def get(self, *args, **kwargs):

        givers = Giver.objects.all()
        serializer = GiverSerializer(givers, many=True)
        # cub = user.cub_set.all()
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
       # print("REQUEST USER"+request)
       # myuser = MyUser.objects.get(username=request.data['username'])
        myjson = {}
        myjson["user_type1"] = 3
        myjson["password"] = request.data.get("password")
        myjson["username"] = request.data.get("username")
        myjson["email"] = request.data.get("username")
        # request._body = json.dumps(myjson)
        # request.POST["user_type1"] = 3
        print("myuser", myjson)
        print("req", request.data)
        myUser_serializer = GiverSerializerMDP(
            data=myjson)

        if myUser_serializer.is_valid():
            obj = myUser_serializer.save()
            print("REQ**", request.data)
            req = request.data.copy()
            print("REQ**ID", obj.user_id)
            del req["user"]
            req["user"] = obj.user_id

            print("REQ", obj)
            Giver.objects.filter(user=obj.user_id).update(
                description=request.data.get("description"), phone=request.data.get("phone"), appelation=request.data.get("appelation"), siret=request.data.get("siret"),  img1=request.data.get("img1"))
            # requ = request.data.copy()
            print("***REQ1: ", req)
            json = myUser_serializer.data
            token = Token.objects.create(user=obj)
            print("TOK "+request.data[
                'email'])
            # 2. envoie du mail
            password = request.data.get("password")
            subject, from_email, to = 'Inscription Leikka: ' + password, settings.EMAIL_HOST_USER, request.data[
                'email']

            verify_link = "http://localhost:3000/email-verify-giver/" + token.key
            html_content = render_to_string('email.html', {'first_name':  "GIVER",
                                                           'verify_link': verify_link, 'base_url': "http://localhost:3000/", })
            text_content = strip_tags(html_content)
            msg = EmailMultiAlternatives(
                subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")

            msg.send()
            print("MESSAGE SENT")

            req.pop("img1")
            print("***REQUEST: ", request.FILES.get("img1"))
            print("***REQ2: ", req)
            json = req.pop("user")
            print('id' + str(json))
            return Response(json, status=status.HTTP_201_CREATED)

        else:
            print('error', myUser_serializer.errors)
            return Response(myUser_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # req.pop('img1')
            # req.FILES.pop('img1')
            # print("***REQ: ", req.data)
            # serializer = GiverSerializer(data=req)
            # if request.FILES.get("img1") != None:
            # if request.data.get("img1") != None:
            #  print("BGUYFHGF")
            # obj = Giver.objects.get(user=obj.user_id)
            #  print("OBJECT", obj)
            # obj.img1 = request.data.get("img1")
            # obj.save()


class AdressesGiverView(APIView):
    #permission_classes = (IsGiver,)
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser, JSONParser,)

    def get(self, *args, **kwargs):

        #adresses = Adress.objects.all()

        #serializer = GiverSerializer(givers, many=True)
        user = Giver.objects.get(user=self.kwargs['pk'])
        adresses = Adress.objects.filter(giver=user.user)
        serializer = AdressSerializer(adresses, many=True)
        # cub = user.cub_set.all()
        return Response(serializer.data)

        # cub = user.cub_set.all()
        return Response(serializer.data)
