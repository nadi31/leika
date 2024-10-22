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
    path('update/verify/admin/<pk>', CourseUpdateAdminVerifyView.as_view()),
    path('create/hours/', CourseHoursCreateView.as_view()),
    path('create/offers/', OfferssCreateView.as_view()),
    path('del/offers/<pk>', OfferssDelView.as_view()),
    path('create/offers/<pk>', OfferssCreateView.as_view()),
    path('hours/<pk>', CustomHours.as_view()),
    path('giver/cours/<pk>', CourseListGiverView.as_view()),
    path('list/cours/<pk>', CourseListGiverCubView.as_view()),
    path('giver/', researchCourse.as_view()),
    path('search/', researchCourseList.as_view(), name='search_results'),
    path('bookings/', BookingView.as_view(),),
    path('bookings/giver/<pk>', BookingGiver.as_view(),),
    path('singleBookings/', SingleBookingView.as_view(),),
    path('cubSingleBookings/<pk>', SingleBookingCubView.as_view(),),
    path('cubBookings/<pk>', BookingCubView.as_view(),),
    path('review/', ReviewListViewAll.as_view(),),
    path('review/cub/<pk>', ReviewListViewCub.as_view(),),
    path('review/giver/<pk>', ReviewListViewGiver.as_view(),),
    path('review/course/<pk>', ReviewListViewCourse.as_view(),),
    path('giver/course/<pk>', CourseGiverView.as_view(),),
    path('giver/online/course/<pk>', CourseGiveOnlineView.as_view(),),
    path('admin/course/verify/', CourseAdminOnlineView.as_view(),),
    path('wishlist/<pk>', WishlistView.as_view(),),
     


]
#urlpatterns += router.urls
