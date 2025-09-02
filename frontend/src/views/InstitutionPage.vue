<script setup>
import { computed } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ongs from '@/data/ongsData'

const availableInstitutions = computed(() => {
  return ongs
  .filter((ong) => ong.id !== 'joao-de-paula')
  .filter((ong) => ong.id !== 'bom-retiro')
    .map((ong) => ({
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


</script>

<template>
  <main>
    <div class="topo">
      <div class="overlay"></div>
      <div class="banner">
        <h1>Instituições disponíveis</h1>
        <p>
          Cada valor doado muda o futuro de quem realmente precisa. Sua contribuição, por menor que pareça, leva esperança, transforma vidas e abre oportunidades
        </p>
      </div>
    </div>

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

            <router-link :to="`/institution/${institution.id}`"><button class="btn-doar-instituicao" > Doar para esta instituição </button></router-link>
          </div>
        </div>
      </div>
    </section>

    <section>
      <FooterComponent />
    </section>
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
}

.topo .banner {
  z-index: 2;
  position: relative;
  max-width: 730px;
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

.institution-description {
  font-size: 0.9em;
  color: #6b7280;
  margin-bottom: 15px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.institution-meta {
  margin-bottom: 15px;
}

.meta-item {
  font-size: 0.8em;
  color: #6b7280;
  margin-bottom: 5px;
}

.meta-item strong {
  color: #1f2937;
}

.filtros-container {
  margin-top: 8px;
}

.filtros-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 5px;
}

.filtro-tag-small {
  background: #e0e7ff;
  color: #3730a3;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.7em;
  font-weight: 500;
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
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.institution-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  min-height: 450px;
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
  object-fit: cover;
}

.institution-info {
  padding: 20px;
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.institution-info h4 {
  font-size: 1.2em;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1.3;
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


</style>
