from django.db import models
from apps.empresa.models import Empresa
from apps.recrutador.models import Recrutador

class Vaga(models.Model):
    TIPO_CONTRATO_CHOICES = [
        ('CLT', 'CLT'),
        ('PJ', 'Pessoa Jurídica'),
        ('Freelancer', 'Freelancer'),
        ('Estágio', 'Estágio'),
        ('Outro', 'Outro'),
    ]

    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    salario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    tipo_contrato = models.CharField(max_length=20, choices=TIPO_CONTRATO_CHOICES)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)
    recrutador = models.ForeignKey(Recrutador, on_delete=models.CASCADE)
    vaga_ativa = models.BooleanField(default=True, verbose_name="Ativa")
    url_form = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.titulo} - {self.empresa.nome}"
