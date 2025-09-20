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

// Buscar ONG específica
onMounted(async () => {
  const ongId = route.params.id
  console.log('🎯 Buscando ONG com ID:', ongId)

  try {
    // Buscar a ONG específica
    const foundOng = await instituicoesService.getByIdentificador(ongId)

    if (!foundOng) {
      throw new Error('ONG não encontrada')
    }

    console.log('✅ ONG encontrada:', foundOng)
    ong.value = foundOng

    // Verificar status de favorito
    await checkFavoriteStatus()

  } catch (err) {
    console.error('❌ Erro ao buscar ONG:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

const checkFavoriteStatus = async () => {
  try {
    const token = localStorage.getItem("access_token")
    if (!token || !ong.value) return

    // ✅ Buscar favoritos do usuário logado
    const response = await api.get("/favoritos/")

    console.log('📋 Favoritos do usuário:', response.data)
    console.log('🆔 Procurando por api_id:', ong.value.api_id)

    // Buscar favorito usando o ID numérico da API
    const favorito = response.data.find(fav => {
      console.log('🔍 Comparando:', fav.instituicao, 'com', ong.value.api_id)
      return fav.instituicao.toString() === ong.value.api_id?.toString()
    })

    if (favorito) {
      isFavorited.value = true
      favoritoId.value = favorito.id
      console.log('✅ ONG está favoritada:', favorito)
    } else {
      console.log('❌ ONG não está favoritada')
    }
  } catch (error) {
    console.error("❌ Erro ao verificar favoritos:", error)
  }
}
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
      // Remove dos favoritos
      await api.delete(`/favoritos/${favoritoId.value}/`)
      isFavorited.value = false
      favoritoId.value = null

      Swal.fire({
        icon: 'info',
        title: 'Removido dos favoritos',
        timer: 1500,
        showConfirmButton: false
      })
    } else {
      // ✅ 1. BUSCAR DADOS DO USUÁRIO LOGADO
      const perfilResponse = await api.get("/perfil/")
      const usuario = perfilResponse.data

      console.log('👤 Usuário logado:', usuario)

      // ✅ 2. VERIFICAR api_id da instituição
      const apiId = ong.value.api_id

      console.log('🏢 ONG:', ong.value)
      console.log('🆔 API ID:', apiId)

      if (!apiId) {
        throw new Error("ID da instituição não encontrado")
      }

      // ✅ 3. CRIAR FAVORITO COM USUÁRIO
      const favoritoData = {
        usuario: usuario.id,    // ← ADICIONAR o ID do usuário
        instituicao: apiId
      }

      console.log('📤 Dados do favorito:', favoritoData)

      const response = await api.post("/favoritos/", favoritoData)

      console.log('✅ Favorito criado:', response.data)

      isFavorited.value = true
      favoritoId.value = response.data.id

      Swal.fire({
        icon: 'success',
        title: 'Adicionado aos favoritos',
        timer: 1500,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error("❌ Erro ao alterar favorito:", error)

    let errorMessage = 'Erro ao alterar favorito'

    if (error.response?.data) {
      const errorData = error.response.data
      console.log('📋 Detalhes do erro favorito:', errorData)

      if (typeof errorData === 'string') {
        errorMessage = errorData
      } else if (errorData.detail) {
        errorMessage = errorData.detail
      } else if (errorData.non_field_errors) {
        errorMessage = errorData.non_field_errors.join(', ')
      } else {
        // Erros de campo específicos
        const fieldErrors = Object.entries(errorData)
          .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
          .join('; ')
        if (fieldErrors) {
          errorMessage = fieldErrors
        }
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: errorMessage,
      footer: 'Verifique se você está logado e tente novamente'
    })
  } finally {
    isLoadingFavorite.value = false
  }
}
// Sistema de modal
const abrirModal = () => modalAberto.value = true
const fecharModal = () => modalAberto.value = false

// Sistema de navegação
const voltar = () => {
  fromOng.value = true
  sair.value = true
}

const onExitComplete = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ path: '/', query: { fromOng: true } })
  }
}
</script>

