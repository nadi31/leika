from django.urls import path

from .views import ProspectCreateView
#from rest_framework import routers

#router = routers.DefaultRouter()
#router.register('create/', CourseCreateView, 'create')
urlpatterns = [path('prospects/', ProspectCreateView.as_view()),
               ]
#urlpatterns += router.urls
