<script setup>
import { ref, computed, onMounted } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { instituicoesService } from '@/services/apiServices'
import { motion } from 'motion-v'
import { useRoute } from 'vue-router'
import { fromOng } from '@/data/globalState'

// eslint-disable-next-line no-unused-vars
const route = useRoute()

// Estado reativo
const ongs = ref([])
const isLoading = ref(true)
const error = ref(null)

// Buscar dados na montagem do componente
onMounted(async () => {
  // Reset após primeira animação
  if (fromOng.value) fromOng.value = false

  // Buscar instituições
  try {
    console.log('🎯 Buscando instituições...')

    const result = await instituicoesService.getInstituicoes()

    console.log('🎯 Instituições recebidas:', result)
    console.log('🎯 Quantidade:', result?.length)

    ongs.value = result || []

    console.log('🎯 ongs.value atualizado:', ongs.value.length)

  } catch (err) {
    console.error('❌ Erro ao buscar instituições:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

// Computed reativo
const availableInstitutions = computed(() => {
  console.log('🎯 Computed executando. ongs.value.length:', ongs.value.length)

  if (!ongs.value || ongs.value.length === 0) {
    console.log('⚠️ ongs.value está vazio')
    return []
  }

  const filtered = ongs.value
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

  console.log('🎯 availableInstitutions resultado:', filtered.length)
  return filtered
})

const text = "Instituições Disponíveis"
const wordtext = computed(() => text.split(' '))
</script>

<template>
  <main>
    <!-- Banner -->
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

        <!-- Estados de carregamento -->
        <div v-if="isLoading" class="loading-state">
          <p>Carregando instituições...</p>
        </div>

        <div v-else-if="error" class="error-state">
          <p>Erro ao carregar instituições: {{ error }}</p>
          <button @click="window.location.reload()">Tentar novamente</button>
        </div>

        <div v-else-if="availableInstitutions.length === 0" class="empty-state">
          <p>Nenhuma instituição encontrada.</p>
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
