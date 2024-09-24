
from rest_framework import permissions


class AuthorAllStaffOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        print(request.data)

        if request.user.is_authenticated:
            # si admin ou super user
            if request.user.user_type1 == 1 or request.user.is_superuser:
                print("SUPER")
                return True
                # si giver
            if request.user.user_type1 == 3:
                if request.method in permissions.SAFE_METHODS:
                    return True


class CubDefaultPermission(permissions.BasePermission):

    def has_permission(self, request, view):

        if request.user.is_authenticated or request.method in permissions.SAFE_METHODS:

            return True

    def has_object_permission(self, request, view, obj):
        print("SUPER")
        admin = False

        if user.is_authenticated:
            if user.user_type1 == '1':
                admin = True
            if user.user_type1 == '3':
                giver = Giver.objects.get(user=user.user_id)

            if user.user_type1 == '2':

                cub = Cub.objects.get(user=user.user_id)
        if user.is_superuser or admin == True:
            print("DADAADOOWN")
            return True

        if request.method in permissions.SAFE_METHODS:
            return True
        if giver:
            print("GIVERRR")
            if obj.owner == giver.id:
                return True

        return False

# cub edit


class AuthorCubOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.user_type1 == 1 or request.user.is_superuser:
                return True

    def has_object_permission(self, request, view, obj):

        cub = Cub.objects.get(user=user.user_id)
        if request.user.is_superuser:
            return True

        if cub and request.user.is_authenticated:

            return True

        return False


###############

class IsAdminOrSuperUser(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.user_type1 == 1 or request.user.is_superuser:
                return True


class IsGiver(permissions.BasePermission):

    def has_permission(self, request, view):
        print(request)
        if request.user.is_authenticated:
            if request.user.user_type1 == 3 or request.user.user_type1 == 1:
                return True


class IsCub(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.user_type1 == 2 or request.user.user_type1 == 1 or request.user.is_superuser or request.user.user_type1 == 3 or request.user.user_type1 == "1":
                return True


class IsAll(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if request.user.user_type1 == 3 or request.user.user_type1 == 1:
                return True
        if request.method in permissions.SAFE_METHODS:
            return True
