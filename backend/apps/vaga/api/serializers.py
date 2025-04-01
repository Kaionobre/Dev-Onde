from rest_framework import serializers
from apps.vaga.models import Vaga

class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = '__all__'
        extra_kwargs = {'recrutador': {'read_only': True}}  # Recrutador não pode ser enviado no JSON

    def create(self, validated_data):
        request = self.context['request']  # Pega a requisição
        recrutador = request.user.recrutador  # Obtém o recrutador vinculado ao usuário logado
        validated_data['recrutador'] = recrutador  # Define automaticamente o recrutador
        return super().create(validated_data)