<script setup>

</script>

<template>
  <div class="sharehelp-container">
    <div class="sharehelp-section">
      <div class="content-wrapper">
        <div class="text-content">
          <h1 class="main-title">O que é shareHelp?</h1>
          <p class="subtitle">uma forma segura de doar</p>
          
          <div class="description">
            <p>
              O ShareHelp é um <strong>plataforma digital</strong> que conecta doadores e 
              instituições de caridade de forma simples, transparente e segura. Nosso 
              objetivo é tornar o ato de doar acessível a todos, garantindo que cada 
              contribuição chegue a quem mais precisa.
            </p>
            <p>
              Com nosso mapa interativo, você encontra instituições próximas e 
              escolhe de forma consciente onde quer ajudar. Temos clareza sobre o destino 
              da sua doação. Além disso, oferecemos relatórios de impacto e registros 
              que permitem acompanhar os resultados práticos da sua contribuição.
            </p>
            <p>
              Assim, o ShareHelp cria um ambiente de confiança, onde a solidariedade 
              se transforma em mudanças reais na vida de comunidades e pessoas 
              em situação de vulnerabilidade.
            </p>
          </div>
        </div>
        
        <div class="steps-content">
          <h2 class="steps-title">Como funciona</h2>
          
            <div class="steps-container">
                <div class="step">
                    <div>
                        <img class="img3" src="/icons/3bottoms.png" alt="">
                    </div>
                    <div class="step-info">
                        <h3 class="step-title">Escolha sua causa</h3>
                        <p class="step-description">
                        Escolha entre ajudar na alimentação escolar, 
                        cuidados com idosos e a dar abrigo para 
                        moradores de rua
                        </p>
                        
                        <div class="textinhobasico">
                            <h3 class="step-title">Faça sua doação</h3>
                            <p class="step-description">
                            Realize o pagamento com garantia de 
                            segurança e transparência total
                            </p>
                        </div>
                        
                    
                        <h3 class="step-title">Visualize seu impacto</h3>
                        <p class="step-description">
                        Visualize gráficos e registros de doações para 
                        ver como sua contribuição impactou na 
                        melhora de instituições
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sharehelp-container {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 60vh;
  font-family: 'Montserrat', sans-serif;
  position: relative;
}

.sharehelp-section {
  max-width: 1700px;
  margin: 0 auto;
  
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: flex-start;
  padding: 50px;
}

.text-content {
  background: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 30px;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4285f4;
  margin-bottom: 8px;
  line-height: 1.2;
}

.highlight {
  color: #4285f4;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
  font-weight: 400;
}

.description {
  margin-bottom: 20px;
}

.img3 {
  width: 60px;
}

.description p {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
  text-align: justify;
}

.steps-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 30px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.textinhobasico {
  margin-top: 35px;
  margin-bottom: 60px;
}

.step-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.step-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

.step-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.9;
}

@media (max-width: 1200px) {
  .content-wrapper {
    gap: 40px;
    padding: 40px;
  }
  
  .main-title {
    font-size: 2.2rem;
  }
  
  .steps-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 992px) {
  .content-wrapper {
    gap: 30px;
    padding: 30px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .steps-title {
    font-size: 1.5rem;
  }
  
  .description p {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 25px;
  }
  
  .text-content {
    padding-right: 0;
  }
  
  .steps-content {
    padding-left: 0;
  }
  
  .main-title {
    font-size: 1.8rem;
    text-align: center;
  }
  
  .subtitle {
    font-size: 1rem;
    text-align: center;
  }
  
  .steps-title {
    font-size: 1.4rem;
    text-align: center;
  }
  
  .description p {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .sharehelp-section {
    padding: 30px 15px;
  }
  
  .content-wrapper {
    padding: 20px;
    gap: 30px;
  }
  
  .main-title {
    font-size: 1.6rem;
  }
  
  .subtitle {
    font-size: 0.95rem;
  }
  
  .steps-title {
    font-size: 1.3rem;
  }
  
  .description p {
    font-size: 0.85rem;
  }
  
  .step-title {
    font-size: 1rem;
  }
  
  .step-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 400px) {
  .main-title {
    font-size: 1.4rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
  
  .steps-title {
    font-size: 1.2rem;
  }
  
  .description p {
    font-size: 0.8rem;
  }
  
  .step-title {
    font-size: 0.95rem;
  }
  
  .step-description {
    font-size: 0.85rem;
  }
  
  .step-number {
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
}
</style>