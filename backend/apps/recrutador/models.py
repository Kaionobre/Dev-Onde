from django.db import models
from apps.empresa.models import Empresa
from apps.autenticacao.models import CustomUser

# Create your models here.

class Recrutador(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)
    cargo = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.user.username