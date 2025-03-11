from django.db import models
from apps.autenticacao.models import CustomUser

# Create your models here.

class Desenvolvedor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True, blank=True)
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    tecnologias = models.TextField(blank=True, null=True)
    experiencias = models.TextField(blank=True, null=True)
    portfolio = models.URLField(blank=True, null=True)
    localizacao = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username
    
