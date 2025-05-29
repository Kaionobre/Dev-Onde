from rest_framework import serializers
from apps.vaga.models import Vaga

class VagaSerializer(serializers.ModelSerializer):
    nome_empresa = serializers.SerializerMethodField()

    class Meta:
        model = Vaga
        fields = '__all__'
        extra_kwargs = {
            'recrutador': {'read_only': True}
        }

    def get_nome_empresa(self, obj):
        return obj.empresa.nome

    def create(self, validated_data):
        request = self.context['request']
        recrutador = request.user.recrutador
        validated_data['recrutador'] = recrutador
        return super().create(validated_data)