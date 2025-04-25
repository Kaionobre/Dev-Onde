from django.db import models

class Empresa(models.Model):
    nome = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=14, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    site = models.URLField(blank=True, null=True)
    setor = models.CharField(max_length=255)
    localizacao = models.CharField(max_length=255)

    def __str__(self):
        return self.nome