from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework import serializers
from .models import MyUser, Giver, Adress, Cub, Administrator
import datetime
from rest_framework.generics import ListAPIView
from rest_framework.authtoken.models import Token


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token

        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        token['user_type'] = user.user_type1
        print("USER***", token['user_type'])
        #print("USER " + (user.id))
        print("USER_ID " + str(user.user_id))
        if token['user_type'] == 2:

            obj = Cub.objects.get(user=user.user_id)
            token['ID_user'] = obj.id
        if token['user_type'] == 3:

            obj = Giver.objects.get(user=user.user_id)
            token['ID_user'] = obj.id
        if token['user_type'] == 1:

            obj = Administrator.objects.get(user=user.user_id)
            token['ID_user'] = obj.id
        else:
            obj = MyUser.objects.get(user_id=user.user_id)

        # print("OBJ" + str(obj))
        obj_id = obj.user_id
        # print("OBJ _ IDDD" + str(obj_id))

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
        # fields = ('email', 'first_name', 'last_name', 'date_joined')
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
   # phone = serializers.CharField()
   # date_joined = serializers.DateField(initial=datetime.date.today)
    user_type1 = serializers.IntegerField(
        required=False)
    # csrfmiddlewaretoken= serializers.CharField()

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
    class Meta:
        model = Giver
        fields = '__all__'


class GiverSerializerMDP(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)
    class Meta:
        model = MyUser
        fields = ('email', 'username', 'password',


                  )

    def create(self, validated_data):

        password = validated_data.pop('password', None)
        print("***PASS WORD**")
        instance = self.Meta.model(**validated_data)
        instance.user_type1 = 3
        if password is not None:
            instance.set_password(password)

            instance.save(password)

        return instance

    def update(self, user, validated_data):
        """Update a user setting the password correctly"""
        print("UPUPUPUPUPUPUPUPUPUP")
        username = str(validated_data["username"])
        password = str(validated_data["password"])
        #instance = self.Meta.model(**validated_data)

        #instance.username = user.username
        #instance.user_id = user.user_id
        #instance.user_type1 = user.user_type1
        #instance.email = user.email
        #instance.date_joined = user.date_joined
        # instance.groups = user.groups
        # instance.user_permissions = user.user_permissions

        giver = Giver.objects.get(user__username=username)

        #phone = giver.phone

        print("CUB_PHONE" + str(phone))
        if password is not None:
            user.set_password(password)
            # Giver.objects.filter(user__username=username).delete()
            # MyUser.objects.filter(username=username).delete()
            user.save()

        return user


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

        # optional_fields = ["email", 'user_id']
        exclude = ("first_name", "last_name", 'username', 'last_login', 'is_superuser',
                   'is_staff', 'is_active', 'user_type1', 'groups', 'user_permissions', 'email', )
        # fields = '__all__'

    def update(self, user, validated_data):
        """Update a user setting the password correctly"""
        print("UPUPUPUPUPUPUPUPUPUP")
        print("USERNAME " + str(validated_data["username"]))
        print("PASS : " + str(validated_data["password"]))
        username = str(validated_data["username"])
        password = str(validated_data["password"])

        # instance.groups = user.groups
        # instance.user_permissions = user.user_permissions

        #myu = MyUser.objects.get(username=username)
        #print("MYU " + str(myu))

        #print("CUB_PHONE" + str(phone))
        if password is not None:
            user.set_password(password)
            # Giver.objects.filter(user__username=username).delete()
            # MyUser.objects.filter(username=username).delete()
            user.save()

        # instance.set_password(password)
        # Myser.objects.filter(username=username).delete()
        # instance.save()

        return user


class CubPhoneUpdateSerializer(serializers.ModelSerializer):
  #  courseHour = CourseHoursSerializer(many=True, read_only=True)

    class Meta:
        model = Cub

        optional_fields = ["phone"]
