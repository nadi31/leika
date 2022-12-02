from rest_framework import permissions


class GiverAdminOrReadOnlyCourses(permissions.BasePermission):
    """ Pour les cours, les cubs ont le droit de voir, mais pas de modifier ou créer
        Les givers, ont le droit de créer de modifier mais leur cours uniquement
        Les admins ont tous les droits
    """

    def has_permission(self, request, view):
        """     Si la méthode est une méthode GET, OPTIONS, HEAD
                toujours autorisée
        """
        if request.method in permissions.SAFE_METHODS or request.user.is_authenticated:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        """     Si l'utilisateur est un giver => ne modifie que ces cours 
                Si l'utilisateur est un admin ou super user => modifie tout
        """

        if request.user.user_type1 == 3 and obj.owner == request.user:
            return True
        if request.user.user_type1 == 1 or request.user.is_superuser:
            print("SUPER")
            return True

        return False
