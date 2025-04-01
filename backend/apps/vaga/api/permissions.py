from rest_framework import permissions

class IsRecrutador(permissions.BasePermission):
    """
    Permite apenas recrutadores criar vagas.
    """

    def has_permission(self, request, view):
        return hasattr(request.user, 'recrutador')  # Verifica se o usuário tem um recrutador


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permite edição apenas para o recrutador que criou a vaga.
    """

    def has_object_permission(self, request, view, obj):
        # Permite leitura para todos
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Apenas o recrutador que criou a vaga pode editar ou deletar
        return obj.recrutador == request.user.recrutador
