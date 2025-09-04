from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Usuario, TipoDoacao, Instituicao, Endereco, Favorito, Doacao
from .serializers import (
    UsuarioSerializer, UsuarioCreateSerializer, TipoDoacaoSerializer,
    InstituicaoSerializer, EnderecoSerializer, FavoritoSerializer, 
    DoacaoSerializer
)


class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UsuarioCreateSerializer
        return UsuarioSerializer
    
    @action(detail=True, methods=['get'])
    def historico_doacoes(self, request, pk=None):
        usuario = self.get_object()
        doacoes = Doacao.objects.filter(usuario=usuario)
        serializer = DoacaoSerializer(doacoes, many=True)
        return Response(serializer.data)


class TipoDoacaoViewSet(ModelViewSet):
    queryset = TipoDoacao.objects.filter(ativo=True)
    serializer_class = TipoDoacaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class EnderecoViewSet(ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer
    permission_classes = [IsAuthenticated]


class InstituicaoViewSet(ModelViewSet):
    queryset = Instituicao.objects.filter(ativo=True)
    serializer_class = InstituicaoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        return Instituicao.objects.filter(ativo=True).select_related('endereco')
    
    @action(detail=False, methods=['get'])
    def mapa(self, request):
        """Retorna instituições para o mapa"""
        instituicoes = self.get_queryset().filter(
            tipo__in=['local', 'ambos'],
            endereco__isnull=False
        )
        
        data = []
        for inst in instituicoes:
            data.append({
                'id': inst.id,
                'nome': inst.nome,
                'endereco': str(inst.endereco),
                'latitude': float(inst.endereco.latitude),
                'longitude': float(inst.endereco.longitude),
                'telefone': inst.telefone
            })
        
        return Response(data)


class FavoritoViewSet(ModelViewSet):
    queryset = Favorito.objects.all()  # Queryset base obrigatório
    serializer_class = FavoritoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filtro específico por usuário
        return Favorito.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class DoacaoViewSet(ModelViewSet):
    queryset = Doacao.objects.all()  # Queryset base obrigatório
    serializer_class = DoacaoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filtro específico por usuário
        return Doacao.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)