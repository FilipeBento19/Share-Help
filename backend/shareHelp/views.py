from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Usuario, TipoDoacao, Instituicao, Endereco, Favorito, Doacao, CodigoVerificacao
from .serializers import (
    UsuarioSerializer, TipoDoacaoSerializer,
    InstituicaoSerializer, EnderecoSerializer, FavoritoSerializer, 
    DoacaoSerializer, EmailSerializer, VerificarCodigoSerializer
)
#Cadastro
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings

# Login
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#Perfil
from rest_framework.permissions import IsAuthenticated

#==========================================================
#                       Cadastro
#===========================================================
class EnviarCodigoView(APIView):
    def post(self, request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]

            # cria ou sobrescreve código
            codigo_obj, _ = CodigoVerificacao.objects.update_or_create(email=email)

            mensagem = f'''Olá!

Seu código de verificação para cadastro no Share Help é: {codigo_obj.codigo}

Este código é válido por 15 minutos.

Se você não solicitou este código, ignore este email.

Atenciosamente,
Equipe Share Help '''
            # envia email (precisa configurar EMAIL_BACKEND no settings.py)
            send_mail(
                subject="Código de verificação",
                message=mensagem,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )

            return Response({"message": "Código enviado para o email"}, status=status.HTTP_200_OK)
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
            # Verifica se email já validado com código
            try:
                CodigoVerificacao.objects.get(email=serializer.validated_data["email"])
            except CodigoVerificacao.DoesNotExist:
                return Response({"error": "Email não verificado"}, status=status.HTTP_400_BAD_REQUEST)

            usuario = serializer.save()
            return Response(UsuarioSerializer(usuario).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#==========================================================
#                       Perfil
#===========================================================
class PerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsuarioSerializer(request.user)
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