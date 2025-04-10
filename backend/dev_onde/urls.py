from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.empresa.urls')), 
    path('api/', include('apps.vaga.api.router')),  # Agora importando o router do app vagas
    path('api/auth/', include('apps.autenticacao.urls')),  # Incluindo as rotas de autenticação via router
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 

]