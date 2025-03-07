from django.db import models
# Create your models here.

class Empresa(models.Model):
    nome = models.CharField(max_length=255)
    site = models.URLField(blank=True, null=True)
    setor = models.CharField(max_length=255)
    localizacao = models.CharField(max_length=255)

    def __str__(self):
        return self.nome

