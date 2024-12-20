from django.http import HttpRequest
from django.shortcuts import render
from rest_framework.parsers import JSONParser
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
import json
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
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
import logging
from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)


class UserOublieView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the user by email
            user = MyUser.objects.get(email=email)

            # Delete old tokens if they exist
            token = Token.objects.filter(user=user)
            token.delete()
        except MyUser.DoesNotExist:
            return Response({"error": "No user found with this email address."}, status=status.HTTP_404_NOT_FOUND)

        # We only need 'email' in input data for resetting password
        serializer = UserPwdResetSerializer(user, data={'email': email}, partial=True)  # Allow partial update
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Update the user's password and activate the user
        instance_seri = serializer.update(instance=user, validated_data={'email': email})

        # Create a new token for the user
        Token.objects.create(user=user)

        print(f"TOK {instance_seri['email']} {instance_seri['new_password']}")
        subject = 'Leikka: réinitaliser mot de passe'
        from_email = settings.EMAIL_HOST_USER
        to_email = instance_seri['email']
        
        # Render email template
        html_content = render_to_string('mdp.html', {
            'first_name': user.first_name,  # Assuming user model has 'first_name'
            'password': instance_seri['new_password'],
            'url_to_visit': "http://localhost:3000/",
        })
        text_content = strip_tags(html_content)
        
        try:
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return Response({"success": "Mail sent"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error":  "Failed to send mail: "+ e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

      
      
           

class ContactFormFuturGiver(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (
        permissions.AllowAny, )

    def post(self,  request, format='json'):
       # print("RESTRSTRSD" + str(request.data['email']))

        #myu = MyUser.objects.get(email=request.data['email'])
        # envoyer les emails...
        # token

        #token = Token.objects.create(user=myu)
        print("TOK "+request.data[
            'email'])
        # 2. envoie du PREMIER mail 
        subject, from_email, to = 'Leikka: Contact ! ', settings.EMAIL_HOST_USER, settings.EMAIL_HOST_USER
       # verify_link = "http://localhost:3000/mdp/" + token.key
        html_content = render_to_string('contact.html', {'name': request.data['name'],
                                                         'email': request.data['email'], 'url': request.data['url'], 'message': request.data['message'], })
        text_content = strip_tags(html_content)
        msg = EmailMultiAlternatives(
            subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        

        return Response(status=status.HTTP_201_CREATED)


class ContactFormFuturGiverMail(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (
            permissions.AllowAny, )

    def post(self,  request, format='json'):
        print("TIK "+request.data[
            'email'])
        # 2. envoie du PREMIER mail 
        subject, from_email, to = 'Leikka: Contact 2 ! ', settings.EMAIL_HOST_USER, request.data['email']
       # verify_link = "http://localhost:3000/mdp/" + token.key
        html_content = render_to_string('contactPropect.html', {'name': request.data['name'],
                                                         'email': request.data['email'], 'url': request.data['url'], 'message': request.data['message'], })
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
        myUser = MyUser.objects.filter(
            email=t.user)
       
        myUser.update(
            is_active=True)
        print("USER ACTIVATED")
        serializer = MyUserSerializer(myUser, many=True)
        print("SERIALIZER2**", serializer)
        res = serializer.data

        return Response(res)

    def post(self, request, *args, **kwargs):
        print("I AM here")

        #token.delete()
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

    def get(self, request, *args, **kwargs):
        try:
            user = Giver.objects.filter(id=self.kwargs['pk'])
            serializer = GiverSerializer(user, many=True)
            return Response(serializer.data)

        except Giver.DoesNotExist:
            return Response({"error": "Not Found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request, pk, format='json'):
        try:
            print("DICT"+ str(request.data))
            myuser = MyUser.objects.get(username=request.data['email'])
            if request.POST.get('password'):
                # Update MyUser with the provided data
                myjson = {
                  
                    "password": request.data.get("password"),
                    "username": request.data.get("email"),
                    "email": request.data.get("email")
                }
                myUser_serializer = GiverSerializerMDP(data=myjson)
                myUser_serializer.update(myuser, myjson)

            # Update Giver information with the provided fields
            Giver.objects.filter(id=pk).update(
               
                description=request.data.get("description"),
                phone=request.data.get("phone"),
                appelation=request.data.get("appelation"),
                siret=request.data.get("siret")
            )

            # Handle the image update if provided
            if request.FILES.get("img1"):
                obj = Giver.objects.get(id=pk)
                if obj.img1:
                    os.remove(obj.img1.path)  # Remove old image
                obj.img1 = request.FILES.get("img1")
                obj.save()

            # Serialize and validate the data for response
            req = request.POST.copy()
            #print("res"+ req)
            serializer = GiverSerializer(data=req)
            if serializer.is_valid():
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except MyUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        #except Exception as e:
         #   return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

      

class CustomTokenRefreshView(TokenRefreshView):
    parser_classes = (JSONParser,)
    serializer_class = CustomTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data
        print ("HEEERE WE ARE : "+str (tokens))
        access_token = tokens.get('access')
        decoded_payload = jwt.decode(access_token, options={"verify_signature": False})
            
           
        email = decoded_payload.get('user_email')
        user_type = decoded_payload.get('user_type')
    
        first_name = decoded_payload.get('first_name')
        id_obj_user= decoded_payload.get('id_obj_user')
        id_user= decoded_payload.get('id_user')
        print("CHAMPIONS "+str(decoded_payload))
        response = Response({"access": access_token,"refresh":tokens.get('refresh'),  
        "email": email, "user_type": user_type,  "id_user":id_user,
         "first_name":first_name, "id_obj_user":id_obj_user }, status=200)
        return response

       

      
       



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
       
        user = authenticate(username = request.data.get('email'),
                            password=request.data.get('password'))


        if user is not None:
            print('Login')
            login(request, user)
            print('OK')
        else:
            print('NULL')
          #  return Response(status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            print ("<<<<<<<< "+ str(serializer.validated_data))
            access = serializer.validated_data.get("access", None)
            refresh = serializer.validated_data.get("refresh", None)
            email = serializer.validated_data.get("email", None)
            user_type =serializer.validated_data.get("user_type", None)
            id_user = serializer.validated_data.get("id_user", None)
            first_name= serializer.validated_data.get("first_name", None)
            id_obj_user = serializer.validated_data.get("id_obj_user", None)
    # build your response and set cookie
         #   current_time = timezone.now()
          #  expires_at = expires_at.strftime("%a, %d-%b-%Y %H:%M:%S GMT")
         #   print ("EXPIRE "+ str(expires_at))  
            response = Response({"access": access,"refresh":refresh,  "email": email, "user_type": user_type,  "id_user":id_user, "first_name":first_name, "id_obj_user":id_obj_user }, status=200)
                #response.set_cookie('token', access, httponly=True)
            logger.info("Setting cookie 'cookie_name' with a 15-minute expiry.")
            response.set_cookie(key="refresh",value=refresh,max_age=15*60,httponly=True,secure=True,samesite='None')

            response.set_cookie(key="refresh",value=refresh,max_age=15*60,httponly=True,secure=True,samesite='None')

            return response

        else : 
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class RefreshTokenWithCookieView(APIView):
    permission_classes = (permissions.AllowAny,) 
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        print('Checking for refresh token in cookies...')
        
        # Get refresh token from cookies
        refresh_token = request.COOKIES.get('cookie_name', None)
        
        if not refresh_token:
            
            print('No refresh token found in cookies.')
            return Response({"error": "No refresh token provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
           
            # Attempt to validate the refresh token
            token = RefreshToken(refresh_token)
            
            print('Refresh token is valid. Issuing new access token...')
            
            if serializer.is_valid():
                print ("<<<<<<<< "+ str(serializer.validated_data))
                access = serializer.validated_data.get("access", None)
                refresh = serializer.validated_data.get("refresh", None)
                email = serializer.validated_data.get("email", None)
                user_type =serializer.validated_data.get("user_type", None)
                id_user = serializer.validated_data.get("id_user", None)
                first_name= serializer.validated_data.get("first_name", None)
                id_obj_user = serializer.validated_data.get("id_obj_user", None)
    # build your response and set cookie
         #   current_time = timezone.now()
          #  expires_at = expires_at.strftime("%a, %d-%b-%Y %H:%M:%S GMT")
         #   print ("EXPIRE "+ str(expires_at))  
            response = Response({"access": access,  "email": email, "user_type": user_type,  "id_user":id_user, "first_name":first_name, "id_obj_user":id_obj_user }, status=200)
                #response.set_cookie('token', access, httponly=True)
            logger.info("Setting cookie 'cookie_name' with a 15-minute expiry.")
            response.set_cookie(key="refresh",value=refresh,max_age=15*60,httponly=True,secure=True,samesite='None')


            return response
        except Exception as e:

           
            print('error', e)
            return Response({"error": "Invalid or expired refresh token."}, status=status.HTTP_400_BAD_REQUEST)

class MyUserV(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        user = MyUser.objects.all()
        serializer = MyUserSerializer(user, many=True)
        return Response(serializer.data)

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
            myu = MyUser.objects.get(email=request.data['email'])
            token = Token.objects.create(user=user)
            print("TOK "+request.data[
                'email'])
            # 2. envoie du mail
            subject, from_email, to = 'Inscription Leikka', settings.EMAIL_HOST_USER, request.data[
                'email']
                
            verify_link = "http://localhost:3000/email-verify/" + token.key
            html_content = ""
            if request.data['user_type1'] == 2:
                html_content= render_to_string('emailCub.html', {'first_name': myu.first_name,
                'verify_link': verify_link, 'base_url': "http://localhost:3000/", })
            if request.data['user_type1'] == 3:
                html_content = render_to_string('emailGiver.html', {'first_name': myu.first_name,
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
class MyUsers(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        # user = MyUser.objects.all()
        user = MyUser.objects.all()
        serializer = MyUserSerializer(user, many=True)
        # cub = user.cub_set.all()
        return Response(serializer.data)


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
        user = MyUser.objects.filter(user_id=self.kwargs['pk'])
        serializer = MyUserCubSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request, pk, format='json'):
        user = get_object_or_404(MyUser, user_id=pk)
        
        # Extract the email and other fields from the request
        email = request.data.get("email")
        user_data = {
            'last_name': request.data.get("last_name", user.last_name),
            'first_name': request.data.get("first_name", user.first_name),
        }

        # Handle email separately to avoid unique constraint errors
        if email and email != user.email:
            # Check for duplicate emails
            if MyUser.objects.filter(email=email).exclude(user_id=pk).exists():
                return Response({"email": "A user with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user.email = email  # Directly update email if unique
        
        # Update other fields using serializer
        user_serializer = MyUserCubSerializer(user, data=user_data, partial=True)
        
        if user_serializer.is_valid():
            user_serializer.save()  # Save only the fields in user_data
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Save email directly if it was updated and passed the uniqueness check
        if email and email != user.email:
            user.save(update_fields=['email'])  # Save only the email field
        
        return Response(user_serializer.data, status=status.HTTP_200_OK)



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
            subject, from_email, to = 'Inscription Leikka: ' + request.data.get("appelation"), settings.EMAIL_HOST_USER, request.data[
                'email']

            verify_link = "http://localhost:3000/email-verify-giver/" + token.key
            html_content = render_to_string('email.html', {'first_name':  request.data.get("appelation") ,
                                                          'password': password, 'verify_link': verify_link, 'base_url': "http://localhost:3000/", })
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


