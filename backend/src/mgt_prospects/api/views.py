from django.shortcuts import render
from mgt_prospects.models import Prospect
from .serializers import ProspectSerializer
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, permissions
from rest_framework.response import Response


class ProspectCreateView(APIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        p_givers = Prospect.objects.all()
        serializer = ProspectSerializer(p_givers, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ProspectSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #queryset = Prospect.objects.all()
    #serializer_class = ProspectSerializer
