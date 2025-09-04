from django.contrib import admin
from .models import Usuario
from .models import TipoDoacao
from .models import Instituicao
from .models import Endereco
from .models import Favorito
from .models import Doacao

# Register your models here.

admin.site.register(Usuario)
admin.site.register(TipoDoacao)
admin.site.register(Instituicao)
admin.site.register(Endereco)
admin.site.register(Favorito)
admin.site.register(Doacao)