from django.contrib import admin
from .models import Administrator, Cub,  Giver, Adress, MyUser


admin.site.register(MyUser)


admin.site.register(Administrator)
admin.site.register(Cub)
# admin.site.register(MyUser)
admin.site.register(Giver)
admin.site.register(Adress)
