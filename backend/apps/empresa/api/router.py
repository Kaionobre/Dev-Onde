from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.empresa.api.viewsets import EmpresaViewSet

router = DefaultRouter()
router.register(r'empresas', EmpresaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]