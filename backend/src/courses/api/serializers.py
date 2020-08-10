from rest_framework import serializers
from courses.models import Course


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'


class PictureSerializer (serializers.ModelSerializer):
   # image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model: Course
        fields = ('img', 'imgName', 'id')

   # def get_image_url(self, obj):
   #     return obj.image.url
