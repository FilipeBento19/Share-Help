<script setup>
import { computed, onMounted } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ongs from '@/data/ongsData'
import { motion } from 'motion-v'
import { useRoute } from 'vue-router'
import { fromOng } from '@/data/globalState'

// eslint-disable-next-line no-unused-vars
const route = useRoute();


onMounted(() => {
  // reset após primeira animação
  if (fromOng.value) fromOng.value = false
})


const availableInstitutions = computed(() => {
  return ongs
    .filter(ong => !['joao-de-paula', 'bom-retiro', 'sementes-do-futuro'].includes(ong.id))
    .map(ong => ({
      id: ong.id,
      name: ong.title,
      description: ong.description,
      image: ong.img,
      telefone: ong.telefone,
      local: ong.local,
      horario: ong.horario,
      filtros: ong.filtros,
      categoria: ong.categoria,
    }))
})

const text = "Instituições Disponíveis"
const wordtext = computed(() => text.split(' '))
</script>

<template>
    <main>
      <!-- Banner e conteúdo igual ao seu código anterior -->
      <div class="topo">
        <div class="overlay"></div>
        <div class="banner">
          <motion.div
            v-for="(word, i) in wordtext"
            :key="'line1-' + i"
            class="split-word"
            :initial="{ opacity: 0, y: 10 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: false }"
            :transition="{ duration: 0.5, delay: i*0.05 }"
          >
            {{ word }}
          </motion.div>
          <p>
            Cada valor doado muda o futuro de quem realmente precisa. Sua contribuição, por menor que pareça, leva esperança, transforma vidas e abre oportunidades
          </p>
        </div>
      </div>
      <motion.div
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.2, ease: 'easeInOut' }"
      >
        <section class="instituicoes-disponiveis">
          <h2>Instituições disponíveis</h2>
          <p>Apoie projetos independentes com toda a segurança<br />garantida pela equipe sharehelp</p>

          <div class="institutions-grid">
            <div
              v-for="institution in availableInstitutions"
              :key="institution.id"
              class="institution-card"
            >
              <div class="institution-image">
                <img :src="institution.image" :alt="institution.name" />
              </div>
              <div class="institution-info">
                <h4>{{ institution.name }}</h4>
                <p class="institution-description">{{ institution.description }}</p>

                <div class="institution-meta">
                  <div class="meta-item"><strong>Categoria:</strong> {{ institution.categoria }}</div>
                  <div class="meta-item"><strong>Telefone:</strong> {{ institution.telefone }}</div>
                  <div class="meta-item"><strong>Horário:</strong> {{ institution.horario }}</div>
                  <div class="meta-item filtros-container">
                    <strong>Aceita:</strong>
                    <div class="filtros-list">
                      <span
                        v-for="filtro in institution.filtros"
                        :key="filtro"
                        class="filtro-tag-small"
                      >
                        {{ filtro }}
                      </span>
                    </div>
                  </div>
                </div>

                <router-link :to="`${$route.path}/${institution.id}`">
                  <button class="btn-doar-instituicao">Doar para esta instituição</button>
                </router-link>

              </div>
            </div>
          </div>
        </section>
      </motion.div>
      <FooterComponent />
    </main>
  
</template>

