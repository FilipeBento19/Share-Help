from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
import random

# ================================
# USUÁRIO E AUTENTICAÇÃO
# ================================
class Usuario(AbstractUser):
    nome = models.CharField(max_length=100, blank=True, null=True)
    email_verificado = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class CodigoVerificacao(models.Model):
    email = models.EmailField(unique=True)
    codigo = models.CharField(max_length=6)
    criado_em = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.codigo:
            self.codigo = str(random.randint(100000, 999999))
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} - {self.codigo}"

# ================================
# TIPOS DE DOAÇÃO
# ================================
class TipoDoacao(models.Model):
    nome_tipo = models.CharField(max_length=50, unique=True)
    descricao = models.TextField(null=True, blank=True)
    icone = models.CharField(max_length=100, null=True, blank=True, help_text="Nome do ícone ou classe CSS")
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return self.nome_tipo

    class Meta:
        verbose_name = "Tipo de Doação"
        verbose_name_plural = "Tipos de Doação"

# ================================
# LOCALIZAÇÃO
# ================================
class Endereco(models.Model):
    logradouro = models.CharField(max_length=255)
    numero = models.CharField(max_length=20, null=True, blank=True)
    complemento = models.CharField(max_length=100, null=True, blank=True)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=50)
    cep = models.CharField(max_length=10)
    latitude = models.DecimalField(max_digits=10, decimal_places=8)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)
    
    def __str__(self):
        numero_str = f", {self.numero}" if self.numero else ""
        return f"{self.logradouro}{numero_str}, {self.bairro} - {self.cidade}/{self.estado}"

    class Meta:
        verbose_name = "Endereço"
        verbose_name_plural = "Endereços"

# ================================
# INSTITUIÇÕES (baseado no ongsData)
# ================================
class Instituicao(models.Model):
    # Categorias baseadas no ongsData
    CATEGORIA_CHOICES = [
        ('criancas', 'Crianças'),
        ('idosos', 'Idosos'),
        ('moradores-de-rua', 'Moradores de Rua'),
        ('animais', 'Animais'),
        ('meio-ambiente', 'Meio Ambiente'),
        ('saude', 'Saúde'),
        ('educacao', 'Educação'),
        ('geral', 'Geral'),
    ]
    
    STATUS_CHOICES = [
        ('ativa', 'Ativa'),
        ('inativa', 'Inativa'),
        ('pendente', 'Pendente Aprovação'),
    ]
    
    # Campos principais (baseados no ongsData)
    identificador = models.CharField(max_length=100, unique=True)
    nome = models.CharField(max_length=200)
    descricao_curta = models.TextField(help_text="Descrição resumida da instituição")
    descricao = models.TextField(help_text="Descrição detalhada da instituição")  
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    
    # Contato e localização
    telefone = models.CharField(max_length=20, null=True, blank=True)
    endereco_completo = models.TextField(help_text="Endereço completo como string")
    horario_funcionamento = models.CharField(max_length=100, null=True, blank=True)
    
    # Coordenadas geográficas
    latitude = models.DecimalField(max_digits=10, decimal_places=7)
    longitude = models.DecimalField(max_digits=10, decimal_places=7)
    
    # Mídia
    logo = models.CharField(max_length=255, help_text="Caminho para o logo da instituição")
    
    # Progresso e status
    progresso = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Progresso em percentual (0-100)"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ativa')
    
    # Relacionamentos
    tipos_doacao_aceitos = models.ManyToManyField(
        TipoDoacao, 
        blank=True,
        help_text="Tipos de doação aceitos (filtros)"
    )
    endereco_detalhado = models.ForeignKey(
        Endereco, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        help_text="Endereço estruturado (opcional)"
    )
    
    # Metadados
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.nome
    
    @property
    def coordenadas(self):
        """Retorna coordenadas como array [lat, lng]"""
        return [float(self.latitude), float(self.longitude)]
    
    @property
    def filtros(self):
        """Retorna lista de filtros (tipos de doação aceitos)"""
        return list(self.tipos_doacao_aceitos.values_list('nome_tipo', flat=True))
    
    @property
    def endereco_resumo(self):
        """Retorna resumo do endereço (cidade/estado)"""
        if self.endereco_detalhado:
            return f"{self.endereco_detalhado.cidade}/{self.endereco_detalhado.estado}"
        
        # Extrai cidade/estado do endereço completo (fallback)
        try:
            parts = self.endereco_completo.split(' - ')
            if len(parts) >= 2:
                cidade_estado = parts[-1]
                if '/' in cidade_estado:
                    return cidade_estado.split(',')[0].strip()
        except:
            pass
        return "Não informado"

    class Meta:
        verbose_name = "Instituição"
        verbose_name_plural = "Instituições"
        ordering = ['nome']

# ================================
# FAVORITOS E DOAÇÕES
# ================================
class Favorito(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE)
    data_favoritado = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['usuario', 'instituicao'],
                name='unique_favorito_usuario_instituicao'
            )
        ]
        verbose_name = "Favorito"
        verbose_name_plural = "Favoritos"

    def __str__(self):
        return f"{self.usuario.username} → {self.instituicao.nome}"

class Doacao(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('confirmada', 'Confirmada'),
        ('entregue', 'Entregue'),
        ('cancelada', 'Cancelada')
    ]
    
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE)
    tipo_doacao = models.ForeignKey(TipoDoacao, on_delete=models.RESTRICT)
    
    quantidade = models.CharField(max_length=50, null=True, blank=True)
    descricao = models.TextField(null=True, blank=True)
    valor_estimado = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        help_text="Valor estimado da doação em reais"
    )
    
    data_doacao = models.DateField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pendente')
    
    # Metadados
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Doação #{self.id} - {self.usuario.username} → {self.instituicao.nome}"

    class Meta:
        verbose_name = "Doação"
        verbose_name_plural = "Doações"
        ordering = ['-data_criacao']