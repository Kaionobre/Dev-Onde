from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.vaga.models import Vaga
from apps.vaga.api.permissions import IsRecrutador, IsOwnerOrReadOnly
from apps.vaga.api.serializers import VagaSerializer

class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer
    permission_classes = [IsAuthenticated, IsRecrutador, IsOwnerOrReadOnly]  # Apenas usuários autenticados podem acessar

    def perform_create(self, serializer):
        # Associa a vaga ao recrutador do usuário logado
        serializer.save(recrutador=self.request.user.recrutador)
