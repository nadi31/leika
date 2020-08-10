from django.urls import path

from .views import CourseDetailView, CourseListView, PicView


urlpatterns = [
    path('', CourseListView.as_view()),
    path('<pk>', CourseDetailView.as_view()),
    # path(PicView.urlImage, PicView.as_view()),
    path('upload/', CourseListView.as_view(), name='upload'),
]
