import os
import json
from rest_framework.parsers import JSONParser
from django.db.models import Max, Min
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, ListCreateAPIView
from courses.models import Course, CourseHour, Booking, SingleBooking
from authentification.models import Giver, Adress
#from .filters import DynamicSearchFilter
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.db.models import Q
#from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics
from authentification.serializers import GiverSerializer, AdressSerializer
#from django_filters import rest_framework as filters


class researchCourseList(ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    model = Course
    model = Giver
    model = Adress
    queryset = Course.objects.all()
    queryset2 = Adress.objects.all()
    queryset3 = Giver.objects.all()
    serializer_class = CourseSerializer

    def get_queryset(self):  # new
        #query = self.request.GET.get('q')
        course_list = Course.objects.all()
        # SI la categorie est précisée:
        #course_list_sub_cat = []
        if self.request.query_params.get('sub_category'):
            sub_category = self.request.query_params.get('sub_category')
            print("**********"+"sub_category " + sub_category)
            course_list_sub_cat = Course.objects.filter(
                Q(sub_category__icontains=sub_category))  # | Q(state__icontains=query)
            for course in course_list_sub_cat:
                print(course.id)
        else:
            course_list_sub_cat = course_list
        if self.request.query_params.get('category'):

            category = self.request.query_params.get('category')
            print("**********"+"category " + category)
            course_list_cat = Course.objects.filter(
                category=category)  # | Q(state__icontains=query)
            for course in course_list_cat:
                print(course.id)
        else:
            course_list_cat = course_list
        # SI la ville est précisée:
        if self.request.query_params.get('city'):

            city = self.request.query_params.get('city')
            print("**********"+"ville " + city)

            adress_list = Adress.objects.filter(
                Q(city__icontains=city)).values_list('id')
            if adress_list:
                for adress in adress_list:

                    print("**"+str(adress))
                    giver_list = Giver.objects.filter(
                        adress_id=adress).values_list('id')
                    #print("GIVER"+ giver_list)
                    for giver in giver_list:
                        course_list_city = Course.objects.filter(owner=giver)
                        for course in course_list_city:
                            print(course.id)
            else:
                course_list_city = Course.objects.none()
        else:
            course_list_city = course_list

        # SI le prix min est précisé
        if self.request.query_params.get('prix_min') and not(self.request.query_params.get('prix_max')):
            prix_min = int(self.request.query_params.get('prix_min'))
            course_list_pmin = course_list.filter(Q(price__gte=prix_min))
            print("**********"+"prix " + str(prix_min))
        # SI le prix max est précisé
        else:
            course_list_pmin = course_list

        if self.request.query_params.get('prix_max') and not (self.request.query_params.get('prix_min')):
            prix_max = int(self.request.query_params.get('prix_max'))
            course_list_pmax = course_list.filter(Q(price__lt=prix_max))
            print("**********"+"prix_max " + str(prix_max))
        else:
            course_list_pmax = course_list
        # SI les prix min et max sont précisés
        if self.request.query_params.get('prix_max') and self.request.query_params.get('prix_min'):
            prix_max = int(self.request.query_params.get('prix_max'))
            prix_min = int(self.request.query_params.get('prix_min'))
            course_list_p = course_list.filter(
                Q(price__lt=prix_max, price__gte=prix_min))
        else:
            course_list_p = course_list

        # SI les dates sont précisés
        if self.request.query_params.get('date_max') and not (self.request.query_params.get('date_min')):
            date_max = self.request.query_params.get('date_max')
            print("**********"+"date_max " + str(date_max))
            course_list_dmax = course_list.filter(Q(date__lt=date_max))
        else:
            course_list_dmax = course_list
        if self.request.query_params.get('date_min') and not (self.request.query_params.get('date_max')):
            date_min = self.request.query_params.get('date_min')
            print("**********"+"date_min " + str(date_min))
            course_list_dmin = course_list.filter(Q(date__gte=date_min))
        else:
            course_list_dmin = course_list
        if self.request.query_params.get('date_min') and (self.request.query_params.get('date_max')):

            date_max = self.request.query_params.get('date_min')
            date_min = self.request.query_params.get('date_max')
            print("**********"+"date_min " + str(date_min))
            print("**********"+"date_max " + str(date_max))
            course_list_d = course_list.filter(
                Q(date__lt=date_min, date__gte=date_max))
        else:
            course_list_d = course_list
        # SI seats est précisé

        if self.request.query_params.get('seats'):
            seats = int(self.request.query_params.get('seats'))
            course_list_seats = course_list.filter(Q(seats__gte=seats))
            print("**********"+"seats " + str(seats))
        else:
            course_list_seats = course_list
        intersection = course_list_cat & course_list_city & course_list_d & course_list_dmax & course_list_dmin & course_list_pmax & course_list_pmin & course_list_p & course_list_seats & course_list_sub_cat
        serializer = CourseSerializer(intersection, many=True)
        for inter in intersection:
            print("**"+str(inter.id))
        if serializer:
            return intersection
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""search_fields = ['category']
    filter_backends = (filters.SearchFilter,)
    queryset = Course.objects.all()
    serializer_class = researchSerializer
    serializer = CourseSerializer(courses, many=True)
    print("REQ: ", self.request.GET.get('q'))
    query = self.request.GET.get('q')
    print("GET REQUEST: ", query)
    courses = Course.objects.filter(Q(category__icontains=query) | Q(sub_category__icontains=query) | Q(isRemote=self.request.GET.get("isRemote"))).distinct()
    print("Courses", courses)
    serial = self.get_serialized_class(query)
    print("SERIAL/ ", serial)
    serializer = CourseSerializer(courses, many=True)
    print("Courses", serializer.data)
    json = serializer.data
    return json"""
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
# def get(self, request, *args, **kwargs):
#print ("RESQUEST"+ self.request.GET.get('q'))
#q1= Course.objects.all().filter(category== self.request.GET.get('category'))
#q2= q1.filter(category== self.request.GET.get('lieu'))


class researchCourse(ListCreateAPIView):

    permission_classes = (permissions.AllowAny,)
    # queryset = Course.objects.all()
    #filter_backends = (DynamicSearchFilter,)
    #filter_backends = (filters.DjangoFilterBackend,)
    #filterset_class = DynamicSearchFilter
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


# class CourseComplete(RetrieveAPIView):
#     permission_classes = (permissions.AllowAny,)

#     queryset = Course.objects.all()
#     queryset = CourseHour.objects.all()
#     queryset = Giver.objects.all()
#     queryset = Adress.objects.all()
#     def get(self,request, *args, **kwargs):
#         # user = Giver.objects.filter(id=self.kwargs['pk'])
#         course = Course.objects.get(id=self.kwargs["pk"])
#         course_owner = course.owner_id
#         print ("ID"+ str(course_owner))
#         giver = Giver.objects.get(id = course_owner)
#         giver_adress = giver.adress_id
#         adress = Adress.objects.get(id=giver_adress)
#         courseHour = CourseHour.objects.get(course=self.kwargs['pk'])
#         context = {
#             "request": request,
#         }


#         #response = course + giver + adress+ courseHour
#         serializer = CourseCompleteSerializer(course, giver,  adress,courseHour, many=True)
#         return Response(serializer.data)

class SingleBookingView(ListAPIView):

    permission_classes = (permissions.AllowAny,)
    queryset = SingleBooking.objects.all()
    serializer_class = SingleBookingSerializer

    def get(self, request, *args, **kwargs):
        singlebookings = SingleBooking.objects.all()
        serializer = SingleBookingSerializer(singlebookings, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        single_serializer = SingleBookingSerializer(data=request.data)
        print("REQ", request.data)
        if single_serializer.is_valid():
           # if request.POST['creation_front'] != True:
            single_serializer.save()
            #course = Course.objects.filter(id=request.data.get("coursesID"))
            # createCourseHour(course_serializer.data)
            return Response(single_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', single_serializer.errors)
            return Response(single_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingView(APIView):
    permission_classes = (permissions.AllowAny,)
   # serializer_class = CourseHoursSerializer

    def get(self, request, *args, **kwargs):
        bookings = Booking.objects.all()
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):

        print(request.data.get('cub'))
        req_cub = request.data.copy()
        del req_cub["single"]
        booking_serializer = BookingSerializer(
            data=req_cub)
        print("REQ", request.data)
        if booking_serializer.is_valid():

            obj = booking_serializer.save()

            print("ID" + str(obj.id))
            singleBookings = request.data.get('single')
            print(singleBookings)
            for single in singleBookings:
                print(single)
                print("REQUEST ***" + str(single["courses"]))
                print("REQUEST ***" + str(single["courseHour"]))
                single["booking"] = obj.id
                # course = list(Course.objects.filter(
                #   id=single["courses"]).values())
                # courseHour = list(CourseHour.objects.filter(
                #    id=single["courseHour"]).values())
                # print(course)

        # createCourseHour(course_serializer.data)

                print(single)

                single_serializer = SingleBookingSerializer(
                    data=single)

                if single_serializer.is_valid():

                    single_serializer.save()
                else:
                    print('error', single_serializer.errors)

                Response(single_serializer.data,
                         status=status.HTTP_201_CREATED)

        else:
            print('error', booking_serializer.errors)

        return Response(booking_serializer.data, status=status.HTTP_201_CREATED)


class BookingCubView(APIView):
    model = Booking
    permission_classes = (permissions.AllowAny,)
   # serializer_class = CourseHoursSerializer

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        cub_id = Cub.objects.get(user=self.kwargs['pk'])
        print(cub_id.id)
        bookings = Booking.objects.filter(cub=cub_id.id)

        serializer = BookingSerializer(bookings, many=True)

        return Response(serializer.data)


class SingleBookingCubView(APIView):
    model = SingleBooking
    permission_classes = (permissions.AllowAny,)
   # serializer_class = CourseHoursSerializer

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        singles = SingleBooking.objects.filter(booking=self.kwargs['pk'])

        serializer = SingleBookingSerializer(singles, many=True)
        return Response(serializer.data)


class CourseHoursDetailView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = CourseHour.objects.all()
    serializer_class = CourseHoursSerializer


class CustomHours(APIView):
    model = CourseHour
    permission_classes = (permissions.AllowAny,)
   # serializer_class = CourseHoursSerializer

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        courses = CourseHour.objects.filter(course=self.kwargs['pk'])

        serializer = CourseHoursSerializer(courses, many=True)
        return Response(serializer.data)


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


class ReviewListViewAll(APIView):

    permission_classes = (permissions.AllowAny,)
    parser_classes = [JSONParser]

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        reviews = Review.objects.all()

        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        ratingComplete = request.data
        singleBooking = SingleBooking.objects.get(
            id=request.data.get("booking"))
        #print('single' + str(singleBooking[0].id))

        cub = MyUser.objects.get(
            user_id=request.data.get("cub"))
        ratingComplete["cub"] = Cub.objects.get(
            user_id=request.data.get("cub")).id

        print(ratingComplete["cub"])
        ratingComplete["prenom"] = cub.first_name
        ratingComplete["initiale"] = cub.last_name[0]
        reviewSerializer = ReviewSerializer(data=ratingComplete)
        if reviewSerializer.is_valid():
            singleBooking.isCommented = True
            singleBooking.save()
            reviewSerializer.save()
            return Response(reviewSerializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', reviewSerializer.errors)
            return Response(reviewSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewListViewGiver(ListAPIView):

    permission_classes = (permissions.AllowAny,)
    queryset = Review.objects.all()

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        giver = Giver.objects.get(id=self.kwargs['pk'])

        reviewPerGiver = Review.objects.filter(course__owner=giver.id)

        serializer = ReviewSerializer(reviewPerGiver, many=True)
        return Response(serializer.data)


class ReviewListViewCourse(ListAPIView):

    permission_classes = (permissions.AllowAny,)
    queryset = Review.objects.all()

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        reviewPerCourse = Review.objects.filter(course=self.kwargs['pk'])

        serializer = ReviewSerializer(reviewPerCourse, many=True)
        return Response(serializer.data)


class ReviewListViewCub(ListAPIView):

    permission_classes = (permissions.AllowAny,)
    queryset = Review.objects.all()

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        cub_id = Cub.objects.get(user=self.kwargs['pk'])
        print(cub_id.id)
        reviewPerCourse = Review.objects.filter(cub=cub_id.id)

        serializer = ReviewSerializer(reviewPerCourse, many=True)
        return Response(serializer.data)
