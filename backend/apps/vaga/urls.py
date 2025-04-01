from django.urls import path, include

urlpatterns = [
    path('api/', include('vagas.api.router')),  # Agora importando o router do app vagas
]
