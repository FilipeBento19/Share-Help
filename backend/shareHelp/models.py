from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    nome = models.CharField(max_length=100)  
    data_criacao = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nome} ({self.email})"


class TipoDoacao(models.Model):
    nome_tipo = models.CharField(max_length=50, unique=True)
    descricao = models.TextField(null=True, blank=True)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return self.nome_tipo

    class Meta:
        verbose_name = "Tipo de Doação"
        verbose_name_plural = "Tipos de Doação"


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


class Instituicao(models.Model):
    TIPO_CHOICES = [
        ('local', 'Presencial'),
        ('online', 'Online'),
        ('ambos', 'Presencial e Online')
    ]
    
    nome = models.CharField(max_length=150)
    descricao = models.TextField(null=True, blank=True)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    
    # Campos para instituições locais
    endereco = models.ForeignKey(
        Endereco, 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True,
        help_text="Obrigatório para instituições presenciais"
    )
    telefone = models.CharField(max_length=20, null=True, blank=True)
    
    # Campos para instituições online
    site = models.URLField(null=True, blank=True)
    email_contato = models.EmailField(null=True, blank=True)
    
    # Campos gerais
    ativo = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    
    # Relacionamento com tipos de doação aceitos
    tipos_doacao_aceitos = models.ManyToManyField(
        TipoDoacao, 
        blank=True,
        help_text="Tipos de doação que esta instituição aceita"
    )
    
    def __str__(self):
        return f"{self.nome} ({self.get_tipo_display()})"
    
    def clean(self):
        from django.core.exceptions import ValidationError
        # Validação: instituições locais devem ter endereço
        if self.tipo in ['local', 'ambos'] and not self.endereco:
            raise ValidationError('Instituições presenciais devem ter um endereço.')
        
        # Validação: instituições online devem ter site
        if self.tipo in ['online', 'ambos'] and not self.site:
            raise ValidationError('Instituições online devem ter um site.')

    class Meta:
        verbose_name = "Instituição"
        verbose_name_plural = "Instituições"
        ordering = ['nome']


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

    def __str__(self):
        return f"Favorito de {self.usuario.nome} → {self.instituicao.nome}"


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
        return f"Doação #{self.id} - {self.usuario.nome} → {self.instituicao.nome} ({self.tipo_doacao.nome_tipo})"

    class Meta:
        verbose_name = "Doação"
        verbose_name_plural = "Doações"
        ordering = ['-data_criacao']