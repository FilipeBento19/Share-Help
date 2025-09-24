<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { instituicoesService } from '@/services/apiServices'
import PaymentComponent from '@/components/PaymentComponent.vue'
import { fromOng } from '@/data/globalState'
import api from '@/config/api.js'
import Swal from 'sweetalert2'

const modalAberto = ref(false)
const sair = ref(false)
const router = useRouter()
const route = useRoute()

// Estado reativo
const ong = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Sistema de favoritos
const isFavorited = ref(false)
const favoritoId = ref(null)
const isLoadingFavorite = ref(false)

// Formatação de texto
const formatarDescricao = (texto) => {
  if (!texto) return ''
  return texto.split('.').map(p => p.trim()).filter(p => p.length > 0).map(p => `${p}.`).join('\n\n')
}

// Categoria display
const getCategoriaDisplay = (categoria) => {
  const categorias = {
    'criancas': 'Crianças',
    'idosos': 'Idosos',
    'moradores-de-rua': 'Moradores de Rua',
    'animais': 'Animais',
    'meio-ambiente': 'Meio Ambiente',
    'saude': 'Saúde',
    'educacao': 'Educação',
    'geral': 'Geral'
  }
  return categorias[categoria] || categoria
}

// Buscar ONG
onMounted(async () => {
  try {
    const foundOng = await instituicoesService.getByIdentificador(route.params.id)
    if (!foundOng) throw new Error('ONG não encontrada')
    
    ong.value = foundOng
    await checkFavoriteStatus()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

// Verificar favorito
const checkFavoriteStatus = async () => {
  try {
    const token = localStorage.getItem("access_token")
    if (!token || !ong.value) return

    const response = await api.get("/favoritos/")
    const favorito = response.data.find(fav => 
      fav.instituicao.toString() === ong.value.api_id?.toString()
    )

    if (favorito) {
      isFavorited.value = true
      favoritoId.value = favorito.id
    }
  } catch (error) {
    console.error("Erro ao verificar favoritos:", error)
  }
}

// Toggle favorito
const toggleFavorite = async () => {
  const token = localStorage.getItem("access_token")
  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Login necessário',
      text: 'Faça login para favoritar instituições'
    })
    return
  }

  if (!ong.value || isLoadingFavorite.value) return
  isLoadingFavorite.value = true

  try {
    if (isFavorited.value && favoritoId.value) {
      await api.delete(`/favoritos/${favoritoId.value}/`)
      isFavorited.value = false
      favoritoId.value = null
      Swal.fire({ icon: 'info', title: 'Removido dos favoritos', timer: 1500, showConfirmButton: false })
    } else {
      const perfilResponse = await api.get("/perfil/")
      const usuario = perfilResponse.data
      
      if (!ong.value.api_id) throw new Error("ID da instituição não encontrado")

      const response = await api.post("/favoritos/", {
        usuario: usuario.id,
        instituicao: ong.value.api_id
      })

      isFavorited.value = true
      favoritoId.value = response.data.id
      Swal.fire({ icon: 'success', title: 'Adicionado aos favoritos', timer: 1500, showConfirmButton: false })
    }
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Erro ao alterar favorito' })
  } finally {
    isLoadingFavorite.value = false
  }
}

// Modal e navegação
const abrirModal = () => modalAberto.value = true
const fecharModal = () => modalAberto.value = false
const voltar = () => {
  fromOng.value = true
  sair.value = true
}

const onExitComplete = () => {
  window.history.length > 1 ? router.back() : router.push({ path: '/', query: { fromOng: true } })
}

