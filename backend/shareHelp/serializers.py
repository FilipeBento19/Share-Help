from rest_framework.serializers import ModelSerializer, ValidationError, SerializerMethodField
from rest_framework import serializers
from .models import Usuario, TipoDoacao, Instituicao, Endereco, Favorito, Doacao
from django.contrib.auth.hashers import make_password
from .models import Usuario, CodigoVerificacao

#==========================================================
#                       Cadastro
#===========================================================
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
        validated_data["password"] = make_password(validated_data["password"])
        validated_data["email_verificado"] = True
        return super().create(validated_data)


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
        """Retorna endereço formatado"""
        numero = f", {obj.numero}" if obj.numero else ""
        return f"{obj.logradouro}{numero}, {obj.bairro} - {obj.cidade}/{obj.estado}"


class InstituicaoSerializer(ModelSerializer):
    endereco = EnderecoSerializer(read_only=True)
    endereco_id = serializers.PrimaryKeyRelatedField(
        queryset=Endereco.objects.all(), 
        write_only=True, 
        required=False,
        source='endereco'
    )
    tipos_doacao_aceitos = TipoDoacaoSerializer(many=True, read_only=True)
    tipo_display = SerializerMethodField()
    
    class Meta:
        model = Instituicao
        fields = '__all__'
    
    def get_tipo_display(self, obj):
        """Retorna o tipo em formato legível"""
        return obj.get_tipo_display()
    
    def validate(self, attrs):
        """Validação customizada baseada no tipo"""
        tipo = attrs.get('tipo')
        endereco = attrs.get('endereco')
        site = attrs.get('site')
        
        if tipo in ['local', 'ambos'] and not endereco:
            raise ValidationError({
                'endereco': 'Instituições presenciais devem ter um endereço.'
            })
        
        if tipo in ['online', 'ambos'] and not site:
            raise ValidationError({
                'site': 'Instituições online devem ter um site.'
            })
        
        return attrs


class FavoritoSerializer(ModelSerializer):
    instituicao_nome = SerializerMethodField()
    instituicao_detalhes = InstituicaoSerializer(source='instituicao', read_only=True)
    
    class Meta:
        model = Favorito
        fields = ['id', 'usuario', 'instituicao', 'data_favoritado', 'instituicao_nome', 'instituicao_detalhes']
        read_only_fields = ['data_favoritado']
    
    def get_instituicao_nome(self, obj):
        """Retorna o nome da instituição"""
        return obj.instituicao.nome
    
    def validate(self, attrs):
        """Valida se a instituição existe e está ativa"""
        instituicao = attrs.get('instituicao')
        
        if not instituicao.ativo:
            raise ValidationError({
                'instituicao': 'Esta instituição não está mais ativa.'
            })
        
        return attrs


class DoacaoSerializer(ModelSerializer):
    instituicao_nome = SerializerMethodField()
    tipo_doacao_nome = SerializerMethodField()
    usuario_nome = SerializerMethodField()
    status_display = SerializerMethodField()
    
    # Detalhes relacionados (opcional)
    instituicao_detalhes = InstituicaoSerializer(source='instituicao', read_only=True)
    tipo_doacao_detalhes = TipoDoacaoSerializer(source='tipo_doacao', read_only=True)
    
    class Meta:
        model = Doacao
        fields = '__all__'
        read_only_fields = ['data_criacao', 'data_atualizacao']
    
    def get_instituicao_nome(self, obj):
        return obj.instituicao.nome
    
    def get_tipo_doacao_nome(self, obj):
        return obj.tipo_doacao.nome_tipo
    
    def get_usuario_nome(self, obj):
        return obj.usuario.nome
    
    def get_status_display(self, obj):
        return obj.get_status_display()
    
    def validate(self, attrs):
        instituicao = attrs.get('instituicao')
        tipo_doacao = attrs.get('tipo_doacao')
        
        # Verifica se instituição está ativa
        if not instituicao.ativo:
            raise ValidationError({
                'instituicao': 'Esta instituição não está mais ativa.'
            })
        
        # Verifica se o tipo de doação está ativo
        if not tipo_doacao.ativo:
            raise ValidationError({
                'tipo_doacao': 'Este tipo de doação não está mais ativo.'
            })
        
        # Verifica se a instituição aceita este tipo de doação
        if not instituicao.tipos_doacao_aceitos.filter(id=tipo_doacao.id).exists():
            raise ValidationError({
                'tipo_doacao': f'A instituição {instituicao.nome} não aceita doações do tipo {tipo_doacao.nome_tipo}.'
            })
        
        return attrs


# Serializers específicos para diferentes necessidades
class InstituicaoResumoSerializer(ModelSerializer):
    """Serializer resumido para listas"""
    endereco_resumo = SerializerMethodField()
    
    class Meta:
        model = Instituicao
        fields = ['id', 'nome', 'tipo', 'endereco_resumo', 'site']
    
    def get_endereco_resumo(self, obj):
        if obj.endereco:
            return f"{obj.endereco.cidade}/{obj.endereco.estado}"
        return None


class DoacaoResumoSerializer(ModelSerializer):
    """Serializer resumido para histórico"""
    instituicao_nome = SerializerMethodField()
    tipo_doacao_nome = SerializerMethodField()
    
    class Meta:
        model = Doacao
        fields = ['id', 'instituicao_nome', 'tipo_doacao_nome', 'data_doacao', 'status']
    
    def get_instituicao_nome(self, obj):
        return obj.instituicao.nome
    
    def get_tipo_doacao_nome(self, obj):
        return obj.tipo_doacao.nome_tipo