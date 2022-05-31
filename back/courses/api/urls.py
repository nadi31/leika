from django.urls import path

from .views import *

#router = routers.DefaultRouter()
#router.register('create/', CourseCreateView, 'create')
urlpatterns = [
    path('create/course/api/', CourseCreateView.as_view()),
    path('', CourseListView.as_view()),
    #  path('upload/', CourseListView.as_view(), name='upload'),
    path('<pk>', CourseDetailView.as_view()),
    path('update/<pk>', CourseUpdateView.as_view()),
    # path(PicView.urlImage, PicView.as_view()),
    path('create/hours/', CourseHoursCreateView.as_view()),
    path('hours/<pk>', CustomHours.as_view()),
    path('giver/cours/<pk>', CourseListGiverView.as_view()),
    path('list/cours/<pk>', CourseListGiverCubView.as_view()),
    path('giver/', researchCourse.as_view()),
    path('search/', researchCourseList.as_view(), name='search_results'),
    path('bookings/', BookingView.as_view(),),
    path('singleBookings/', SingleBookingView.as_view(),),
    path('cubSingleBookings/<pk>', SingleBookingCubView.as_view(),),
    path('cubBookings/<pk>', BookingCubView.as_view(),),
    path('review/', ReviewListViewAll.as_view(),),
    path('review/cub/<pk>', ReviewListViewCub.as_view(),),
    path('review/giver/<pk>', ReviewListViewGiver.as_view(),),
    path('review/course/<pk>', ReviewListViewCourse.as_view(),),

]
#urlpatterns += router.urls
