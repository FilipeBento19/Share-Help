<script setup>
import { ref, computed, onMounted } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { createTimer } from '@/data/timeGlobal'
import { motion } from 'motion-v'
import { instituicoesService } from '@/services/apiServices'
import '@/components/InstsCssComponent.css'

// =====================================
// ESTADO REATIVO
// =====================================
const ongs = ref([])
const isLoading = ref(true)
const error = ref(null)

// =====================================
// UTILITÁRIOS
// =====================================
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

// =====================================
// TIMER
// =====================================
const recommendedTimer = createTimer([11, 0, 1, 0], 'recommendedTimer')

// =====================================
// BUSCAR DADOS
// =====================================
onMounted(async () => {
  // Iniciar timer
  recommendedTimer.startTimer()

  // Buscar instituições
  try {
    console.log('🎯 Buscando instituições (MoradoresDeRuaPage)...')

    const result = await instituicoesService.getInstituicoes()

    console.log('🎯 Instituições recebidas:', result?.length)
    ongs.value = result || []

  } catch (err) {
    console.error('❌ Erro ao buscar instituições:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

// =====================================
// COMPUTED REATIVOS
// =====================================

// Instituição recomendada (Casa da Vó Joaquina)
const recommendedInstitution = computed(() => {
  if (!ongs.value || ongs.value.length === 0) {
    return {
      id: 'casa-vo-joaquina',
      name: 'Carregando...',
      description: 'Carregando dados da instituição...',
      timeLeft: recommendedTimer.formattedTime.value,
      goal: 5000,
      raised: 2800,
      image: '/icons/default-logo.png',
      telefone: '',
      local: '',
      horario: '',
      filtros: [],
      progress: 0,
    }
  }

  const ong = ongs.value.find((o) => o.id === 'casa-vo-joaquina')

  if (!ong) {
    return {
      id: 'casa-vo-joaquina',
      name: 'Instituição não encontrada',
      description: 'A instituição recomendada não foi encontrada.',
      timeLeft: recommendedTimer.formattedTime.value,
      goal: 5000,
      raised: 2800,
      image: '/icons/default-logo.png',
      telefone: '',
      local: '',
      horario: '',
      filtros: [],
      progress: 0,
    }
  }

  return {
    id: ong.id,
    name: ong.title,
    description: ong.description,
    timeLeft: recommendedTimer.formattedTime.value,
    goal: 5000,
    raised: 2800,
    image: ong.img,
    telefone: ong.telefone,
    local: ong.local,
    horario: ong.horario,
    filtros: ong.filtros,
    progress: ong.progress,
  }
})

// Instituições disponíveis (categoria moradores-de-rua, exceto a recomendada)
const availableInstitutions = computed(() => {
  if (!ongs.value || ongs.value.length === 0) {
    return []
  }

  return ongs.value
    .filter((ong) => ong.id !== 'casa-vo-joaquina')
    .filter((ong) => ong.categoria === 'moradores-de-rua')
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

// =====================================
// AÇÕES
// =====================================
const doarParaEstaOpcao = () => {
  // Sua lógica de doação aqui
  console.log('Doar para:', recommendedInstitution.value.name)
}
</script>

<template>
  <main>
    <!-- =====================================
         ESTADOS DE CARREGAMENTO
         ===================================== -->

    <!-- Loading -->
    <div v-if="isLoading" class="loading-container">
      <div class="topo">
        <div class="overlay"></div>
        <div class="banner">
          <h1>Ajude Gerando Abrigo Para Moradores de Rua</h1>
          <p>Carregando informações das instituições...</p>
        </div>
      </div>
      <div class="loading-state">
        <p>Carregando instituições...</p>
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="error-container">
      <div class="topo">
        <div class="overlay"></div>
        <div class="banner">
          <h1>Ops! Algo deu errado</h1>
          <p>Erro ao carregar as instituições.</p>
        </div>
      </div>
      <div class="error-state">
        <p>Erro ao carregar instituições: {{ error }}</p>
        <button @click="$router.go(0)">Tentar novamente</button>
      </div>
    </div>

    <!-- =====================================
         CONTEÚDO PRINCIPAL
         ===================================== -->

    <div v-else>
      <!-- Banner -->
      <div class="topo">
        <div class="overlay"></div>
        <div class="banner">
          <h1>Ajude Gerando Abrigo Para Moradores de Rua</h1>
          <p>
            Cada valor doado gera lares para pessoas sem condição em situação de vulnerabilidade
          </p>
        </div>
      </div>

      <!-- ShareHelp Recomenda -->
      <section class="sharehelp-recomenda">
        <h2>ShareHelp Recomenda</h2>
        <p>Conheça o projeto inovador que tem o apoio da<br />equipe sharehelp</p>

        <div class="recommendation-card">
          <div class="card-left">
            <div class="institution-logo">
              <img :src="recommendedInstitution.image" :alt="recommendedInstitution.name" />
            </div>
            <div class="timer">
              <span class="time">{{ recommendedInstitution.timeLeft }}</span>
            </div>
          </div>

          <div class="card-right">
            <h3>{{ recommendedInstitution.name }}</h3>
            <div class="description">
              <p>{{ recommendedInstitution.description }}</p>
            </div>

            <div class="progress-section">
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{
                    width: (recommendedInstitution.raised / recommendedInstitution.goal) * 100 + '%',
                  }"
                ></div>
              </div>
              <div class="progress-info">
                <span>{{ Math.round((recommendedInstitution.raised / recommendedInstitution.goal) * 100) }}% alcançado</span>
                <span>Meta: {{ formatCurrency(recommendedInstitution.goal) }}</span>
              </div>
            </div>

            <div class="card-actions">
              <button class="btn-doar-opcao" @click="doarParaEstaOpcao">Doar para esta opção</button>
              <router-link :to="`${$route.path}/${recommendedInstitution.id}`">
                <button class="btn-pagina-instituicao">Página da Instituição</button>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Instituições Disponíveis -->
      <motion.div
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.2, ease: 'easeInOut' }"
      >
        <section class="instituicoes-disponiveis">
          <h2>Instituições disponíveis</h2>
          <p>Apoie projetos independentes com toda a segurança<br />garantida pela equipe sharehelp</p>

          <!-- Se não há instituições disponíveis -->
          <div v-if="availableInstitutions.length === 0" class="empty-institutions">
            <p>Nenhuma instituição adicional encontrada na categoria moradores de rua.</p>
          </div>

          <!-- Grid de instituições -->
          <div v-else class="institutions-grid">
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
              <div class="card-actions">
                <router-link :to="`$`"><button class="btn-doar-opcao" >Doar para esta opção</button></router-link>
                <router-link :to="`${$route.path}/${recommendedInstitution.id}`"><button class="btn-pagina-instituicao" >Página da Instituição</button></router-link>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      <!-- Footer -->
      <section>
        <FooterComponent />
      </section>
    </div>
  </main>
</template>

<style scoped>
/* =====================================
   ESTADOS DE CARREGAMENTO
   ===================================== */
.loading-container, .error-container {
  min-height: 100vh;
}

.loading-state, .error-state {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.error-state button {
  background: #dc2626;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.error-state button:hover {
  background: #b91c1c;
}

.empty-institutions {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
  font-style: italic;
}

</style>
