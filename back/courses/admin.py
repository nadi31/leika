from django.contrib import admin
from .models import Course, CourseHour, Booking, Wishlist, ShoppingCart

admin.site.register(Course)
admin.site.register(CourseHour)
admin.site.register(Booking)
admin.site.register(Wishlist)
admin.site.register(ShoppingCart)
