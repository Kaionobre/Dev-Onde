from rest_framework import serializers
from apps.recrutador.models import Recrutador

class RecrutadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recrutador
        fields = '__all__'  