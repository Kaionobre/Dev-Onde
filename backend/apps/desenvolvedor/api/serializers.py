from rest_framework import serializers
from apps.desenvolvedor.models import Desenvolvedor

class DesenvolvedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desenvolvedor
        fields = '__all__'  
