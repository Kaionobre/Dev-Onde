from rest_framework import serializers
from apps.autenticacao.models import CustomUser
from apps.desenvolvedor.models import Desenvolvedor
from apps.recrutador.models import Recrutador

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'tipo_usuario', 'password')  
        extra_kwargs = {'password': {'write_only': True}}

    def validate_tipo_usuario(self, value):
        tipos_permitidos = ['desenvolvedor', 'recrutador']
        if value not in tipos_permitidos:
            raise serializers.ValidationError("Tipo de usuário inválido.")
        return value

    def create(self, validated_data):

        if CustomUser.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError({'username': 'Esse username já está em uso.'})
        if CustomUser.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'email': 'Esse email já está em uso.'})

        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            tipo_usuario=validated_data['tipo_usuario']
        )
        user.set_password(validated_data['password'])
        user.is_superuser = False
        user.is_staff = False
        user.save()

        if user.tipo_usuario == 'desenvolvedor':
            Desenvolvedor.objects.create(user=user, nome=user.username, email=user.email)
        elif user.tipo_usuario == 'recrutador':
            Recrutador.objects.create(user=user, nome=user.username, email=user.email)

        return user
