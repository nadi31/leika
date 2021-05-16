# from django.contrib.courses.models import course
from rest_framework import filters
from courses.models import Course
from django.db import models as django_models
import django_filters
from django_filters import rest_framework as filters
# class CourseFilter(django_filters.FilterSet):
#    age = django_filters.CharFilter(name= 'age', lookup_expr='icontains')
#    intermediate = django_filters.CharFilter(name= 'isIntermediate',lookup_expr='icontains')


class DynamicSearchFilter(filters.FilterSet):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])
   # def get_search_fields(self, view, request):

   #     return request.GET.getlist('search_fields', ['date_gte', ])
    price__gte = django_filters.NumberFilter(
        field_name="price", lookup_expr='gte')
    price__lt = django_filters.NumberFilter(
        field_name='price', lookup_expr='lt')
    seats__gte = django_filters.NumberFilter(
        field_name='seats', lookup_expr='gte')
    category_bis = django_filters.CharFilter(
        field_name='category', lookup_expr='icontains')
    sub_category_bis = django_filters.CharFilter(
        field_name='sub_category', lookup_expr='icontains')
    age_bis = django_filters.CharFilter(
        field_name='age', lookup_expr='icontains')
    city_bis = django_filters.CharFilter(
        field_name='owner__adress__city', lookup_expr='icontains')

    class Meta:
        model = Course
        fields = ['age_bis', 'isIntermediate', 'isAdvanced', 'isBeginner', 'category_bis',
                  'sub_category_bis', 'price', 'seats', 'isRemote', 'date', 'city_bis', 'isVerified', 'price__gte', 'price__lt', 'seats__gte']
    # fields = ['event_type', 'event_model', 'timestamp', 'timestamp_gte']

    # is_Remote = django_filters.BooleanFilter(
