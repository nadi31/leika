from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from courses.models import Course
from .serializers import CourseSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


class CourseListView(ListAPIView):

    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    # def post(self, request, *args, **kwargs):
    #    file = request.data['file']
    #    image = Course.objects.create(image=file)
#   thumbnail = Course.objects.makeThumbnail()
    #    return HttpResponse(json.dumps({'message': "Uploaded"}), status=200)"""

# Course form view


class CourseCreateView(APIView):
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        course_serializer = CourseSerializer(data=request.data)

        if course_serializer.is_valid():
            course_serializer.save()
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', course_serializer.errors)
            return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseDetailView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
