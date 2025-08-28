<script setup>
import ongs from '@/data/ongsData';

</script>

<template>
  
  
  <div class="pagina-game">
    <router-link to="/"><button class="botao-voltar">◄ Voltar</button></router-link>
    <div class="container-game">
      <div class="capa-container">  
        <img :src="ongs.img" :alt="ongs.title" class="capa-game">
      </div>
      
      <div class="info-game">
        <h1>{{ ongs.title }}</h1>
        
        <div class="detalhes">
          <p><strong>Plataformas:</strong></p>
          <p><strong>Lançamento:</strong></p>
          <p><strong>Classificação:</strong> </p>
        </div>
        
        <div class="preco-container">
          <h3>R$ </h3>
          <button @click="adicionarAoCarrinho(game)" class="botao-comprar">
            Adicionar ao Carrinho
          </button>
        </div>
        
        <div class="descricao">
          <h3>Sobre o Jogo</h3>
          <p>aaa</p>
        </div>
      </div>
    </div>
  </div>
  <footer>

  </footer>
</template>

<style scoped>
.pagina-game {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.botao-voltar {
  background: none;
  border: none;
  color: #1a1a2e;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.botao-voltar:hover {
  text-decoration: underline;
}

.container-game {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.capa-container {
  flex: 1;
  max-width: 400px;
}

.capa-game {
  width: 100%;
  margin-top: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.info-game {
  flex: 2;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
  text-align: left;
}

h2 {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1.5rem;
  font-weight: normal;
}

.detalhes {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.detalhes p {
  margin: 0.5rem 0;
  color: #555;
}

.preco-container {
  margin: 2rem 0;
}

.preco-container h3 {
  font-size: 1.8rem;
  color: #e94560;
  margin-bottom: 1rem;
}

.botao-comprar {
  background-color: #1a1a2e;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.botao-comprar:hover {
  background-color: #0f3460;
}

.descricao {
  margin-top: 2rem;
  line-height: 1.6;
}

.descricao h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.descricao p {
  color: #555;
}

.game-nao-encontrado {
  text-align: center;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .container-game {
    flex-direction: column;
  }
  
  .capa-container {
    max-width: 100%;
    margin: 0 auto;
  }
}

.mensagem-carrinho {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #e94560;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  font-size: 1rem;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
}
</style>