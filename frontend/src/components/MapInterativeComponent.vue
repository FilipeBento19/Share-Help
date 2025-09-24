<script setup>
// Componente apenas visual - sem funcionalidade de modal
</script>

<template >
  <div class="mapa-container">
    <div class="mapa-section">
      <h1 class="title">Mapa interativo</h1>
      <p class="subtitle">Escolha o local mais conveniente para você fazer sua doação</p>
      
        <div class="content-wrapper">
            <div class="text-content">
                <h2 class="content-title">Sua doação está a um passo de quem <span class="highlight">precisa!</span></h2>
                <div class="descriptionm">
                    <p>
                    Conectar quem quer ajudar com quem precisa é o nosso objetivo. 
                    Pensando nisso, criamos um mapa interativo com todas as 
                    unidades de doação da cidade de Joinville.<br>
                    Através dele, você encontra com facilidade os pontos mais 
                    próximos e acessíveis para realizar sua doação.<br>
                    Seja roupas, alimentos ou outros itens essenciais, cada gesto 
                    conta e pode transformar vidas.<br>
                    A navegação é simples e intuitiva, explore o mapa, filtre por tipo 
                    de doação e descubra horários e informações de cada local.<br>
                    Seu gesto de solidariedade pode mudar a vida de alguém.
                    </p>
                </div>
                <router-link class="beringela" to="/mapinterative">
                  <button class="access-button">
                    Acessar o mapa
                  </button>
                </router-link>
            
                <p class="map-note">
                    (o mapa é projetado apenas para a cidade de Joinville)
                </p>
            </div>
    <img src="/icons/MapTestJoinville.png" alt="Mapa de Joinville" class="map-image">    
        </div>  
    </div>
  </div>
</template>

<style scoped>



.mapa-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  position: relative;
}

.mapa-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #333;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 60px;
  font-weight: 400;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.text-content {
  padding-right: 20px;
  padding: 50px 0 50px 50px
}

.content-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 30px;
  line-height: 1.3;
}

.highlight {
  color: #ff6b35;
  position: relative;
}

.descriptionm {
  margin-bottom: 40px;
}

.descriptionm p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
}

.final-message {
  font-weight: 600;
  color: #333 !important;
}

.access-button {
  background: linear-gradient(135deg, #4285f4 0%, #3367d6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
  display: block;
  font-family: 'Montserrat', sans-serif;
}

.beringela {
  text-decoration: none;
}

.access-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 133, 244, 0.3);
}

.access-button:active {
  transform: translateY(0);
}

.map-image {
  width: 100%;
  max-width: 800px;
  height: 625px;
    
}

@media (max-width: 1200px) {
    .content-wrapper {
        gap: 30px;
    }
    
    .text-content {
        padding: 30px;
    }
    
    .title {
        font-size: 2.3rem;
    }
    
    .content-title {
        font-size: 1.8rem;
    }
}

@media (max-width: 992px) {
    .content-wrapper {
        grid-template-columns: 1fr 1fr;
        gap: 25px;
        
    }
    
    .map-image{
      height: 400px;
    }

    .text-content {
        padding: 25px;
    }
    
    .title {
        font-size: 2.1rem;
    }
    
    .content-title {
        font-size: 1.6rem;
    }
    
    .description p {
        font-size: 0.95rem;
    }
    
    .access-button {
        padding: 12px 24px 12px 24px;
        font-size: 1rem;
    }
}

@media (max-width: 768px) {
    .content-wrapper {
        grid-template-columns: 1fr;
        text-align: center;
    }
    
    .text-content {
        padding: 30px 20px;
        order: 2;
    }
    
    .map-image-container {
        order: 1;
    }
    
    .title {
        font-size: 1.9rem;
    }
    
    .subtitle {
        font-size: 1rem;
        margin-bottom: 30px;
    }
    
    .content-title {
        font-size: 1.5rem;
    }
    
    .description p {
        font-size: 0.9rem;
    }
    
    .access-button {
        padding: 11px 22px;
        font-size: 0.95rem;
    }
    
    .map-note {
        font-size: 0.85rem;
    }
}

@media (max-width: 576px) {
    .mapa-section {
        padding: 30px 15px;
    }
    
    .text-content {
        padding: 20px 15px;
    }
    
    .title {
        font-size: 1.7rem;
    }
    
    .subtitle {
        font-size: 0.95rem;
    }
    
    .content-title {
        font-size: 1.4rem;
    }
    
    .description p {
        font-size: 0.85rem;
    }
    
    .access-button {
        padding: 10px 20px;
        font-size: 0.9rem;
        margin-left: 95px;
    }
    
    .map-note {
        font-size: 0.8rem;
    }
}

@media (max-width: 400px) {
    .title {
        font-size: 1.5rem;
    }
    
    .subtitle {
        font-size: 0.9rem;
    }
    
    .content-title {
        font-size: 1.3rem;
    }
    
    .description p {
        font-size: 0.8rem;
    }
    
    .access-button {
        padding: 9px 18px;
        font-size: 0.85rem;
    }
    
    .map-note {
        font-size: 0.75rem;
    }
}

</style>