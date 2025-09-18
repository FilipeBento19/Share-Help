<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import ongs from '@/data/ongsData'
import PaymentComponent from '@/components/PaymentComponent.vue'
import { fromOng } from '@/data/globalState'

const modalAberto = ref(false)
const abrirModal = () => modalAberto.value = true
const fecharModal = () => modalAberto.value = false

const sair = ref(false)
const router = useRouter()
const route = useRoute()

const ongId = route.params.id
const ong = ongs.find(o => o.id === ongId)


const voltar = () => {
  fromOng.value = true
  sair.value = true // dispara animação
}

const onExitComplete = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    // fallback
    router.push({ path: '/', query: { fromOng: true } })
  }
}
</script>

<template>
  <AnimatePresence @exitComplete="onExitComplete">
    <motion.div
      v-if="!sair"
      class="pagina-wrapper"
      :initial="{ opacity: 0, scale: 0.95 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.8 }"
      :transition="{ duration: 0.25, ease: 'easeInOut' }"
    >
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
              <p><strong>Endereço:</strong> {{ ong.local }}</p>
              <p><strong>Horário de funcionamento:</strong> {{ ong.horario }}</p>
            </div>

            <div class="descricao-instituicao">
              <p>{{ ong.description }}</p>
            </div>

            <div class="botao-container">
              <button class="botao-doar" @click="abrirModal">Doar Agora</button>
            </div>

            <!-- Modal -->
            <AnimatePresence>
              <template v-if="modalAberto">
                <motion.div
                  key="backdrop"
                  class="modal-backdrop"
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 0.5 }"
                  :exit="{ opacity: 0 }"
                  :transition="{ duration: 0.3 }"
                />
                <motion.div
                  key="payment-modal"
                  class="modal-container"
                  :initial="{ opacity: 0, scale: 0.8 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :exit="{ opacity: 0, scale: 0.8 }"
                  :transition="{ duration: 0.25, ease: 'easeOut' }"
                >
                  <PaymentComponent :show="modalAberto" @fechar="fecharModal"/>
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

@media (max-width: 480px) {
  .container-instituicao{
    display: block;
  }

  .logo-container{
    max-width: 500px;
  }

  .botao-doar{
    width: 100%;
  }
}

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
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
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

</style>
