from rest_framework import serializers
from apps.vaga.models import Vaga
class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = '__all__'  
