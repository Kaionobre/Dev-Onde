from rest_framework.routers import DefaultRouter
from apps.vaga.api.viewsets import VagaViewSet

router = DefaultRouter()
router.register(r'vagas', VagaViewSet)

urlpatterns = router.urls
