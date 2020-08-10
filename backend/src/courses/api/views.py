from rest_framework.generics import ListAPIView, RetrieveAPIView
from courses.models import Course
from .serializers import CourseSerializer, PictureSerializer


class CourseListView(ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def post(self, request, *args, **kwargs):
        file = request.data['file']
        image = Course.objects.create(image=file)
        thumbnail = Course.objects.makeThumbnail()
        return HttpResponse(json.dumps({'message': "Uploaded"}), status=200)


class CourseDetailView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class PicView(RetrieveAPIView):

    queryset = Course.objects.all()
    serializer_class = PictureSerializer
