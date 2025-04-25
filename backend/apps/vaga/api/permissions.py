from rest_framework import permissions

class IsRecrutador(permissions.BasePermission):
    """
    Permite apenas recrutadores criar vagas.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        return hasattr(request.user, 'recrutador')  # Verifica se o usuário tem um recrutador


class IsOwnerOrReadOnly(permissions.BasePermission):


    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        return obj.recrutador == request.user.recrutador
