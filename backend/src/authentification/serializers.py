from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import MyUser, Giver, Adress
import datetime
from rest_framework.generics import ListAPIView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['user_type'] = user.user_type1
        obj = Giver.objects.get(user=user.user_id)
        # print("OBJ" + str(obj))
        obj_id = obj.id
        # print("OBJ _ IDDD" + str(obj_id))
        token['ID_user'] = obj_id
        token['ID'] = user.user_id

        return token


class MyUserSerializer(serializers.ModelSerializer):

    class Meta:

        model = MyUser
        fields = '__all__'
# create a serializer


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)
    # first_name = serializers.CharField()
   # last_name = serializers.CharField()
   # date_joined = serializers.DateField(initial=datetime.date.today)
    user_type1 = serializers.IntegerField(
        required=False)

    class Meta:

        model = MyUser
        fields = ('email', 'username', 'password',
                  'user_type1'
                  # ,
                  # 'fist_name', 'last_name', 'date_joined'
                  )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class GiverSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)

    #img1 = serializers.ImageField()

    class Meta:
        model = Giver
        fields = '__all__'

    # def save(self, instance, validated_data, val):
        ##img1 = validated_data.FILES
        # Unless the application properly enforces that this field is
        # always set, the following could raise a `DoesNotExist`, which
        # would need to be handled.

        #instance.img1 = val.get('img1', instance.img1)
        # instance.description = validated_data.get(
        #    'description', instance.description)
        #instance.phone = validated_data.get('email', instance.phone)
       # instance.Adress = validated_data.get('Adress', instance.Adress)
        #instance.appelation = validated_data.get('Adress', instance.appelation)
        #instance.siret = validated_data.get('Adress', instance.siret)
        # instance.save()

        # return Response(json, status=status.HTTP_201_CREATED)


class AdressSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)

    class Meta:
        model = Adress
        fields = '__all__'
