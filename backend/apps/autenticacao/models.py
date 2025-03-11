from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    TIPO_USUARIO = (
        ('recrutador', 'Recrutador'),
        ('desenvolvedor', 'Desenvolvedor'),
    )
    tipo_usuario = models.CharField(max_length=15, choices=TIPO_USUARIO, default="não especificado")

    def __str__(self):
        return f"{self.username} - {self.tipo_usuario}"
