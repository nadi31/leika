from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import MyUser, Giver, Adress, Cub, Administrator, Prospect
import datetime
from rest_framework.generics import ListAPIView
from rest_framework.authtoken.models import Token


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token

        fields = '__all__'
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        # Fetch the refresh token from cookies instead of request data
        request = self.context['request']
        refresh_token = request.COOKIES.get('refresh')

        if not refresh_token:
            raise InvalidToken('No valid refresh token found in cookies.')

        # Validate the refresh token
        try:
            refresh = RefreshToken(refresh_token)
            


        except TokenError:
            raise InvalidToken('Invalid refresh token or token expired.')

        user = MyUser.objects.get(user_id=refresh.payload.get('ID'))
        if refresh.payload.get('user_type') == 2:

            obj = Cub.objects.get(user=user.user_id)
            id_obj_user = obj.id
        elif user.user_type1 == 3:

            obj = Giver.objects.get(user=user.user_id)
            id_obj_user = obj.id
        elif user.user_type1 == 1:

            obj = Administrator.objects.get(user=user.user_id)
            id_obj_user = obj.id
        else:
            obj = MyUser.objects.get(user_id=user.user_id)
            id_obj_user = obj.user_id
            

        # print("OBJ" + str(obj))
        
        # print("OBJ _ IDDD" + str(obj_id))
       
        # If valid, generate a new access token
        data = {'access': str(refresh.access_token)}
        data = {
            'access': str(refresh.access_token),
            'email': refresh.payload.get('user_email'),  
            'user_type' : refresh.payload.get('user_type'),  
            'id_user' : refresh.payload.get('ID'),  
            'first_name' : refresh.payload.get('first_name'),  
            'user_type' : refresh.payload.get('user_type'),  
            'id_obj_user' : obj.user_id ,  

    
      
        }

        # If you want to include additional user data, you can add it here.
        return data

#authenticate 
#validate

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        # Add custom claims
        token['user_type'] = user.user_type1
        print("USER***", token['user_type'])
        #print("USER " + (user.id))
        print("USER_ID " + str(user.user_id))
        if user.user_type1 == 2:

            obj = Cub.objects.get(user=user.user_id)
            id_obj_user = obj.id
        elif user.user_type1 == 3:
            print("GIVER ¨**¨3")
            obj = Giver.objects.get(user=user.user_id)
            id_obj_user = obj.id
            print("GIVER "+ str(id_obj_user))
        elif user.user_type1 == 1:

            obj = Administrator.objects.get(user=user.user_id)
            id_obj_user = obj.id
        else:
            obj = MyUser.objects.get(user_id=user.user_id)
            id_obj_user = obj.user_id
            

        # print("OBJ" + str(obj))
        
        # print("OBJ _ IDDD" + str(obj_id))
        token["id_obj_user"]=  id_obj_user
        print("********>>>>>>  "+str (id_obj_user))
        # print("OBJ _ IDDD" + str(obj_id))

        token['ID'] = user.user_id
        token['first_name'] = user.first_name
        token['email'] = user.email
        return token


#validate function triggered whenever there is data ENTERING the db used 
#to check whether the data is valid before processed further 

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["refresh"] = str(refresh) # need to ckeck:  refresh.refresh_token
        data["access"] = str(refresh.access_token)
        data["email"] = self.user.email
        data["user_type"] = self.user.user_type1
        data['id_user'] = self.user.user_id
        data["first_name"] = self.user.first_name
        
        if self.user.user_type1 == 2:

            obj = Cub.objects.get(user=self.user.user_id)
            id_obj_user = obj.id
        elif self.user.user_type1 == 3:

            obj = Giver.objects.get(user=self.user.user_id)
            id_obj_user = obj.id
        elif self.user.user_type1 == 1:

            obj = Administrator.objects.get(user=self.user.user_id)
            id_obj_user = obj.id
        else:
            obj = MyUser.objects.get(user_id=self.user.user_id)
            id_obj_user = obj.user_id
            

        # print("OBJ" + str(obj))
        
        # print("OBJ _ IDDD" + str(obj_id))
        data["id_obj_user"]=  id_obj_user


        return data


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


class ProspectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prospect
        fields = '__all__'


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
