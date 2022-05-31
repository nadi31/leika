from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import serializers
from .models import MyUser, Giver, Adress, Cub
import datetime
from rest_framework.generics import ListAPIView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        token['user_type'] = user.user_type1
        if token['user_type'] == 2:

            obj = Cub.objects.get(user=user.user_id)
        if token['user_type'] == 3:

            obj = Giver.objects.get(user=user.user_id)
        if token['user_type'] == 1:

            obj = Administrator.objects.get(user=user.user_id)
        # print("OBJ" + str(obj))
        obj_id = obj.id
        # print("OBJ _ IDDD" + str(obj_id))
        token['ID_user'] = obj_id
        token['ID'] = user.user_id
        token['first_name'] = user.first_name
        return token


class MyUserSerializer(serializers.ModelSerializer):

    class Meta:

        model = MyUser
        fields = '__all__'


class MyUserCubSerializer(serializers.ModelSerializer):

    class Meta:

        model = MyUser
        #fields = ('email', 'first_name', 'last_name', 'date_joined')
        exclude = ('password', 'username', 'user_id', 'last_login', 'is_superuser',
                   'is_staff', 'is_active', 'user_type1', 'groups', 'user_permissions', )


class CubSerializer(serializers.ModelSerializer):
    class Meta:

        model = Cub
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
   #phone = serializers.CharField()
   # date_joined = serializers.DateField(initial=datetime.date.today)
    user_type1 = serializers.IntegerField(
        required=False)
    #csrfmiddlewaretoken= serializers.CharField()

    class Meta:

        model = MyUser
        fields = ('email', 'username', 'password',
                  'user_type1', 'first_name', 'last_name',
                  'user_id',

                  )
        kwargs_fields = ()

    def create(self, validated_data):

        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)

            instance.save(password)

        return instance

    def update(self, instance, validated_data):
        """Update a user setting the password correctly"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        return user


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


class CubUpdateSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)

    class Meta:
        model = MyUser

        optional_fields = ["email", "first_name", "last_name", ]
        exclude = ('password', 'username', 'user_id', 'last_login', 'is_superuser',
                   'is_staff', 'is_active', 'user_type1', 'groups', 'user_permissions', )


class CubUpdateMdpSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)
    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = MyUser

        #optional_fields = ["email", 'user_id']
        exclude = ("first_name", "last_name", 'username', 'last_login', 'is_superuser',
                   'is_staff', 'is_active', 'user_type1', 'groups', 'user_permissions', )
        #fields = '__all__'

    def update(self, user, validated_data):
        """Update a user setting the password correctly"""
        print("UPUPUPUPUPUPUPUPUPUP")
        username = validated_data.pop('username', None)
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        instance.first_name = user.first_name
        instance.last_name = user.last_name
        instance.username = user.username
        instance.user_id = user.user_id
        instance.user_type1 = user.user_type1
        instance.email = user.email
        instance.date_joined= user.date_joined
        #instance.groups = user.groups
        #instance.user_permissions = user.user_permissions
        cub= Cub.objects.get(user__username=username)
        phone= cub.phone
        
        print("CUB_PHONE"+ str(phone))
        if password is not None:
            instance.set_password(password)
            Cub.objects.filter(user__username=username).delete()
            MyUser.objects.filter(username=username).delete()
            instance.save()
            Cub.objects.filter(user__username=username).update(phone= phone)

        return instance


           # instance.set_password(password)
            #Myser.objects.filter(username=username).delete()
            #instance.save()

        return instance









class CubPhoneUpdateSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)

    class Meta:
        model = Cub

        optional_fields = ["phone"]
