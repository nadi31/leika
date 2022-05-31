from rest_framework import serializers
from courses.models import Course, CourseHour, Booking, Wishlist, SingleBooking, Review
from authentification.models import Giver, Adress, MyUser, Cub


class CourseSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)

    class Meta:
        model = Course

        fields = '__all__'
    #    extra_fields = ['courseHour']

  #  def get_field_names(self, declared_fields, info):
  #      expanded_fields = super(CourseSerializer, self).get_field_names(
  #          declared_fields, info)
  #      if getattr(self.Meta, 'extra_fields', None):
  #          return expanded_fields + self.Meta.extra_fields
  #      else:
    #        return expanded_fields


class strToJson(serializers.CharField):

    def to_representation(self, value):
        x = JSON.loads(value)
        return x


class researchSerializer(serializers.ModelSerializer):
    #category = serializers.CharField(read_only=True, source="html.category")
    # sub_category = serializers.CharField(
   #     read_only=True, source="html.sub_category")
   # isRemote = serializers.BooleanField(read_only=True, source="html.isRemote")
  #  json = strToJson()
    # json=serializers.JSONField(binary=True)

    class Meta:
        model = Course
        fields = ["title", "content", "date", "hour", "isVerified", "price", "isDiscounted", "discount", "isRemote", "seats", "dateFin",
                           "hourFin", "isIntermediate", "isBeginner", "isAdvanced", "category", "sub_category", "age", "value", "date_fin", "courseHourIsCreated"]


class CourseUpdateSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ("title",)
        optional_fields = ["content", "date", "hour", "isVerified", "price", "isDiscounted", "discount", "isRemote", "seats", "dateFin",
                           "hourFin", "isIntermediate", "isBeginner", "isAdvanced", "category", "sub_category", "age", "value", "date_fin", "courseHourIsCreated"]


class CourseHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseHour
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = '__all__'


class SingleBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SingleBooking
        fields = '__all__'


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = '__all__'


class CourseCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseHour, Adress, Giver, Course
        fields = '__all__'
