import os
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, ListCreateAPIView
from courses.models import Course, CourseHour
from .filters import DynamicSearchFilter
from .serializers import CourseSerializer, CourseHoursSerializer, CourseUpdateSerializer, researchSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics

from django_filters import rest_framework as filters


class researchCourseList(ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    # queryset = Course.objects.all()

   # def get_queryset(self):
    search_fields = ['category']
    #filter_backends = (filters.SearchFilter,)
    queryset = Course.objects.all()
    serializer_class = researchSerializer
    # serializer = CourseSerializer(courses, many=True)
    # print("REQ: ", self.request.GET.get('q'))
    # query = self.request.GET.get('q')
    # print("GET REQUEST: ", query)
    # courses = Course.objects.filter(
    #    Q(category__icontains=query) | Q(
    #        sub_category__icontains=query) | Q(isRemote=self.request.GET.get("isRemote"))
    # ).distinct()
    # print("Courses", courses)
    # serial = self.get_serialized_class(query)
    # print("SERIAL/ ", serial)
    # serializer = CourseSerializer(courses, many=True)
    # print("Courses", serializer.data)
    # json = serializer.data
    # return serializer.data
    # return courses

   # def get_serialized_class(self, query):
    #    queryset = Course.objects.filter(
    #        Q(category__icontains=query) | Q(
    #            sub_category__icontains=query)  # | Q(isRemote=query)
    #    ).distinct()
    #    serializer = researchSerializer(queryset, many=True)
    # serializer.is_valid(raise_exception=True)
    # data=serializer.validated_data
    #    data = serializer.data
    #    print("SERIAL", data)
    #    return render(query,"search.html",{"books":status})

    # return Response(data)

# recherche générale


class researchCourse(ListCreateAPIView):

    permission_classes = (permissions.AllowAny,)
    # queryset = Course.objects.all()
    #filter_backends = (DynamicSearchFilter,)
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = DynamicSearchFilter
    # search_fields = ['category', 'age', 'isIntermediate', 'isAdvanced', 'isBeginner', 'category',
    #                 'sub_category', 'price', 'seats', 'isRemote', 'date', 'owner__adress__city', 'isVerified']
    queryset = Course.objects.all()
    # print("QUERY", queryset)
   # queryset.filter(isRemote__exact=u'False')
    serializer_class = researchSerializer
    # filterset_class = DynamicSearchFilter
    # query = self.request.GET.get('q')

    # def get_queryset(self):
    #   print("QUERY", self.queryset)
    # filterset_fields = ['isRemote']

    # queryset = Course.objects.all()
    # request = self.request.GET.getlist('search_fields')
    # request_part1=self.request.GET.getlist('search')
    # print("****ISREMOTE", self.request.GET.getlist('search_fields'))
    # if request[0].find('isRemote') != -1:
    #    queryset = queryset.filter(isRemote='True')
    # return queryset

    # isRemote = self.kwargs['isRemote']
    # return Course.objects.filter(isRemote=isRemote)
    # print ()


class CourseListView(ListAPIView):

    permission_classes = (permissions.AllowAny,)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

# def post(self, request, *args, **kwargs):
#    file = request.data['file']
#    image = Course.objects.create(image=file)
#   thumbnail = Course.objects.makeThumbnail()
#    return HttpResponse(json.dumps({'message': "Uploaded"}), status=200)"""

# Course form view


class CourseListGiverView(ListAPIView):

    permission_classes = (permissions.AllowAny,)
    queryset = Course.objects.all()
   # serializer_class = CourseSerializer

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        courses = Course.objects.filter(owner=self.kwargs['pk'])
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseListGiverCubView(ListAPIView):

    permission_classes = (permissions.AllowAny,)
    queryset = Course.objects.all()
   # serializer_class = CourseSerializer

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        courses = Course.objects.filter(
            owner=self.kwargs['pk'], isVerified=True)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseCreateView(APIView):
    permission_classes = (permissions.AllowAny,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        course_serializer = CourseSerializer(data=request.data)
        print("REQ", request.data)
        if course_serializer.is_valid():
           # if request.POST['creation_front'] != True:
            course_serializer.save()
            #course = Course.objects.filter(id=request.data.get("coursesID"))
            # createCourseHour(course_serializer.data)
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', course_serializer.errors)
            return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseUpdateView(APIView):
    permission_classes = (permissions.AllowAny,)

    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        course = Course.objects.filter(id=self.kwargs["pk"])
        serializer = CourseSerializer(course, many=True)
        return Response(serializer.data)

    def post(self,  request, pk, format='json'):
        print("VALEUR1 ", request.data.get("value"))
        valeur = 0
        # valeur = int(request.data.get("value"))
        print("VALEUR2 ", valeur)
        print("REQUEST : ", request.data)
        print("REQUEST : ", request.data.get("coursesID"))
        course = Course.objects.filter(id=request.data.get("coursesID"))
        course.update(title=request.data.get("title"), content=request.data.get("content"), date=request.data.get("date"), hour=request.data.get("hour"), isVerified=False, price=request.data.get("price"), isDiscounted=request.data.get("isDiscounted"), discount=request.data.get("discount"), isRemote=request.data.get("isRemote"), seats=request.data.get("seats"), dateFin=request.data.get("dateFin"), hourFin=request.data.get(
            "hourFin"), isIntermediate=request.data.get("isIntermediate"), isBeginner=request.data.get("isBeginner"), isAdvanced=request.data.get("isAdvanced"), category=request.data.get("category"), sub_category=request.data.get("sub_category"), age=request.data.get("age"), value=valeur, date_fin=request.data.get("date_fin"), courseHourIsCreated=False)
        req = request.POST.copy()
        print("***REQ1: ", req)
        print("REQUEST FILES: ", request.FILES)
        obj = Course.objects.get(id=request.data.get("coursesID"))
        os.remove(obj.thumbnail2.path)
        os.remove(obj.thumbnail1.path)
        os.remove(obj.thumbnail3.path)
        if request.FILES != {}:

            if request.FILES.get("img1"):

                os.remove(obj.img1.path)

                obj.img1 = request.FILES.get("img1")
            if request.FILES.get("img2"):

                os.remove(obj.img2.path)

                obj.img2 = request.FILES.get("img2")
            if request.FILES.get("img3"):

                os.remove(obj.img3.path)

                obj.img3 = request.FILES.get("img3")

            # req.pop("img1")
            # req.pop("img2")
            # req.pop("img3")

        obj.save()

        serializer = CourseUpdateSerializer(data=req)

        if serializer.is_valid():
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # title = models.CharField(max_length=300, null=True, blank=True)
    # content = models.TextField(null=True, blank=True)
    # If a field has blank=True, form validation will allow entry of an empty value. null is purely database-related
   # date = models.DateField(null=True, blank=True)
    # hour = models.TimeField(null=True, blank=True)
    # isVerified = models.BooleanField(default=False)
    # price = models.FloatField(null=True, blank=True)

   # isDiscounted = models.BooleanField(default=False)
    # discount = models.FloatField(null=True, blank=True)
   # isRemote = models.BooleanField(default=False)
    # points = models.IntegerField(null=True, blank=True)
    # seats = models.IntegerField(null=True, blank=True)
   # needCertificate = models.BooleanField(default=False)
   # dateFin = models.DateField(null=True, blank=True)
    # hourFin = models.TimeField(null=True, blank=True)
  #  imgName = models.URLField(max_length=200, blank=True, null=True)

   # isIntermediate = models.BooleanField(default=False)
  #  isBeginner = models.BooleanField(default=False)
  #  isAdvanced = models.BooleanField(default=False)
    # giver= models.ForeignKey(Giver, on_delete=models.CASCADE)
    # category = models.CharField(max_length=200, null=True, blank=True)


class CourseDetailView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseHoursDetailView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = CourseHour.objects.all()
    serializer_class = CourseHoursSerializer


class CustomHours(APIView):
    model = CourseHour
    permission_classes = (permissions.AllowAny,)
   # serializer_class = CourseHoursSerializer

    def get(self, requerst, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        courses = CourseHour.objects.filter(course=self.kwargs['pk'])
        if courses.exists():
            serializer = CourseHoursSerializer(courses, many=True)
            return Response(serializer.data)
        else:
            print('error', serializer.errors)


class CourseHoursCreateView(APIView):
    permission_classes = (permissions.AllowAny,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

  #  def get(self, request, *args, **kwargs):
   #     courseHour = Course.objects.all()
    #    serializer = CourseSerializer(courses, many=True)
    #    return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        courses = CourseHour.objects.all()
        serializer = CourseHoursSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        courseHour_serializer = CourseHoursSerializer(data=request.data)

        if courseHour_serializer.is_valid():
            courseHour_serializer.save()
            return Response(courseHour_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', courseHour_serializer.errors)
            return Response(courseHour_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
