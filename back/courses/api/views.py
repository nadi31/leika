import os
import json
import googlemaps
from rest_framework.parsers import JSONParser
from django.core.mail import send_mail
from django.db.models import Max, Min
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, ListCreateAPIView
from courses.models import Course, CourseHour, Booking, SingleBooking
from authentification.models import Giver, Adress
from authentification.permissions import *
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
# from .filters import DynamicSearchFilter
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, filters
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.db.models import Q
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.template.loader import render_to_string
from rest_framework import generics
from authentification.perm import GiverAdminOrReadOnlyCourses
from authentification.serializers import GiverSerializer, AdressSerializer
from django.forms.models import model_to_dict
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.utils.html import strip_tags
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.utils import timezone
# from django_filters import rest_framework as filters


class researchCourseList(ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)
    model = Course
    model = Giver
    model = Adress
    # Cache keys for each queryset
    course_cache_key = 'courses'
    address_cache_key = 'addresses'
    giver_cache_key = 'givers'

        # Try to retrieve from cache
    queryset = cache.get(course_cache_key)
    queryset2 = cache.get(address_cache_key)
    queryset3 = cache.get(giver_cache_key)

        # If not cached, query and store in cache
    if not queryset:
        queryset = Course.objects.all()
        cache.set(course_cache_key, queryset, timeout=60 * 60*4)  # Cache for 1 hour
    if not queryset2:
        queryset2 = Adress.objects.all()
        cache.set(address_cache_key, queryset2, timeout=60 * 60*4)  # Cache for 1 hour
    if not queryset3:
        queryset3 = Giver.objects.all()
        cache.set(giver_cache_key, queryset3, timeout=60 * 60*4)  # Cache for 1 hour

   
    serializer_class = ResearchCourseSerializer
    @method_decorator(cache_page(60 * 60 * 4), name='dispatch')
    def get(self, request, *args, **kwargs):
        # Fetch filtered queryset
        course_list = self.get_queryset()

        # Serialize the queryset (no need for .is_valid())
        serializer = ResearchCourseSerializer(course_list, many=True)

        # Return the serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)


    @method_decorator(cache_page(60 * 60 * 4), name='dispatch')
    def get_queryset(self):  
        # Start with all courses
        course_list = Course.objects.all()

        # Apply city filtering using Google Maps
        city = self.request.query_params.get('city')
        if city:
            gmaps = googlemaps.Client(key='AIzaSyAxRDhglWqo6ifggUxWQVDsm623tPfp_a4')
            city_filtered_courses = []

            for course in course_list:
                try:
                    adress = Adress.objects.get(id=course.lieu)
                    res = gmaps.distance_matrix(city, str(adress))

                    # Filter by distance
                    if res['rows'][0]['elements'][0]['distance']['value'] < 20000:
                        city_filtered_courses.append(course)
                except Adress.DoesNotExist:
                    continue

            # Replace course_list with city_filtered_courses
            course_list = Course.objects.filter(id__in=[course.id for course in city_filtered_courses])

        # Apply date_max filter
        date_max = self.request.query_params.get('date_max')
        if date_max:
            course_ids = []
            for course in course_list:
                try:
                    courseHour = CourseHour.objects.get(course=course.id)
                    if str(courseHour.date) == date_max:
                        course_ids.append(course.id)
                except CourseHour.DoesNotExist:
                    continue
            course_list = Course.objects.filter(id__in=course_ids)

        # Apply additional filters using chaining logic
        if self.request.query_params.get('terroir'):
            course_list = course_list.filter(terroirActivity=True)

        if self.request.query_params.get('team'):
            course_list = course_list.filter(teamBuildingActivity=True)

        if self.request.query_params.get('kids'):
            course_list = course_list.filter(Q(age__icontains="enfants"))

        if self.request.query_params.get('parent'):
            course_list = course_list.filter(Q(age__icontains="parent"))

        if self.request.query_params.get('bday'):
            course_list = course_list.filter(birthdayActivity=True)

        if self.request.query_params.get('sub_category'):
            sub_category = self.request.query_params.get('sub_category')
            course_list = course_list.filter(Q(sub_category__icontains=sub_category))

        if self.request.query_params.get('category'):
            category = self.request.query_params.get('category')
            course_list = course_list.filter(category=category)

        # Pre-fetch related fields to avoid N+1 query problem
        course_list = course_list.select_related('owner__user')
        return course_list



        


