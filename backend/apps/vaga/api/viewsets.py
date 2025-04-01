from rest_framework import viewsets
from apps.vaga.models import Vaga
from apps.vaga.api.serializers import VagaSerializer

class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer
