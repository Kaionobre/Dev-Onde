from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.empresa.api.viewsets import EmpresaViewSet

router = DefaultRouter()
router.register(r'empresas', EmpresaViewSet)  # Cria todas as rotas do CRUD automaticamente

urlpatterns = [
    path('', include(router.urls)),  # Inclui as rotas geradas automaticamente
]