"""search_fields = ['category']
    filter_backends = (filters.SearchFilter,)
    queryset = Course.objects.all()
    serializer_class = researchSerializer
    serializer = CourseSerializer(courses, many=True)
    print("REQ: ", self.request.GET.get('q'))
    query = self.request.GET.get('q')
    print("GET REQUEST: ", query)
    courses = Course.objects.filter(Q(category__icontains=query) | Q(
        sub_category__icontains=query) | Q(isRemote=self.request.GET.get("isRemote"))).distinct()
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
# print ("RESQUEST"+ self.request.GET.get('q'))
# q1= Course.objects.all().filter(category== self.request.GET.get('category'))
# q2= q1.filter(category== self.request.GET.get('lieu'))


class researchCourse(ListCreateAPIView):

    permission_classes = (permissions.AllowAny,)
    # queryset = Course.objects.all()
    # filter_backends = (DynamicSearchFilter,)
    # filter_backends = (filters.DjangoFilterBackend,)
    # filterset_class = DynamicSearchFilter
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


@method_decorator(cache_page(60 * 60 * 4), name='dispatch')
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

    permission_classes = (IsAdminOrSuperUser, IsGiver,)
    queryset = Course.objects.all()
   # serializer_class = CourseSerializer

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        courses = Course.objects.filter(owner=self.kwargs['pk'])
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseListGiverCubView(ListAPIView):

    permission_classes = (IsAdminOrSuperUser, IsGiver,)
    queryset = Course.objects.all()
   # serializer_class = CourseSerializer

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        courses = Course.objects.filter(
            owner=self.kwargs['pk'], isVerified=True)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseCreateView(APIView):
    
    permission_classes = ( IsGiver,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

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
            # course = Course.objects.filter(id=request.data.get("coursesID"))
            # createCourseHour(course_serializer.data)
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', course_serializer.errors)
            return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseGiverView(APIView):
    permission_classes = (IsAll,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):

        courses = Course.objects.filter(
            owner=self.kwargs["pk"], isVerified=False)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseGiveOnlineView(APIView):
    permission_classes = (IsAll,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):

        courses = Course.objects.filter(
            owner=self.kwargs["pk"], isVerified=True)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseAdminOnlineView(APIView):
    permission_classes = (IsAdminOrSuperUser,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):

        courses = Course.objects.filter(
            isVerified=False)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseUpdateAdminVerifyView(APIView):
    permission_classes = (IsAdminOrSuperUser,)

    parser_classes = (MultiPartParser, FormParser)

    def post(self,  request, pk, format='json'):
        print("VALEUR1 ", request.data.get("value"))
        valeur = 0
        # valeur = int(request.data.get("value"))
        print("VALEUR2 ", request.data.get("img1"))
        print("REQUEST : ", request.data)
        print("REQUEST : ", request.data.get("coursesID"))
        course = Course.objects.filter(id=request.data.get("coursesID"))
        course.update(title=request.data.get("title"), content=request.data.get("content"), date=request.data.get("date"), hour=request.data.get("hour"), isVerified=True, price=request.data.get("price"), isDiscounted=request.data.get("isDiscounted"), discount=request.data.get("discount"), isRemote=request.data.get("isRemote"), seats=request.data.get("seats"), dateFin=request.data.get("dateFin"), hourFin=request.data.get(
            "hourFin"), isIntermediate=request.data.get("isIntermediate"), isBeginner=request.data.get("isBeginner"), isAdvanced=request.data.get("isAdvanced"), category=request.data.get("category"), sub_category=request.data.get("sub_category"), age=request.data.get("age"), value=valeur, date_fin=request.data.get("date_fin"), courseHourIsCreated=False,)
        req = request.POST.copy()
        print("***REQ1: ", req)
        print("REQUEST FILES: ", request.FILES)
        obj = Course.objects.get(id=request.data.get("coursesID"))
       # os.remove(obj.thumbnail2.path)
       # os.remove(obj.thumbnail1.path)
       # os.remove(obj.thumbnail3.path)
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
        print("VALEUR2 ", request.data.get("img1"))
        print("REQUEST : ", request.data)
        print("REQUEST : ", request.data.get("coursesID"))
        course = Course.objects.filter(id=request.data.get("coursesID"))
        course.update(title=request.data.get("title"), content=request.data.get("content"), date=request.data.get("date"), hour=request.data.get("hour"), isVerified=False, price=request.data.get("price"), isDiscounted=request.data.get("isDiscounted"), discount=request.data.get("discount"), isRemote=request.data.get("isRemote"), seats=request.data.get("seats"), dateFin=request.data.get("dateFin"), hourFin=request.data.get(
            "hourFin"), isIntermediate=request.data.get("isIntermediate"), isBeginner=request.data.get("isBeginner"), isAdvanced=request.data.get("isAdvanced"), category=request.data.get("category"), sub_category=request.data.get("sub_category"), age=request.data.get("age"), value=valeur, date_fin=request.data.get("date_fin"), courseHourIsCreated=False,)
        req = request.POST.copy()
        print("***REQ1: ", req)
        print("REQUEST FILES: ", request.FILES)
        obj = Course.objects.get(id=request.data.get("coursesID"))
       # os.remove(obj.thumbnail2.path)
       # os.remove(obj.thumbnail1.path)
       # os.remove(obj.thumbnail3.path)
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

@method_decorator(cache_page(60 * 60 * 4), name='dispatch')
class CourseDetailView(RetrieveAPIView):
    permission_classes = (IsAll,)

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

    permission_classes = (IsAdminOrSuperUser,)
    #permission_classes = (permissions.is_authenticated)
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
            # course = Course.objects.filter(id=request.data.get("coursesID"))
            # createCourseHour(course_serializer.data)
            return Response(single_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', single_serializer.errors)
            return Response(single_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
class BookingGiver(APIView):

    permission_classes = (IsAll,)
    model = SingleBooking
    def get(self, request, *args, **kwargs):
        id_giver=  self.kwargs['pk']
        print("ID GIVER "+ id_giver)
        queryset = SingleBooking.objects.filter(owner=id_giver)
        serializer = SingleBookingSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)










class BookingView(APIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            items = data.get('items', [])
            total_amount = data.get('totalAmount')
            cub_id= data.get('id_user')
            user_email= data.get('userEmail')

            # Step 1: Retrieve Cub instance
            try:
                cub = Cub.objects.filter(user=cub_id)
                print (cub_id)
            except Cub.DoesNotExist:
                return Response({"error": "Cub not found"}, status=status.HTTP_404_NOT_FOUND)
            
            # Step 2: Create Booking instance
            booking_data = {
                "cub": cub_id,
                "dateHour": timezone.now()
            }
            booking_serializer = BookingSerializer(data=booking_data)
            
            if booking_serializer.is_valid():
                booking = booking_serializer.save()
            else:
                return Response(booking_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
            # Step 3: Create SingleBooking instances for each item
            single_bookings_data = []
            for item in items:
                
                
                single_booking_data = {
                    "courseHour": item['hourSelected']['id'],
                    "seats": item['seats'],
                    "courses": item['key'],
                    "booking": booking.id,
                    "owner":  item['owner'],
                }
                single_bookings_data.append(single_booking_data)

            for single_booking in single_bookings_data:
                single_booking_serializer = SingleBookingSerializer(data=single_booking)
                if single_booking_serializer.is_valid():
                    single_booking_serializer.save()
                else:
                    return Response(single_booking_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Step 4: Send emails to user and giver
            if user_email:
                for item in items:
                    # Render the user email template
                    html_content = render_to_string('order.html', {
                        'name': item['name'],
                        'key': item['key'],
                        'price': item['price'],
                        'seats': item['seats'],
                        'currency': item['currency'],
                        'img': item['img'],
                        'emailGiver': item['emailGiver'],
                        'adress': item['adress'],
                        'hour': item['hourSelected']['hour'],
                        'date': item['hourSelected']['date']
                    })
                    plain_message = strip_tags(html_content)

                    send_mail(
                        'Votre Récapitulatif de Paiement',
                        plain_message,
                        settings.EMAIL_HOST_USER,
                        [user_email],
                        html_message=html_content,
                        fail_silently=False,
                    )

                # Send an email to each giver with detailed recap
                for item in items:
                    giver_email = item['emailGiver']
                    # Render the giver recap HTML template with provided data
                    giver_html_content = render_to_string('recap.html', {
                        'name': item['name'],
                        'key': item['key'],
                        'price': item['price'],
                        'seats': item['seats'],
                        'currency': item['currency'],
                        'img': item['img'],
                        'adress': item['adress'],
                        'hour': item['hourSelected']['hour'],
                        'date': item['hourSelected']['date']
                    })
                    giver_plain_message = strip_tags(giver_html_content)

                    send_mail(
                        'Nouvelle Réservation - Récapitulatif',
                        giver_plain_message,
                        settings.EMAIL_HOST_USER,
                        [giver_email],
                        html_message=giver_html_content,
                        fail_silently=False,
                    )

            return Response({"message": "Booking created and emails sent successfully"}, status=status.HTTP_201_CREATED)

        except Cub.DoesNotExist:
            return Response({"error": "Cub not found"}, status=status.HTTP_404_NOT_FOUND)

        except CourseHour.DoesNotExist:
            return Response({"error": "CourseHour not found"}, status=status.HTTP_404_NOT_FOUND)

        except Course.DoesNotExist:
            return Response({"error": "Course not found"}, status=status.HTTP_404_NOT_FOUND)

        except Giver.DoesNotExist:
            return Response({"error": "Giver not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class BookingCubView(APIView):
    model = Booking
    permission_classes = (IsCub,)
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
    permission_classes = (IsCub,)
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

    def delete(self, request, *args, **kwargs):
        print("FILTER " + self.kwargs['pk'])
        CourseHour.objects.filter(course=self.kwargs['pk']).delete()
        courses = CourseHour.objects.filter(course=self.kwargs['pk'])
        serializer = CourseHoursSerializer(courses, many=True)
        return Response(serializer.data)


class OfferssCreateView(APIView):
    permission_classes = (permissions.AllowAny,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

  #  def get(self, request, *args, **kwargs):
   #     courseHour = Course.objects.all()
    #    serializer = CourseSerializer(courses, many=True)
    #    return Response(serializer.data)

    queryset = Offers.objects.all()

    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        offerPerCourse = Offers.objects.filter(course=self.kwargs['pk'])

        serializer = OffersSerializer(offerPerCourse, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        # Post.objects.filter(pub_date__gt=datetime.now()).delete(

        offerSerial = OffersSerializer(data=request.data)

        if offerSerial.is_valid():
            offerSerial.save()
            return Response(offerSerial.data, status=status.HTTP_201_CREATED)
        else:
            print('error', offerSerial.errors)
            return Response(offerSerial.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        print("FILTER " + self.kwargs['pk'])
        Offers.objects.filter(course=self.kwargs['pk']).delete()
        #courses = CourseHour.objects.filter(course=self.kwargs['pk'])
        #serializer = OffersSerializer(off, many=True)
        status = status.HTTP_204_NO_CONTENT
        return Response(status)


class OfferssDelView(APIView):
    permission_classes = (IsGiver,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

    def delete(self, request, *args, **kwargs):
        print("FILTER " + self.kwargs['pk'])
    
    # Filter the offers associated with the course
        offers = Offers.objects.filter(course=self.kwargs['pk'])
    
        if offers.exists():
        # If offers exist, delete them
            offers.delete()
        # Return 204 No Content to indicate successful deletion
            status_code = status.HTTP_204_NO_CONTENT
            message = {"detail": "Offers successfully deleted."}
        else:
        # If no offers exist, return 404 Not Found
            status_code = status.HTTP_200
            message = {"detail": "No offers found for the given course."}
    
        return Response(data=message, status=status_code)





class CourseHoursCreateView(APIView):
    permission_classes = (IsGiver,)
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
        # Post.objects.filter(pub_date__gt=datetime.now()).delete(

        courseHour_serializer = CourseHoursSerializer(data=request.data)

        if courseHour_serializer.is_valid():
            courseHour_serializer.save()
            return Response(courseHour_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', courseHour_serializer.errors)
            return Response(courseHour_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewListViewAll(APIView):

    permission_classes = (IsCub,)
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
        # print('single' + str(singleBooking[0].id))

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
    parser_classes = [JSONParser]
    def get(self, request, *args, **kwargs):
        # user = Giver.objects.filter(id=self.kwargs['pk'])
        cub_id = Cub.objects.get(user=self.kwargs['pk'])
        print(cub_id.id)
        reviewPerCourse = Review.objects.filter(cub=cub_id.id)

        serializer = ReviewSerializer(reviewPerCourse, many=True)
        return Response(serializer.data)
    def post(self, request, *args, **kwargs):
        # Get the review object based on the provided review ID in request data
        review_id = request.data.get("review_id")
        review = get_object_or_404(Review, id=review_id, cub__user=self.kwargs['pk'])

        review.titre = request.data.get("titre", review.titre)
        review.note = request.data.get("note", review.note)
        review.comment_cub = request.data.get("comment_cub", review.comment_cub)
        
        # Save the updated review
        review.save()

        # Return the updated review data
        serializer = ReviewSerializer(review)
        return Response(serializer.data, status=status.HTTP_200_OK)

class WishlistView(APIView):
    permission_classes = (permissions.AllowAny,)
   # queryset = Course.objects.all()
  #  serializer_class = CourseSerializer
    parser_classes = [JSONParser]

  #  def get(self, request, *args, **kwargs):
   #     courseHour = Course.objects.all()
    #    serializer = CourseSerializer(courses, many=True)
    #    return Response(serializer.data)

    def get(self, request, *args, **kwargs):
        cub_id = Cub.objects.get(user=self.kwargs['pk'])
        print(cub_id.id)
        wishlistPerCub = Wishlist.objects.filter(cub=cub_id.id)
        serializer = WishlistSerializer(wishlistPerCub, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = WishlistSerializer(data=request.data)

        if serializer.is_valid() and Wishlist.objects.filter(
                cub=request.data["cub"], course=request.data["course"]).all().count() == 0:
            print()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kargs):

        wishL = Wishlist.objects.get(id=self.kwargs['pk'])

        #wishLToDelete = Wishlist.objects.get(id=request.data.get("id"))
        wishL.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)



class SendPaymentRecapView(APIView):
    parser_classes = [JSONParser]
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            data = request.data
            items = data.get('items', [])
            total_amount = data.get('totalAmount')
            user_email = data.get('userEmail')
            emails_giver = data.get('emailsGiver', [])

            if user_email:
                for item in items:
                    # Render the user email template
                    html_content = render_to_string('order.html', {
                        'name': item['name'],
                        'key': item['key'],
                        'price': item['price'],
                        'seats': item['seats'],
                        'currency': item['currency'],
                        'img': item['img'],
                        'emailGiver': item['emailGiver'],
                        'adress': item['adress'],
                        'hour': item['hourSelected']['hour'],
                         'date': item['hourSelected']['date'],
                    })
                    plain_message = strip_tags(html_content)

                    send_mail(
                        'Votre Récapitulatif de Paiement',
                        plain_message,
                        settings.EMAIL_HOST_USER,
                        [user_email],
                        html_message=html_content,
                        fail_silently=False,
                    )

                # Send an email to each giver with the new giver_recap.html
                for giver_email in emails_giver:
                    # Render the giver recap HTML template with provided data
                    giver_html_content = render_to_string('recap.html', {
                        'name': item['name'],
                        'key': item['key'],
                        'price': item['price'],
                        'seats': item['seats'],
                        'currency': item['currency'],
                        'img': item['img'],
                        'adress': item['adress'],
                         'hour': item['hourSelected']['hour'],
                         'date': item['hourSelected']['date'],
                    })
                    giver_plain_message = strip_tags(giver_html_content)

                    send_mail(
                        'Nouvelle Réservation - Récapitulatif',
                        giver_plain_message,
                        settings.EMAIL_HOST_USER,
                        [giver_email],
                        html_message=giver_html_content,
                        fail_silently=False,
                    )

                return Response({"message": "Emails sent successfully"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User email is required"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
