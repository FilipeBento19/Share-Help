<script setup>
import { defineProps } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  cause: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

</script>

<template>
  <div class="formas-doar-container"> 
    <div class="cards-container">

      <div class="doacao-card">
        <div class="doacao-img">
          <img src="/icons/qrcode.png" alt="PIX" class="card-icon">
          <h2>PIX</h2>
        </div>
        <p>Doação instantânea via PIX. Rápido, seguro e sem taxas.</p>
        <button class="button button-pix">Doar via PIX</button>
      </div>


      <div class="doacao-card">
        <div class="doacao-img">
          <img src="/icons/qrcode.png" alt="Cartão de crédito" class="card-icon">
          <h2>Cartão de crédito</h2>
        </div>
        <p>Doação única ou recorrente no cartão de crédito.</p>
        <button class="button button-cartao">Doar no Cartão</button>
      </div>


      <div class="doacao-card">
        <div class="doacao-img">
          <img src="/icons/qrcode.png" alt="Doação física" class="card-icon">
          <h2>Doação Física</h2>
        </div>
        <p>Roupas, alimentos, brinquedos e outros itens.</p>
        <button class="button button-fisica">Agendar Coleta</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formas-doar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  font-family: 'Montserrat', sans-serif;
}

.title {
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  color: #333;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 50px;
  font-weight: 400;
}

.cards-container {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.doacao-card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 30px 25px 25px 25px;
  width: 280px;
  max-width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.doacao-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.card-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
}


.doacao-img {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16px;
}

.doacao-card h2 {
  font-size: 1.3rem;
  margin: 0;
  color: #333;
  font-weight: 600;
  text-align: center;
}

.doacao-card p {
  font-size: 0.95rem;
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin: 16px 0 24px 0;
  flex-grow: 1;
}

.button {
  background: linear-gradient(135deg, #4285f4 0%, #3367d6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
  font-family: 'Montserrat', sans-serif;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);
}

.button:active {
  transform: translateY(0);
}

.button-pix {
  background: linear-gradient(135deg, #4285f4 0%, #3367d6 100%);
}

.button-cartao {
  background: linear-gradient(135deg, #4285f4 0%, #3367d6 100%);
}

.button-fisica {
  background: linear-gradient(135deg, #4285f4 0%, #3367d6 100%);
}

</style>