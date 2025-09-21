from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from django.db.models import Q, Count
from django.core.mail import send_mail
from django.conf import settings

from .models import (
    Usuario, TipoDoacao, Instituicao, Endereco, Favorito, 
    Doacao, CodigoVerificacao
)
from .serializers import (
    UsuarioSerializer, TipoDoacaoSerializer, InstituicaoSerializer,
    InstituicaoResumoSerializer, InstituicaoMapaSerializer,
    EnderecoSerializer, FavoritoSerializer, DoacaoSerializer,
    EmailSerializer, VerificarCodigoSerializer
)

# ================================
# AUTENTICAÇÃO
# ================================
class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class EnviarCodigoView(APIView):
    def post(self, request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            codigo_obj, _ = CodigoVerificacao.objects.update_or_create(email=email)

            # ✅ COMENTAR TEMPORARIAMENTE
            # send_mail(
            #     subject="Código de verificação - Share Help",
            #     message=mensagem,
            #     from_email=settings.DEFAULT_FROM_EMAIL,
            #     recipient_list=[email],
            #     fail_silently=False,
            # )

            # Para debug - retornar o código
            return Response({
                "message": "Código enviado para o email",
                "codigo": codigo_obj.codigo  # TEMPORÁRIO para teste
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerificarCodigoView(APIView):
    def post(self, request):
        serializer = VerificarCodigoSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            codigo = serializer.validated_data["codigo"]

            try:
                codigo_obj = CodigoVerificacao.objects.get(email=email, codigo=codigo)
                return Response({"message": "Código válido"}, status=status.HTTP_200_OK)
            except CodigoVerificacao.DoesNotExist:
                return Response({"error": "Código inválido"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegistrarUsuarioView(APIView):
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            try:
                CodigoVerificacao.objects.get(email=serializer.validated_data["email"])
            except CodigoVerificacao.DoesNotExist:
                return Response({"error": "Email não verificado"}, status=status.HTTP_400_BAD_REQUEST)

            from django.contrib.auth.password_validation import validate_password
            from django.core.exceptions import ValidationError
            
            senha = serializer.validated_data["password"]
            try:
                validate_password(senha)
            except ValidationError as e:
                return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)
            
            usuario = serializer.save()
            return Response(UsuarioSerializer(usuario).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data)

# ================================
# CORE VIEWSETS
# ================================
class TipoDoacaoViewSet(ModelViewSet):
    queryset = TipoDoacao.objects.filter(ativo=True)
    serializer_class = TipoDoacaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class EnderecoViewSet(ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer
    permission_classes = [IsAuthenticated]

# ================================
# INSTITUIÇÕES (ViewSet principal)
# ================================
class InstituicaoViewSet(ModelViewSet):
    queryset = Instituicao.objects.filter(status='ativa')
    serializer_class = InstituicaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Instituicao.objects.filter(status='ativa').prefetch_related('tipos_doacao_aceitos')
        
        # ============ FILTROS BASEADOS NO ONGSDATA ============
        
        # Filtro por categoria
        categoria = self.request.query_params.get('categoria')
        if categoria:
            queryset = queryset.filter(categoria=categoria)
        
        # Filtro por tipo de doação (filtros)
        filtro = self.request.query_params.get('filtro')
        if filtro:
            queryset = queryset.filter(tipos_doacao_aceitos__nome_tipo__icontains=filtro)
        
        # Filtro por cidade
        cidade = self.request.query_params.get('cidade')
        if cidade:
            queryset = queryset.filter(
                Q(endereco_completo__icontains=cidade) |
                Q(endereco_detalhado__cidade__icontains=cidade)
            )
        
        # Busca geral
        busca = self.request.query_params.get('busca')
        if busca:
            queryset = queryset.filter(
                Q(nome__icontains=busca) | 
                Q(descricao__icontains=busca) |
                Q(endereco_completo__icontains=busca) |
                Q(identificador__icontains=busca)
            )
        
        # Filtro por coordenadas (para busca por proximidade)
        lat = self.request.query_params.get('lat')
        lng = self.request.query_params.get('lng')
        raio = self.request.query_params.get('raio', '10')  # km
        
        if lat and lng:
            try:
                lat = float(lat)
                lng = float(lng)
                raio = float(raio)
                
                # Cálculo simples de proximidade (pode ser melhorado com PostGIS)
                from django.db.models import F
                from decimal import Decimal
                
                # Aproximação: 1 grau ≈ 111km
                delta = Decimal(raio) / Decimal('111.0')
                
                queryset = queryset.filter(
                    latitude__gte=lat - delta,
                    latitude__lte=lat + delta,
                    longitude__gte=lng - delta,
                    longitude__lte=lng + delta
                )
            except (ValueError, TypeError):
                pass
        
        return queryset.distinct()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return InstituicaoResumoSerializer
        elif self.action in ['mapa', 'mapa_dados']:
            return InstituicaoMapaSerializer
        return InstituicaoSerializer
    
    # ============ AÇÕES CUSTOMIZADAS ============
    
    @action(detail=False, methods=['get'])
    def mapa(self, request):
        """Endpoint para dados do mapa (compatível com coordenadas do ongsData)"""
        queryset = self.get_queryset()
        serializer = InstituicaoMapaSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def categorias(self, request):
        """Lista todas as categorias disponíveis"""
        categorias = [
            {'value': choice[0], 'label': choice[1]}
            for choice in Instituicao.CATEGORIA_CHOICES
        ]
        return Response(categorias)
    
    @action(detail=False, methods=['get'])
    def por_categoria(self, request):
        """Agrupa instituições por categoria (útil para dashboard)"""
        resultado = {}
        
        for categoria_code, categoria_nome in Instituicao.CATEGORIA_CHOICES:
            instituicoes = self.get_queryset().filter(categoria=categoria_code)
            serializer = InstituicaoResumoSerializer(instituicoes, many=True)
            
            resultado[categoria_code] = {
                'codigo': categoria_code,
                'nome': categoria_nome,
                'count': instituicoes.count(),
                'instituicoes': serializer.data
            }
        
        return Response(resultado)
    
    @action(detail=False, methods=['get'])
    def estatisticas(self, request):
        """Estatísticas gerais das instituições"""
        queryset = self.get_queryset()
        
        # Count por categoria
        stats_categoria = queryset.values('categoria').annotate(
            count=Count('id')
        ).order_by('categoria')
        
        # Count por status
        stats_status = Instituicao.objects.values('status').annotate(
            count=Count('id')
        ).order_by('status')
        
        # Tipos de doação mais aceitos
        stats_doacoes = TipoDoacao.objects.filter(
            instituicao__status='ativa'
        ).annotate(
            count=Count('instituicao')
        ).order_by('-count')[:10]
        
        return Response({
            'total_instituicoes': queryset.count(),
            'por_categoria': list(stats_categoria),
            'por_status': list(stats_status),
            'tipos_doacao_populares': TipoDoacaoSerializer(stats_doacoes, many=True).data
        })
    
    @action(detail=True, methods=['get'])
    def ongs_proximas(self, request, pk=None):
        """Encontra ONGs próximas à ONG atual"""
        try:
            instituicao = self.get_object()
            raio = float(request.query_params.get('raio', '5'))  # 5km padrão
            
            # Cálculo simples de proximidade
            from decimal import Decimal
            delta = Decimal(raio) / Decimal('111.0')
            
            proximas = Instituicao.objects.filter(
                status='ativa',
                latitude__gte=instituicao.latitude - delta,
                latitude__lte=instituicao.latitude + delta,
                longitude__gte=instituicao.longitude - delta,
                longitude__lte=instituicao.longitude + delta
            ).exclude(id=instituicao.id)[:10]
            
            serializer = InstituicaoResumoSerializer(proximas, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# ================================
# FAVORITOS E DOAÇÕES
# ================================
class FavoritoViewSet(ModelViewSet):
    queryset = Favorito.objects.all()
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Favorito.objects.filter(usuario=self.request.user).select_related('instituicao')
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class DoacaoViewSet(ModelViewSet):
    queryset = Doacao.objects.all()
    serializer_class = DoacaoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Doacao.objects.filter(usuario=self.request.user).select_related(
            'instituicao', 'tipo_doacao'
        )
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    
    @action(detail=False, methods=['get'])
    def estatisticas_usuario(self, request):
        """Estatísticas de doações do usuário atual"""
        doacoes = self.get_queryset()
        
        # Resumo por status
        por_status = doacoes.values('status').annotate(
            count=Count('id')
        ).order_by('status')
        
        # Resumo por instituição
        por_instituicao = doacoes.values(
            'instituicao__nome'
        ).annotate(
            count=Count('id'),
            valor_total=models.Sum('valor_estimado')
        ).order_by('-count')[:5]
        
        # Valor total doado
        from django.db.models import Sum
        valor_total = doacoes.aggregate(
            total=Sum('valor_estimado')
        )['total'] or 0
        
        return Response({
            'total_doacoes': doacoes.count(),
            'valor_total_doado': float(valor_total),
            'por_status': list(por_status),
            'top_instituicoes': list(por_instituicao)
        })