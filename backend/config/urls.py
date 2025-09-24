from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shareHelp.views import (
    UsuarioViewSet, TipoDoacaoViewSet, InstituicaoViewSet, 
    EnderecoViewSet, FavoritoViewSet, DoacaoViewSet, EnviarCodigoView, VerificarCodigoView, RegistrarUsuarioView, PerfilView, criar_doacao_anonima
)

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'tipos-doacao', TipoDoacaoViewSet)
router.register(r'instituicoes', InstituicaoViewSet) 
router.register(r'enderecos', EnderecoViewSet)      
router.register(r'favoritos', FavoritoViewSet)
router.register(r'doacoes', DoacaoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # Cadastro
    path("api/send-code/", EnviarCodigoView.as_view(), name="send_code"),
    path("api/verify-code/", VerificarCodigoView.as_view(), name="verify_code"),
    path("api/register/", RegistrarUsuarioView.as_view(), name="register"),

    # Login
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #Perfil
    path('api/perfil/', PerfilView.as_view(), name='perfil'),

    path('api/doacoes-anonimas/', criar_doacao_anonima, name='doacao-anonima'),
]