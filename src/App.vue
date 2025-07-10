<script setup>
import causesData from './data/causasData';
import CauseCard from './components/CausasCard.vue';
</script>

<template>
  <main>
    <div class="topo">
       <div class="overlay"></div> <div class="banner">
        <h1>Transforme Vidas com Sua Doação</h1>
        <p>Conectamos doadores e instituições carentes de forma transparente e segura. Cada real doado faz a diferença na vida de quem mais precisa.</p>
        <div class="buttons">
          <button class="primary">Doar Agora</button>
          <button class="secondary">Saiba Mais</button>
        </div>
      </div>
    </div>
    <section class="nossas-causas">
        <h2>Nossas Causas</h2>
        <p>Conheça os projetos que estão transformando vidas e comunidades inteiras.</p>
        <div class="causes-grid">
            <CauseCard
                v-for="cause in causesData"
                :key="cause.id"
                :cause="cause"
            />
        </div>
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

  background-image: url('./icons/ref.png');
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
  opacity: 0.9;
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
}

.topo button.secondary {
  background-color: transparent;
  color: white;
  border: 3px solid white;
}

/*----------------------------------------------*/

.nossas-causas {
    text-align: center;
    padding: 60px 20px;
}

.nossas-causas h2 {
    font-weight: 550;
    font-size: 2.5em;
    color: #333;
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
</style>