<style scoped>
/* Banner Principal */
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

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.topo .banner {
  z-index: 2;
  position: relative;
  max-width: 800px;
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

.animated-line {
  display: flex;
  gap: 2rem;
  white-space: nowrap;
  flex-wrap: nowrap;
  overflow: hidden;
}

.split-word {
  display: inline-block;
  white-space: nowrap;
  margin-right: 0.8rem;
  font-size: 3.1rem;
  font-weight: 900;
}

/* ShareHelp Recomenda */
.sharehelp-recomenda {
  padding: 60px 20px;
  text-align: center;
  background-color: #f8f9fa;
}

.sharehelp-recomenda h2 {
  font-size: 2.5em;
  font-weight: 650;
  color: black;
  margin-bottom: 15px;
}

.sharehelp-recomenda > p {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 40px;
}

.recommendation-card {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 30px;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

.card-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
}

.institution-logo {
  width: 260px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.institution-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.timer {
  text-align: center;
}

.time {
  font-size: 2rem;
  font-weight: bold;
  color: #dc2626;
  font-family: 'Courier New', monospace;
}

.card-right {
  flex: 1;
  text-align: left;
}

.card-right h3 {
  font-size: 1.8em;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.description {
  margin-bottom: 25px;
}

.description p {
  font-size: 0.95em;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 15px;
}

.progress-section {
  margin-bottom: 25px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #dc2626 0%, #ef4444 100%);
  transition: width 0.3s ease;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em; 
  color: #777;
  margin-bottom: 15px; 
}

.current-amount {
  font-size: 0.9em;
  color: #6b7280;
  font-weight: 500;
}

/* Detalhes da instituição */
.institution-details {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.detail-item {
  margin-bottom: 8px;
  font-size: 0.9em;
  color: #4b5563;
}

.detail-item strong {
  color: #1f2937;
  margin-right: 8px;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 5px;
}

.filtro-tag {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: 500;
}

.card-actions {
  display: flex;
  gap: 15px;
}

.btn-doar-opcao {
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-doar-opcao:hover {
  transform: translateY(-2px);
}

.btn-pagina-instituicao {
  background: #2563eb;
  color: white;
  border: 2px solid #2563eb;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-pagina-instituicao:hover {
  transform: translateY(-2px);
}

/* Instituições Disponíveis */
.instituicoes-disponiveis {
  padding: 60px 20px;
  text-align: center;
}

.instituicoes-disponiveis h2 {
  font-size: 2.5em;
  font-weight: 650;
  color: black;
  margin-bottom: 15px;
}

.instituicoes-disponiveis > p {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 50px;
}

.institutions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.institution-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 520px; /* Altura fixa */
  display: flex;
  flex-direction: column;
}

.institution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.institution-image {
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.institution-image img {
  width: 100%;
  height: 100%;
}

.institution-info {
  padding: 20px;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.institution-info h4 {
  font-size: 1.2em;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.3;
  height: 32px; /* Altura fixa para título */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.institution-description {
  font-size: 0.9em;
  color: #6b7280;
  margin-bottom: 15px;
  line-height: 1.5;
  height: 65px; /* Altura fixa para descrição */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.institution-meta {
  flex: 1;
  overflow: hidden;
}

.meta-item {
  font-size: 0.8em;
  color: #6b7280;
  margin-bottom: 5px;
  line-height: 1.4;
}

.meta-item strong {
  color: #1f2937;
}

.filtros-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 5px;
  max-height: 45px; /* Limita altura das tags */
  overflow: hidden;
}

.filtro-tag-small {
  background: #e0e7ff;
  color: #3730a3;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.7em;
  font-weight: 500;
  white-space: nowrap;
}

.btn-doar-instituicao {
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
}

.btn-doar-instituicao:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .institutions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    max-width: 900px;
    padding: 0 15px;
  }
  
  .institution-card {
    height: 480px;
  }
  
  .topo {
    height: 45vh;
  }
  
  .split-word {
    font-size: 2.2rem;
  }

  .banner-text {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .institutions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 600px;
    padding: 0 10px;
  }
  
  .instituicoes-disponiveis {
    padding: 30px 10px;
  }
  
  .institution-card {
    height: 450px;
  }
  
  .institution-info {
    padding: 15px;
  }
  
  .institution-info h4 {
    font-size: 1.1em;
    height: 28px;
  }
  
  .institution-description {
    font-size: 0.85em;
    height: 60px;
    -webkit-line-clamp: 3;
  }
  
  .topo {
    height: 40vh;
    text-align: center;
  }
  
  .topo .banner {
    padding: 0 5%;
    text-align: center;
  }

  .split-word {
    font-size: 1.8rem;
    margin-right: 0.5rem;
  }
  
  .banner-text {
    max-width: 100%;
    font-size: 0.95rem;
    margin: 1rem auto 0;
  }
  
  .instituicoes-disponiveis h2 {
    font-size: 1.7rem;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
    margin-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .institutions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    max-width: 350px;
    padding: 0 5px;
  }

  .institution-image {
    max-height: 160px;
  }
  
  .instituicoes-disponiveis {
    padding: 25px 5px;
  }
  
  .institution-card {
    height: 320px;
  }

  .institution-info h4 {
    font-size: 1em;
    height: 20px;
    -webkit-line-clamp: 1;
  }
  
  .institution-description {
    font-size: 0.85em;
    height: 60px;
    -webkit-line-clamp: 3;
    margin-bottom: 4px;
  }

  .meta-item {
    display: none;
  }

  .institution-meta{
    display: none;
  }

  .filtros-list {
    display: none;
  }
  
  .btn-doar-instituicao {
    padding: 3px 10px 8px 10px;
    font-size: 0.8em;
  }
  
  .topo {
    height: 35vh;
  }
  
  .split-word {
    font-size: 1.7rem;
    padding-bottom: 10px;
  }
  
  .banner-text {
    font-size: 0.9rem;
  }
  
  .instituicoes-disponiveis h2 {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
    margin-bottom: 25px;
  }
}

@media (max-width: 360px) {
  .split-word {
    font-size: 1.3rem;
  }
  
  .banner-text {
    font-size: 0.85rem;
  }

  .institution-card {
    min-height: 400px;
  }
}
</style>
