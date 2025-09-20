<script setup>
import { ref } from 'vue'

const props = defineProps({
  ong: {
    type: Object,
    required: true
  },
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['fechar'])

const showModal = ref(false)
const selectedValue = ref('')
const customValue = ref('')
const donationType = ref('unica')
const selectedPayment = ref('')
const showThankYou = ref(false)
const predefinedValues = [25, 50, 100, 200]

const selectValue = (value) => {
  selectedValue.value = value
  customValue.value = ''
}

const selectCustomValue = () => {
  selectedValue.value = 'custom'
}

const selectPayment = (method) => {
  selectedPayment.value = method
}

const finalizeDonation = () => {
  const amount = selectedValue.value === 'custom' ? Number(customValue.value) : Number(selectedValue.value)

  const donation = {
    ongId: props.ong?.id,
    ongNome: props.ong?.title,
    tipo: donationType.value,
    valor: amount,
    pagamento: selectedPayment.value,
    data: new Date().toISOString()
  }

  // Salva no localStorage
  let saved = JSON.parse(localStorage.getItem('doacoes') || '[]')
  saved.push(donation)
  localStorage.setItem('doacoes', JSON.stringify(saved))

  console.log('✅ Doação registrada:', donation)

  // Mostrar mensagem de agradecimento
  showThankYou.value = true

  // Fechar automaticamente após 3 segundos
  setTimeout(() => {
    showThankYou.value = false
    showModal.value = false
    emit('fechar')
  }, 3000)
}

const closeModal = () => {
  showModal.value = false
  emit('fechar')
}

defineExpose({ showModal })
</script>

<template>
  <div v-if="showModal || props.show" class="overlay">
    <!-- Modal principal de doação -->
    <div v-if="!showThankYou" class="divprimary">
      <div class="header">
        <button class="back-button" @click="closeModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <h2 v-if="ong?.title">Doando para: {{ ong.title }}</h2>
      </div>

      <div class="content-wrapper">
        <div class="valor">
          <h1>Escolha o valor</h1>

          <div class="value-grid">
            <button v-for="value in predefinedValues" :key="value" class="value-button"
              :class="{ active: selectedValue === value }" @click="selectValue(value)">
              R$ {{ value }}
            </button>
          </div>

          <div class="custom-value">
            <input v-model="customValue" @focus="selectCustomValue" type="number" placeholder="Outro valor"
              class="custom-input" />
          </div>

          <div class="donation-type">
            <h3>Tipo de doação</h3>
            <div class="radio-group">
              <label class="radio-option">
                <input v-model="donationType" type="radio" value="unica" />
                <span class="radio-label">Única</span>
              </label>
              <label class="radio-option">
                <input v-model="donationType" type="radio" value="mensal" />
                <span class="radio-label">Mensal</span>
              </label>
            </div>
          </div>
        </div>

        <div class="form">
          <h2>Forma de pagamento</h2>

          <div class="payment-options">
            <button class="payment-option" :class="{ active: selectedPayment === 'pix' }"
              @click="selectPayment('pix')">
              <div class="payment-icon"><img src="/icons/pix.png" alt=""></div>
              <div class="payment-info">
                <div class="payment-name">PIX</div>
                <div class="payment-desc">Instantâneo e seguro</div>
              </div>
              <div class="radio-indicator" :class="{ active: selectedPayment === 'pix' }"></div>
            </button>

            <button class="payment-option" :class="{ active: selectedPayment === 'card' }"
              @click="selectPayment('card')">
              <div class="payment-icon"><img src="/icons/cartao.png" alt=""></div>
              <div class="payment-info">
                <div class="payment-name">Cartão de Crédito</div>
                <div class="payment-desc">Visa, Mastercard, Elo</div>
              </div>
              <div class="radio-indicator" :class="{ active: selectedPayment === 'card' }"></div>
            </button>

            <button class="payment-option" :class="{ active: selectedPayment === 'transfer' }"
              @click="selectPayment('transfer')">
              <div class="payment-icon"><img src="/icons/debito.png" alt=""></div>
              <div class="payment-info">
                <div class="payment-name">Débito Online</div>
                <div class="payment-desc">Transferência bancária</div>
              </div>
              <div class="radio-indicator" :class="{ active: selectedPayment === 'transfer' }"></div>
            </button>
          </div>

          <button class="finalize-button" @click="finalizeDonation" :disabled="!selectedValue || !selectedPayment">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill="currentColor" />
            </svg>
            Finalizar Doação
          </button>
        </div>
      </div>

      <p class="msgzinha">doações efetuadas sem conta serão consideradas anônimas</p>
    </div>

    <!-- Mini caixinha de agradecimento -->
    <div v-if="showThankYou" class="thank-you-box">
      <div class="thank-you-content">
        <div class="thank-you-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Obrigado pela sua doação!</h3>
        <p>Sua contribuição faz a diferença</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* FUNDO ESCURECIDO */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

/* MINI CAIXINHA DE AGRADECIMENTO */
.thank-you-box {
  background: white;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: thankYouFadeIn 0.3s ease-out;
  max-width: 320px;
  width: 90%;
}

.thank-you-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.thank-you-icon {
  width: 64px;
  height: 64px;
  background: #E8F5E8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.thank-you-box h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.thank-you-box p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

@keyframes thankYouFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.divprimary {
  width: 90%;
  max-width: 900px;
  background: linear-gradient(180deg, #E8E7FF 0%, #F8F9FA 100%);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.content-wrapper {
  display: flex;
  gap: 30px;
  padding-top: 60px;
  min-height: 400px;
}

.valor {
  flex: 1;
}

.form {
  flex: 1;
}

.back-button {
  background: none;
  border: none;
  padding: 8px;
  margin-right: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.valor h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 24px 0;
}

.value-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.value-button {
  background: white;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.value-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.value-button.active {
  border-color: #4285F4;
  background: #F0F4FF;
}

.custom-value {
  margin-bottom: 32px;
}

.custom-input {
  width: 100%;
  padding: 20px;
  border: 2px solid #E1E5E9;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.custom-input:focus {
  outline: none;
  border-color: #4285F4;
}

.donation-type {
  margin-bottom: 40px;
}

.donation-type h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-option input[type="radio"] {
  margin-right: 8px;
  transform: scale(1.2);
}

.radio-label {
  font-size: 16px;
  color: #1a1a1a;
}

.form h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 24px 0;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.payment-option {
  background: white;
  border: 2px solid #E1E5E9;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  text-align: left;
}

.payment-option:hover {
  border-color: #B3C7F7;
}

.payment-option.active {
  border-color: #4285F4;
  background: #F0F4FF;
}

.payment-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  margin-right: 16px;
  flex-shrink: 0;
  padding-top: 3px;
}

.payment-info {
  flex: 1;
}

.payment-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.payment-desc {
  font-size: 14px;
  color: #666;
}

.radio-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid #E1E5E9;
  border-radius: 50%;
  position: relative;
  transition: all 0.2s;
}

.radio-indicator.active {
  border-color: #4285F4;
}

.radio-indicator.active::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #4285F4;
  border-radius: 50%;
}

.finalize-button {
  width: 100%;
  background: #4285F4;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
}

.finalize-button:hover:not(:disabled) {
  background: #3367D6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
}

.finalize-button:disabled {
  background: #E1E5E9;
  color: #999;
  cursor: not-allowed;
  transform: none;
}

.msgzinha {
  font-size: 0.8rem;
  color: #818181;
}
/* ===== RESPONSIVIDADE SIMPLIFICADA ===== */

/* Desktop padrão já definido no estilo base — mantenha como está */

/* Tablet (até 768px) */
@media (max-width: 768px) {
  .divprimary {
    max-width: 95vw;
    padding: 16px;
    border-radius: 8px;
  }

  .header {
    top: 16px;
    left: 16px;
  }

  .content-wrapper {
    flex-direction: column; /* Empilha os blocos em telas menores */
    gap: 20px;
    padding-top: 60px;
    min-height: auto;
  }

  .value-grid {
    grid-template-columns: repeat(2, 1fr); /* Mantém 2 colunas até mobile */
  }

  .payment-options {
    gap: 8px;
  }

  .payment-option,
  .value-button,
  .custom-input,
  .finalize-button {
    padding: 12px;
    font-size: 14px;
  }

  .payment-icon {
    width: 24px;
    height: 24px;
  }

  .radio-indicator {
    width: 16px;
    height: 16px;
  }

  .radio-indicator.active::after {
    width: 6px;
    height: 6px;
  }

  .msgzinha {
    font-size: 0.75rem;
  }
}

/* Mobile (até 480px) */
@media (max-width: 480px) {
  .divprimary {
    padding: 12px;
  }

  .valor h1,
  .form h2 {
    font-size: 1.25rem; /* Ou use clamp! */
  }

  .value-grid {
    grid-template-columns: 1fr; /* Uma coluna só em mobile pequeno */
    gap: 8px;
  }

  .value-button,
  .custom-input,
  .finalize-button {
    padding: 10px;
    font-size: 13px;
  }

  .payment-option {
    padding: 10px;
  }

  .payment-name {
    font-size: 13px;
  }

  .payment-desc {
    font-size: 11px;
  }

  .donation-type h3 {
    font-size: 13px;
  }

  .radio-label {
    font-size: 13px;
  }

  .back-button svg {
    width: 20px;
    height: 20px;
  }
}
</style>
