from django.db import models

# Create your models here.

class Desenvolvedor(models.Model):
    nome = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    tecnologias = models.TextField()
    experiencias = models.TextField()
    portfolio = models.URLField(blank=True, null=True)
    localizacao = models.CharField(max_length=255)

    def __str__(self):
        return self.nome
    
