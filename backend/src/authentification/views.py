from django.shortcuts import render
from .models import MyUser, Giver, Adress
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from .serializers import GiverSerializer, AdressSerializer, MyUserSerializer
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


class MyUser(ListAPIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        user = MyUser.objects.all()
        serializer = MyUserSerializer(user, many=True)
        return Response(serializer.data)


class CustomUserCreate(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        user = MyUser.objects.all()
        serializer = CustomUserSerializer(user, many=True)

        return Response(serializer.data)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
