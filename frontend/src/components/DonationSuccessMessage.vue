<script setup>
import { ref, onMounted } from 'vue'
import { motion } from 'motion-v'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  valor: {
    type: Number,
    required: true
  },
  nomeOng: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['fechar'])

// Auto fechar após 4 segundos
onMounted(() => {
  if (props.show) {
    setTimeout(() => {
      emit('fechar')
    }, 4000)
  }
})

const formatarValor = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)
}

const fecharMensagem = () => {
  emit('fechar')
}
</script>

<template>
  <motion.div
    v-if="show"
    class="success-overlay"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :exit="{ opacity: 0 }"
    :transition="{ duration: 0.3 }"
    @click="fecharMensagem"
  >
    <motion.div
      class="success-card"
      :initial="{ scale: 0.5, opacity: 0, y: 50 }"
      :animate="{ scale: 1, opacity: 1, y: 0 }"
      :exit="{ scale: 0.8, opacity: 0, y: -20 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      @click.stop
    >
      <!-- Ícone de sucesso -->
      <div class="success-icon">
        <motion.svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          :initial="{ scale: 0 }"
          :animate="{ scale: 1 }"
          :transition="{ delay: 0.2, duration: 0.5, ease: 'easeOut' }"
        >
          <circle cx="12" cy="12" r="12" fill="#10b981"/>
          <motion.path
            d="m9 12 2 2 4-4"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :initial="{ pathLength: 0 }"
            :animate="{ pathLength: 1 }"
            :transition="{ delay: 0.5, duration: 0.6, ease: 'easeInOut' }"
          />
        </motion.svg>
      </div>

      <!-- Título -->
      <motion.h2
        class="success-title"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.3, duration: 0.4 }"
      >
        Doação Realizada!
      </motion.h2>

      <!-- Mensagem principal -->
      <motion.div
        class="success-message"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.4, duration: 0.4 }"
      >
        <p class="valor-doado">{{ formatarValor(valor) }}</p>
        <p class="mensagem-texto">
          foi doado com sucesso para
        </p>
        <p class="nome-ong">{{ nomeOng }}</p>
      </motion.div>

      <!-- Mensagem de agradecimento -->
      <motion.p
        class="agradecimento"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.6, duration: 0.4 }"
      >
        Muito obrigado por fazer a diferença! 💝
      </motion.p>

      <!-- Botão fechar -->
      <motion.button
        class="btn-fechar"
        @click="fecharMensagem"
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0.7, duration: 0.3 }"
      >
        Continuar
      </motion.button>

      <!-- Botão X no canto -->
      <button class="btn-x" @click="fecharMensagem">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </motion.div>
  </motion.div>
</template>

<style scoped>
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.success-card {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
}

.success-icon {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 20px 0;
}

.success-message {
  margin-bottom: 24px;
}

.valor-doado {
  font-size: 2rem;
  font-weight: 700;
  color: #10b981;
  margin: 0 0 8px 0;
}

.mensagem-texto {
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 8px 0;
}

.nome-ong {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.agradecimento {
  font-size: 0.95rem;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.4;
}

.btn-fechar {
  background: #4285f4;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-fechar:hover {
  background: #3367d6;
  transform: translateY(-1px);
}

.btn-x {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-x:hover {
  color: #6b7280;
  background: #f3f4f6;
}

/* Responsividade */
@media (max-width: 480px) {
  .success-card {
    margin: 20px;
    padding: 30px 24px;
  }
  
  .success-title {
    font-size: 1.3rem;
  }
  
  .valor-doado {
    font-size: 1.6rem;
  }
  
  .mensagem-texto {
    font-size: 0.9rem;
  }
  
  .nome-ong {
    font-size: 1rem;
  }
  
  .agradecimento {
    font-size: 0.85rem;
  }
}
</style>