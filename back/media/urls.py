from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithColorView, CustomUserCreate, GiverDetailView, AdressDetailView, MyUser
urlpatterns = [
    #  path('token/obtain/', jwt_views.TokenObtainPairView.as_view(),
    #       name='token_create'),  # override sjwt stock token
    #  path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('giver/<pk>', GiverDetailView.as_view()),
    path('adress/<pk>', AdressDetailView.as_view()),
    path('myUsers', MyUser.as_view()),
 


]