onMounted(async () => {
  try {
    const foundOng = await instituicoesService.getByIdentificador(route.params.id)
    if (!foundOng) throw new Error('ONG não encontrada')
    
    ong.value = foundOng
    console.log('Dados da ONG:', foundOng) // <- Adicione isto
    console.log('descricao_curta:', foundOng.descricao_curta) // <- E isto
    
    await checkFavoriteStatus()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <AnimatePresence @exitComplete="onExitComplete">
    <motion.div v-if="!sair" class="pagina-wrapper" 
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }" 
      :exit="{ opacity: 0, scale: 0.8 }"
      :transition="{ duration: 0.25, ease: 'easeInOut' }">

      <!-- Loading -->
      <div v-if="isLoading" class="estado-container">
        <img @click="voltar" class="botao-voltar" src="/icons/voltar.png" alt="Voltar" />
        <div class="estado-content">
          <p>Carregando instituição...</p>
        </div>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="estado-container">
        <img @click="voltar" class="botao-voltar" src="/icons/voltar.png" alt="Voltar" />
        <div class="estado-content">
          <h2>Ops! Algo deu errado</h2>
          <p>{{ error }}</p>
          <button @click="$router.back()" class="btn-voltar">Voltar</button>
        </div>
      </div>

      <!-- ONG encontrada -->
      <div v-else-if="ong" class="pagina-instituicao">
        <img @click="voltar" class="botao-voltar" src="/icons/voltar.png" alt="Voltar" />

        <div class="container-principal">
          <!-- Lado esquerdo: Logo e descrição -->
          <div class="lado-esquerdo">
            <div class="logo-section">
              <img :src="ong.img || ong.logo" :alt="ong.title || ong.nome" class="logo-instituicao" />
            </div>
            
            <div class="descricao-section">
              <h3>Sobre a Instituição</h3>
              <div class="texto-formatado">{{ formatarDescricao(ong.descricao || ong.description) }}</div>
            </div>
          </div>

          <!-- Lado direito: Informações principais -->
          <div class="lado-direito">
            <!-- Card principal -->
            <div class="card-principal">
              <div class="categoria-tag" :class="ong.categoria">
                {{ getCategoriaDisplay(ong.categoria) }}
              </div>

              <h1 class="nome-ong">{{ ong.title || ong.nome }}</h1>

              <div class="descricao-curta">
                <p>{{ ong.descricao_curta }}</p>
              </div>

              <div class="acoes">
                <button class="botao-doar" @click="abrirModal">Fazer Doação</button>
                <img @click="toggleFavorite"
                  :src="isFavorited ? '/icons/heart-solid-full.svg' : '/icons/heart-light-full.svg'" 
                  alt="favoritar" class="button-heart" />
              </div>

              <div class="aviso">
                <p>* Sua doação será feita através da plataforma da Benfeitoria, parceira do ParaQuemDoar.</p>
              </div>
            </div>

            <!-- Card informações -->
            <div class="card-info">
              <div class="info-item">
                <strong>Doações Aceitas</strong>
                <div class="filtros">
                  <span v-for="filtro in (ong.filtros || [])" :key="filtro" class="filtro-tag">
                    {{ filtro }}
                  </span>
                </div>
              </div>

              <div class="info-item">
                <strong>Contato</strong>
                <span>{{ ong.telefone }}</span>
              </div>

              <div class="info-item">
                <strong>Endereço</strong>
                <span>{{ ong.endereco_completo || 'Não informado' }}</span>
              </div>

              <div class="info-item">
                <strong>Funcionamento</strong>
                <span>{{ ong.horario || ong.horario_funcionamento }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>

  <!-- Modal de pagamento -->
  <AnimatePresence>
    <template v-if="modalAberto">
      <motion.div key="backdrop" class="modal-backdrop" 
        :initial="{ opacity: 0 }" :animate="{ opacity: 0.5 }" :exit="{ opacity: 0 }" />
      
      <motion.div key="payment-modal" class="modal-container" 
        :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }" 
        :exit="{ opacity: 0, scale: 0.8 }">
        <PaymentComponent :ong="ong" :show="modalAberto" @fechar="fecharModal" />
      </motion.div>
    </template>
  </AnimatePresence>
</template>
<style scoped>
.pagina-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.pagina-instituicao {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.botao-voltar {
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.botao-voltar:hover {
  transform: translateY(-5px);
}

.container-principal {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  margin-top: 1rem;
}

/* Lado esquerdo */
.lado-esquerdo {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.logo-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
}

.logo-instituicao {
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
}

.descricao-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.descricao-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.texto-formatado {
  white-space: pre-line;
  line-height: 1.7;
  color: #444;
  text-align: justify;
}

/* Lado direito */
.lado-direito {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-principal, .card-info {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.card-info {
  position: sticky;
  top: 2rem;
}

/* Categoria */
.categoria-tag {
  display: inline-block;
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.categoria-tag.criancas { background: #fff3e0; color: #f57c00; }
.categoria-tag.idosos { background: #f3e5f5; color: #7b1fa2; }
.categoria-tag.moradores-de-rua { background: #e8f5e8; color: #388e3c; }

/* Título e descrição */
.nome-ong {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.descricao-curta p {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

/* Ações */
.acoes {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.botao-doar {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  flex: 1;
}

.botao-doar:hover {
  background-color: #3367d6;
  transform: translateY(-2px);
}

.button-heart {
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.button-heart:hover {
  transform: scale(1.2);
}

/* Aviso */
.aviso p {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  margin: 0;
}

/* Informações */
.info-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.info-item strong {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.filtro-tag {
  background: #e8f5e8;
  color: #2e7d32;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

/* Estados de loading/erro */
.estado-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.estado-content {
  text-align: center;
}

.estado-content h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.btn-voltar {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: black;
  z-index: 900;
}

.modal-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Responsividade */
@media (max-width: 768px) {
  .container-principal {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .nome-ong {
    font-size: 1.8rem;
  }

  .acoes {
    flex-direction: column;
    align-items: stretch;
  }

  .button-heart {
    align-self: center;
  }

  .card-info {
    position: static;
  }
}

@media (max-width: 480px) {
  .pagina-instituicao {
    padding: 0.5rem;
  }

  .logo-section, .descricao-section, .card-principal, .card-info {
    padding: 1rem;
  }

  .nome-ong {
    font-size: 1.5rem;
  }

  .filtros {
    gap: 4px;
  }

  .filtro-tag {
    font-size: 11px;
  }
}
</style>