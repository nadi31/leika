from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import *
urlpatterns = [
    #  path('token/obtain/', jwt_views.TokenObtainPairView.as_view(),
    #       name='token_create'),  # override sjwt stock token
    #  path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('giver/<pk>', GiverDetailView.as_view()),
    path('adress/<pk>', AdressDetailView.as_view()),
    path('cub/<pk>', CubView.as_view()),
    path('cub/phone/<pk>', CubPhoneView.as_view()),
    path('cub/mdp/<pk>', CubUpdateMdpView.as_view()),
    path('cub/', CubList.as_view()),
    path('create/giver', GiverCreateView.as_view()),
    path('create/adress', AdressCreateView.as_view()),
    path('create/token/<email>', TokenCreateView.as_view()),
    path('token/<token>', TokenView.as_view()),
    path('token', TokenView.as_view()),
    path('mdp/<pk>', UserMdpOublieView.as_view()),
    path('mdp', UserMdpOublieView.as_view()),
    path('user', UserOublieView.as_view()),
    #path('myUsers', MyUser.as_view()),

]
