from django.contrib import admin
from .models import Course, CourseHour, Booking, Wishlist, SingleBooking, Review, Offers

admin.site.register(Course)
admin.site.register(CourseHour)
admin.site.register(Booking)
admin.site.register(SingleBooking)
admin.site.register(Wishlist)
admin.site.register(Review)
admin.site.register(Offers)
# admin.site.register(ShoppingCart)
