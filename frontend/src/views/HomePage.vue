<script setup>
import { computed } from 'vue';
import causesData from '../data/causasData';
import CausasCard from '../components/CausasCard.vue';
import PaymentCard from '../components/PaymentMethodComponent.vue';
import MapInteractive from '@/components/MapInterativeComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { motion } from 'motion-v';

const line1 = "Transforme Vidas";
const line2 = "com sua Doação";

const wordsLine1 = computed(() => line1.split(' '));
const wordsLine2 = computed(() => line2.split(' '));

</script>

<template>
  <main>
    <div class="topo">
        <div class="overlay"></div>
        <div class="banner">
          <div class="linetop">       
            <div class="line">
              <motion.div 
                v-for="(word, i) in wordsLine1"
                :key="'line1-' + i"
                class="split-word"
                :initial="{ opacity: 0, y: 10 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :viewport="{ once: false }"
                :transition="{ duration: 0.5, delay: i * 0.05 }"
              >
                {{ word }}
              </motion.div>
            </div>
            <div class="line">
              <motion.div 
                v-for="(word, i) in wordsLine2"
                :key="'line2-' + i"
                class="split-word"
                :initial="{ opacity: 0, y: 10 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :viewport="{ once: false }"
                :transition="{ duration: 0.5, delay: (i + wordsLine1.length) * 0.05 }"
              >
                {{ word }}
              </motion.div>
            </div>
          </div>
          <p>Conectamos doadores e instituições carentes de forma transparente e segura. Cada real doado faz a diferença na vida de quem mais precisa.</p>
          <div class="buttons">
            <a href="/institution"><button class="primary">Doar Agora</button></a>
          </div>
        </div>
    </div>
    <section class="nossas-causas">
        <h2>Nossas Causas</h2>
        <p>Conheça os projetos que estão transformando vidas e <br>comunidades inteiras.</p>
            <div class="causes-grid">
              <CausasCard 
                  v-for="cause in causesData"
                  :key="cause.id"
                  :cause="cause"
              />
            </div>
    </section>
    <section class="escolher-sh">
      <h1>Por que Escolher o ShareHelp?</h1>
    <div class="escolher-coisas">
      <div class="escolher-div">
        <img src="/icons/seguranca.png" alt="">
        <h2>Segurança garantida</h2>
        <p>Receba relatórios e gráficos detalhados sobre suas doações e onde seu dinheiro foi investido</p>
      </div>
      <div class="escolher-div">
        <img src="/icons/praticidade.png" alt="">
        <h2>Praticidade</h2>
        <p>Acompanhe em tempo real o suporte que a comunidade dá as fundações</p>
      </div>
      <div class="escolher-div">
        <img src="/icons/doacoes.png" alt="">
        <h2>Doações Recorrentes</h2>
        <p>Configure doações únicas ou mensais, para facilitar seu ato ajuda</p>
      </div>
    </div>
    </section>
    <section class="formas-de-doar">
      <div class="formas-desc">
        <h1>Formas de Doar</h1>
        <p>Escolha a forma mais conveniente para você fazer sua doação</p>
      </div>
      <div class="payment-grid">
            <PaymentCard/>
      </div>
    </section>
    <section class="mapa-interativo">
      <MapInteractive/>
    </section>
    <section>
      <FooterComponent/>
    </section>
  </main>
</template>

<style scoped>
@media (max-width: 1200px) {
    .causes-grid, .payment-grid {
        gap: 15px;
    }
    
    .cause-card, .payment-card {
        padding: 15px;
    }
    
    .escolher-div {
        padding: 15px;
    }
}

@media (max-width: 992px) {
    
    .cause-title, .payment-title, .escolher-div h2 {
        font-size: 1.1rem;
    }
    
    .cause-description, .payment-description, .escolher-div p {
        font-size: 0.5rem;
    }
    
    .escolher-div img, .payment-icon {
        width: 50px;
        height: 50px;
    }
}

@media (max-width: 768px) {
    
    
    .cause-card, .payment-card, .escolher-div {
        padding: 12px;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .section-subtitle {
        font-size: 1rem;
    }
    
    .cause-title, .payment-title, .escolher-div h2 {
        font-size: 1rem;
    }
    
    .cause-description, .payment-description, .escolher-div p {
        font-size: 0.8rem;
    }
    
    .donate-button, .payment-button {
        padding: 8px 12px;
        font-size: 0.85rem;
    }
    
    .escolher-div img, .payment-icon {
        width: 40px;
        height: 40px;
    }
    
    .progress-text {
        font-size: 0.8rem;
    }

    .line {
    display: block;
    margin-bottom: -20px;
    }
}

@media (max-width: 576px) {
    
    
    .cause-card, .payment-card, .escolher-div {
        padding: 10px;
    }
    
    .section-title {
        font-size: 1.7rem;
    }
    
    .section-subtitle {
        font-size: 0.9rem;
        margin-bottom: 30px;
    }
    
    .cause-title, .payment-title, .escolher-div h2 {
        font-size: 0.9rem;
        margin: 10px 0;
    }
    
    .cause-description, .payment-description, .escolher-div p {
        font-size: 0.75rem;
        line-height: 1.4;
    }
    
    .donate-button, .payment-button {
        padding: 6px 10px;
        font-size: 0.8rem;
    }
    
    .escolher-div img, .payment-icon {
        width: 35px;
        height: 35px;
        margin-bottom: 10px;
    }
    
    .progress-bar {
        height: 6px;
        margin: 10px 0;
    }
    
    .progress-text {
        font-size: 0.75rem;
    }

    
    
}

@media (max-width: 400px) {
    .causes-grid, .payment-grid, .escolher-coisas {
        gap: 8px;
    }
    
    .cause-card, .payment-card, .escolher-div {
        padding: 8px;
    }
    
    .section-title {
        font-size: 1.5rem;
    }
    
    .section-subtitle {
        font-size: 0.85rem;
    }
    
    .formas-desc p {
      width: 60%;
    }

    .formas-desc {
      justify-items: center;
    }

    .cause-title, .payment-title, .escolher-div h2 {
        font-size: 0.85rem;
    }
    
    .cause-description, .payment-description, .escolher-div p {
        font-size: 0.7rem;
    }
    
    .donate-button, .payment-button {
        padding: 5px 8px;
        font-size: 0.75rem;
    }
    
    .escolher-div img, .payment-icon {
        width: 30px;
        height: 30px;
    }

}

.linetop{
  padding-bottom: 50px;
}

.line {
  display: block;
  margin-bottom: -2rem;
}

.split-word {
  display: inline-block;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  margin-right: 0.25em;
  color: white;
}

.topo {
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  color: white;
  box-sizing: border-box;
  background-image: url('/icons/ref.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.topo .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(37, 99, 235, 0.7), rgba(16, 185, 129, 0.7)); 
  z-index: 1;
  animation: gradientBG 8s ease infinite;
  background-size: 300% 300%;
}

.topo .banner {
  z-index: 2;
  position: relative; 
  max-width: 720px; 
  width: 100%; 
  text-align: left; 
  padding-left: 10%; 
}

.topo p {
  font-size: 1.2em;
  margin-bottom: 30px;
  line-height: 1.5;
}

.topo .buttons {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.topo button {
  font-family: 'Montserrat', sans-serif;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.topo button.primary {
  background-color: #ffffff;
  color: #2563EB;
  border: 1px solid #ffffff;
  transition: all 0.3s ease;
}

.topo button.primary:hover {
  background-color: #dddddd;
  border-color: #dddddd;
  transform: translateY(-2px);
}

/*----------------------------------------------*/

.nossas-causas {
    text-align: center;
    padding: 60px 20px;
}

.nossas-causas h2 {
    font-weight: 650;
    font-size: 2.5em;
    color: #111827;
    margin-bottom: 15px;
}

.nossas-causas p {
    font-size: 1.1em;
    color: #555;
    margin-bottom: 40px;
}

.causes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 10px;
}

/*----------------------------------------------*/

.escolher-sh {
  background-color: #f8f8f8 ;
  padding: 2vw;
  text-align: center;
}

.escolher-sh h1{
  font-weight: 650;
  font-size: 2.3rem;
  color: #111827;
  padding-bottom: 15px;
}

.escolher-coisas{
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.escolher-div {
  text-align: center;
  max-width: 150;
  width: 25%;
}

.escolher-div h2{
  padding-top: 10px;
  font-weight: 1000;
  color: #111827;
}

.escolher-div p{
  padding-top: 15px;
  color: #4B5563;
}

/*----------------------------------------------*/

.formas-desc{
  padding-top: 30px;
}

.formas-de-doar {
  text-align: center;
}

.formas-de-doar h1 {  
  font-weight: 650;
  font-size: 2.3rem;
  color: #111827;
}

.payment-grid {
  padding-top: 2.5vw;
  padding-bottom: 4vw;
}


</style>