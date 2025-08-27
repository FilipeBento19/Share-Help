<script setup>
import causesData from '../data/causasData';
import CausasCard from '../components/CausasCard.vue';
import PaymentCard from '../components/PaymentComponent.vue';
import MapInteractive from '@/components/MapInteractive.vue';
import FooterComponent from '@/components/FooterComponent.vue';


</script>

<template>
  <main>
    <div class="topo">
        <div class="overlay"></div> 
        <div class="banner">
          <h1>Transforme Vidas com Sua Doação</h1>
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
        <p>Acompanhe em tempo real como sua doação <br> está sendo utilizada</p>
      </div>
      <div class="escolher-div">
        <img src="/icons/praticidade.png" alt="">
        <h2>Praticidade</h2>
        <p>Receba relatórios detalhados sobre o impacto<br>das suas doações</p>
      </div>
      <div class="escolher-div">
        <img src="/icons/doacoes.png" alt="">
        <h2>Doações Recorrentes</h2>
        <p>Configure doações automáticas mensais ou <br>anuais</p>
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
}

.topo .banner {
  z-index: 2;
  position: relative; 
  max-width: 720px; 
  width: 100%; 
  text-align: left; 
  padding-left: 10%; 
}

.topo h1 {
  font-size: 3em;
  font-weight: 790;
  margin-bottom: 20px;
  line-height: 1.2;
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
    color: black;
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
  background-color: #eff1f5 ;
  padding: 2vw;
  text-align: center;
}

.escolher-sh h1{
  font-weight: 650;
  font-size: 2.3rem;
  color: black;
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
  color: black;
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
  color: black;
}

.payment-grid {
  padding-top: 2.5vw;
  padding-bottom: 4vw;
}
</style>