<template>
  <AnimatePresence @exitComplete="onExitComplete">
    <motion.div v-if="!sair" class="pagina-wrapper" :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }" :exit="{ opacity: 0, scale: 0.8 }"
      :transition="{ duration: 0.25, ease: 'easeInOut' }">

      <!-- Loading -->
      <div v-if="isLoading" class="loading-container">
        <img @click="voltar" class="botao-voltar" src="/icons/voltar.png" alt="Voltar" />
        <div class="loading-content">
          <p>Carregando instituição...</p>
        </div>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="error-container">
        <img @click="voltar" class="botao-voltar" src="/icons/voltar.png" alt="Voltar" />
        <div class="error-content">
          <h2>Ops! Algo deu errado</h2>
          <p>{{ error }}</p>
          <button @click="$router.back()" class="btn-voltar">Voltar</button>
        </div>
      </div>

      <!-- ONG encontrada -->
      <div class="pagina-instituicao" v-if="ong">
        <img @click="voltar" class="botao-voltar" src="/icons/voltar.png" alt="Voltar" />

        <div class="container-instituicao">
          <div class="logo-container">
            <img :src="ong.img" :alt="ong.title" class="logo-instituicao" />
          </div>

          <div class="info-instituicao">
            <h1>{{ ong.title }}</h1>

            <div class="detalhes-instituicao">
              <p><strong>Filtros:</strong> {{ ong.filtros.join(', ') }}</p>
              <p><strong>Contato:</strong> {{ ong.telefone }}</p>
              <p><strong>Endereço:</strong> {{ ong.local || ong.endereco_resumo || ong.endereco_completo || 'Endereço não informado'}}</p>
              <p><strong>Horário de funcionamento:</strong> {{ ong.horario }}</p>
            </div>

            <div class="descricao-instituicao">
              <p>{{ ong.description }}</p>
            </div>

            <div class="botao-container">
              <button class="botao-doar" @click="abrirModal">Doar Agora</button>
              <img @click="toggleFavorite"
                :src="isFavorited ? '/icons/heart-solid-full.svg' : '/icons/heart-light-full.svg'" alt="favoritar"
                class="button-heart" />
            </div>

            <!-- Modal com animações -->
            <AnimatePresence>
              <template v-if="modalAberto">
                <motion.div key="backdrop" class="modal-backdrop" :initial="{ opacity: 0 }" :animate="{ opacity: 0.5 }"
                  :exit="{ opacity: 0 }" :transition="{ duration: 0.3 }" />
                <motion.div key="payment-modal" class="modal-container" :initial="{ opacity: 0, scale: 0.8 }"
                  :animate="{ opacity: 1, scale: 1 }" :exit="{ opacity: 0, scale: 0.8 }"
                  :transition="{ duration: 0.25, ease: 'easeOut' }">
                  <PaymentComponent :ong="ong" :show="modalAberto" @fechar="fecharModal" />
                </motion.div>
              </template>
            </AnimatePresence>

          </div>
        </div>
      </div>

      <div v-else>
        <p>ONG não encontrada.</p>
      </div>
    </motion.div>
  </AnimatePresence>
</template>

<style scoped>
/* Layout da página */
.pagina-wrapper {
  width: 100%;
  min-height: 100vh;
}

/* Fundo escuro do modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: black;
  z-index: 900;
}

/* Container centralizado do modal */
.modal-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.pagina-instituicao {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.botao-voltar {
  background: none;
  border: none;
  color: #1a1a2e;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.botao-voltar:hover {
  transform: translateY(-5px);
}

.container-instituicao {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.logo-container {
  flex: 1;
  max-width: 300px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.logo-instituicao {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 8px;
}

.info-instituicao {
  flex: 2;
  padding: 2rem;
}

h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.detalhes-instituicao {
  margin-bottom: 1.5rem;
}

.detalhes-instituicao p {
  margin: 0.4rem 0;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4;
}

.detalhes-instituicao strong {
  color: #333;
}

.descricao-instituicao {
  margin: 1.5rem 0 2rem 0;
  line-height: 1.6;
}

.descricao-instituicao p {
  color: #666;
  font-size: 0.95rem;
  text-align: justify;
}

.botao-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.botao-doar {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.botao-doar:hover {
  background-color: #3367d6;
}

.button-heart {
  width: 40px;
  margin-left: 15px;
  cursor: pointer;
  transition: transform 0.3s ease-in;
}

.button-heart:hover {
  transform: scale(1.2);
}

@media (max-width: 480px) {
  .container-instituicao {
    display: block;
  }

  .logo-container {
    max-width: 500px;
  }

  .botao-doar {
    width: 100%;
  }

  .botao-container {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .button-heart {
    margin-left: 0;
    align-self: center;
  }
}
</style>
