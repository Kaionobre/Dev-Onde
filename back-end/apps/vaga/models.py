from django.db import models
from apps.empresa.models import Empresa
from apps.recrutador.models import Recrutador
# Create your models here.

class Vaga(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    tecnologias_requeridas = models.TextField()
    tipo_contrato = models.CharField(max_length=255)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    recrutador = models.ForeignKey(Recrutador, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo