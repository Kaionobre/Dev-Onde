from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
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

    @action(detail=False, methods=['GET'])
    def minhas_vagas(self, request):
        vagas = Vaga.objects.filter(recrutador=request.user.recrutador)
        serializer = VagaSerializer(vagas, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['PATCH'])
    def toggle_status(self, request, pk=None):
        vaga = self.get_object()
        if vaga.recrutador != request.user.recrutador:
            return Response(
                {"detail": "Não autorizado"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        vaga.vaga_ativa = not vaga.vaga_ativa
        vaga.save()
        return Response({"status": "success", "vaga_ativa": vaga.vaga_ativa})