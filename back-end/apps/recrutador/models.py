from django.db import models
from apps.empresa.models import Empresa

# Create your models here.

class Recrutador(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    cargo = models.CharField(max_length=255)

    def __str__(self):
        return self.nome