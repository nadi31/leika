from rest_framework import serializers
from courses.models import Course, CourseHour, Booking, Wishlist, SingleBooking, Review, Offers
from authentification.models import Giver, Adress, MyUser, Cub


class CourseSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)

    class Meta:
        model = Course

        fields = '__all__'


class ResearchCourseSerializer(serializers.ModelSerializer):
    lat = serializers.FloatField()
    lng = serializers.FloatField()
    city = serializers.CharField()
    country = serializers.CharField()
    adress = serializers.CharField()

    class Meta:
        model = Course
        fields = ["id", "title", "accroche", "aSavoir", "content", "annulation",
                  "date", "hour", "isVerified", "price", "img1", "img2", "img2", "isDiscounted", "discount", "isRemote", "points", "seats", "needCertificate", "dateFin", "hourFin", "thumbnail1", "thumbnail2", "thumbnail3", "isIntermediate", "isBeginner", "isAdvanced", "valOffers", "teamBuildingActivity", "duoActivity", "terroirActivity", "language", "city", "country", "adress", "lat", "lng", "accessible", "age"]

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
                           "hourFin", "isIntermediate", "isBeginner", "isAdvanced", "category", "sub_category", "age", "value", "date_fin", "courseHourIsCreated", "adress", "lat", "lng", "accessible"]


class CourseHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseHour
        fields = '__all__'


class OffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offers
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
