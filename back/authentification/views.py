from django.shortcuts import render
from .models import MyUser, Giver, Adress, Cub
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from .serializers import GiverSerializer, AdressSerializer, MyUserSerializer, CubSerializer, CubUpdateSerializer, CubPhoneUpdateSerializer, MyUserCubSerializer, CubUpdateMdpSerializer
import os
from rest_framework.generics import ListAPIView
from rest_framework.parsers import MultiPartParser


class AdressDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

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


class GiverDetailView(APIView):
    parser_classes = (MultiPartParser,)
    permission_classes = (permissions.AllowAny,)
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
        user = Giver.objects.filter(id=self.kwargs['pk'])
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
        #print("***REQ: ", req.data)
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


class ObtainTokenPairWithColorView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


# class MyUser(ListAPIView):

#    permission_classes = (permissions.AllowAny,)

#    def get(self, request, *args, **kwargs):
#        user = MyUser.objects.all()
#        serializer = MyUserSerializer(user, many=True)
#        return Response(serializer.data)


class CustomUserCreate(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        user = MyUser.objects.all()
        serializer = CustomUserSerializer(user, many=True)

        return Response(serializer.data)

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

    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        #user = MyUser.objects.all()
        user = Cub.objects.all()
        serializer = CubSerializer(user, many=True)
        #cub = user.cub_set.all()
        return Response(serializer.data)


class CubView(APIView):

    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        #user = MyUser.objects.all()
        user = MyUser.objects.filter(user_id=self.kwargs['pk'])
        serializer = MyUserCubSerializer(user, many=True)
        #cub = user.cub_set.all()
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
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        user = Cub.objects.filter(user=self.kwargs['pk'])
        serializer = CubSerializer(user, many=True)
        #cub = user.cub_set.all()
        return Response(serializer.data)


class CubUpdateMdpView(APIView):
    permission_classes = (permissions.AllowAny,)
    #parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        user = MyUser.objects.filter(user_id=self.kwargs['pk'])
        serializer = MyUserSerializer(user, many=True)
        #cub = user.cub_set.all()
        return Response(serializer.data)

    def post(self,  request, pk, format='json'):
        print("RESTRSTRSD" + str(request.data))

        myuser = MyUser.objects.get(username=request.data['username'])
       # myuser= MyUser.objects.get(user_id=self.kwargs['pk'])
        if request.data['password']:

            print("RES = " + str(request.data))
            # request.data.pop('username')
            print("RES = " + str(request.data))
            #pwd= MyUser.set_password(request.data['raw_password'])
            #print("PASS"+ str(pwd))
            # user.update(password=pwd

            # user.update(password=request.data.pop('password'))
            # user.save()
        # user.save()

            user = CubUpdateMdpSerializer(data=request.data)

            if user.is_valid():
                user.update(myuser, request.data)
                json = user.data

                return Response(json, status=status.HTTP_201_CREATED)
            else:
                print('error', user.errors)
                return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
