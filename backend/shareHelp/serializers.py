from rest_framework.serializers import ModelSerializer, ValidationError, SerializerMethodField
from rest_framework import serializers
from django.db.models import Q
from .models import Usuario, TipoDoacao, Instituicao, Endereco, Favorito, Doacao, CodigoVerificacao

# ================================
# AUTENTICAÇÃO
# ================================
class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerificarCodigoSerializer(serializers.Serializer):
    email = serializers.EmailField()
    codigo = serializers.CharField(max_length=6)

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nome", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        from django.contrib.auth.hashers import make_password
        validated_data["password"] = make_password(validated_data["password"])
        validated_data["email_verificado"] = True
        return super().create(validated_data)

# ================================
# CORE MODELS
# ================================
class TipoDoacaoSerializer(ModelSerializer):
    class Meta:
        model = TipoDoacao
        fields = '__all__'

class EnderecoSerializer(ModelSerializer):
    endereco_completo = SerializerMethodField()
    
    class Meta:
        model = Endereco
        fields = '__all__'
    
    def get_endereco_completo(self, obj):
        numero = f", {obj.numero}" if obj.numero else ""
        return f"{obj.logradouro}{numero}, {obj.bairro} - {obj.cidade}/{obj.estado}"

# ================================
# INSTITUIÇÕES (Serializers principais)
# ================================
class InstituicaoSerializer(ModelSerializer):
    # Campos relacionados
    endereco_detalhado = EnderecoSerializer(read_only=True)
    tipos_doacao_aceitos = TipoDoacaoSerializer(many=True, read_only=True)
    
    # Campos serializados baseados no ongsData
    coordenadas = SerializerMethodField()
    filtros = SerializerMethodField()
    endereco_resumo = SerializerMethodField()
    categoria_display = SerializerMethodField()
    status_display = SerializerMethodField()
    
    # Campos de escrita
    tipos_doacao_aceitos_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=TipoDoacao.objects.all(),
        write_only=True,
        required=False,
        source='tipos_doacao_aceitos'
    )
    
    class Meta:
        model = Instituicao
        fields = [
            # Campos base
            'id', 'identificador', 'nome', 'descricao', 'descricao_curta','categoria', 
            'telefone', 'endereco_completo', 'horario_funcionamento',
            'latitude', 'longitude', 'logo', 'progresso', 'status',
            'data_criacao', 'data_atualizacao',
            
            # Relacionamentos
            'endereco_detalhado', 'tipos_doacao_aceitos', 'tipos_doacao_aceitos_ids',
            
            # Campos serializados (compatíveis com ongsData)
            'coordenadas', 'filtros', 'endereco_resumo', 
            'categoria_display', 'status_display'
        ]
        read_only_fields = ['data_criacao', 'data_atualizacao']
    
    def get_coordenadas(self, obj):
        """Retorna [lat, lng] compatível com ongsData"""
        return [float(obj.latitude), float(obj.longitude)]
    
    def get_filtros(self, obj):
        """Retorna lista de tipos de doação aceitos"""
        return [tipo.nome_tipo.lower() for tipo in obj.tipos_doacao_aceitos.all()]
    
    def get_endereco_resumo(self, obj):
        """Retorna resumo do endereço"""
        return obj.endereco_resumo
    
    def get_categoria_display(self, obj):
        return obj.get_categoria_display()
    
    def get_status_display(self, obj):
        return obj.get_status_display()

class InstituicaoResumoSerializer(ModelSerializer):
    """Serializer resumido para listas e mapas"""
    coordenadas = SerializerMethodField()
    filtros = SerializerMethodField()
    endereco_resumo = SerializerMethodField()
    categoria_display = SerializerMethodField()
    
    class Meta:
        model = Instituicao
        fields = [
            'id', 'identificador', 'nome', 'descricao', 'descricao_curta', 'categoria', 'telefone', 'endereco_completo',
            'horario_funcionamento', 'logo', 'progresso', 'status',
            'coordenadas', 'filtros', 'endereco_resumo', 'categoria_display'
        ]
    
    def get_coordenadas(self, obj):
        return [float(obj.latitude), float(obj.longitude)]
    
    def get_filtros(self, obj):
        return [tipo.nome_tipo.lower() for tipo in obj.tipos_doacao_aceitos.all()]
    
    def get_endereco_resumo(self, obj):
        return obj.endereco_resumo
    
    def get_categoria_display(self, obj):
        return obj.get_categoria_display()

class InstituicaoMapaSerializer(ModelSerializer):
    """Serializer específico para dados do mapa"""
    coordenadas = SerializerMethodField()
    categoria_display = SerializerMethodField()
    filtros = SerializerMethodField()
    
    class Meta:
        model = Instituicao
        fields = [
            'id', 'identificador', 'nome', 'descricao', 'categoria', 'telefone',
            'endereco_completo', 'logo', 'coordenadas', 
            'categoria_display', 'filtros'
        ]
    
    def get_coordenadas(self, obj):
        return [float(obj.latitude), float(obj.longitude)]
    
    def get_categoria_display(self, obj):
        return obj.get_categoria_display()
    
    def get_filtros(self, obj):
        return [tipo.nome_tipo.lower() for tipo in obj.tipos_doacao_aceitos.all()]

# ================================
# FAVORITOS E DOAÇÕES
# ================================
class FavoritoSerializer(ModelSerializer):
    instituicao_detalhes = InstituicaoResumoSerializer(source='instituicao', read_only=True)
    instituicao_nome = SerializerMethodField()
    
    class Meta:
        model = Favorito
        fields = ['id', 'usuario', 'instituicao', 'data_favoritado', 
                'instituicao_nome', 'instituicao_detalhes']
        read_only_fields = ['data_favoritado']
    
    def get_instituicao_nome(self, obj):
        return obj.instituicao.nome

class DoacaoSerializer(ModelSerializer):
    instituicao_detalhes = InstituicaoResumoSerializer(source='instituicao', read_only=True)
    tipo_doacao_detalhes = TipoDoacaoSerializer(source='tipo_doacao', read_only=True)
    
    # Campos de exibição
    instituicao_nome = SerializerMethodField()
    tipo_doacao_nome = SerializerMethodField()
    usuario_nome = SerializerMethodField()
    status_display = SerializerMethodField()
    
    class Meta:
        model = Doacao
        fields = '__all__'
        read_only_fields = ['data_criacao', 'data_atualizacao']
    
    def get_instituicao_nome(self, obj):
        return obj.instituicao.nome
    
    def get_tipo_doacao_nome(self, obj):
        return obj.tipo_doacao.nome_tipo
    
    def get_usuario_nome(self, obj):
        return obj.usuario.nome or obj.usuario.username
    
    def get_status_display(self, obj):
        return obj.get_status_display()