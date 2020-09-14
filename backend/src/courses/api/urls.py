from django.urls import path

from .views import CourseDetailView, CourseListView, CourseCreateView
#from rest_framework import routers

#router = routers.DefaultRouter()
#router.register('create/', CourseCreateView, 'create')
urlpatterns = [
    path('create/', CourseCreateView.as_view()),
    path('', CourseListView.as_view()),
    #  path('upload/', CourseListView.as_view(), name='upload'),

    path('<pk>', CourseDetailView.as_view()),
    # path(PicView.urlImage, PicView.as_view()),

]
#urlpatterns += router.urls
