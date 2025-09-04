from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shareHelp.views import (
    UsuarioViewSet, TipoDoacaoViewSet, InstituicaoViewSet, 
    EnderecoViewSet, FavoritoViewSet, DoacaoViewSet
)

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
]