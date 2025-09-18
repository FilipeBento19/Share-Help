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

/* RESPONSIVIDADE PARA A CAIXINHA DE AGRADECIMENTO */
@media (max-width: 480px) {
  .thank-you-box {
    padding: 32px 24px;
    max-width: 280px;
  }
  
  .thank-you-icon {
    width: 56px;
    height: 56px;
  }
  
  .thank-you-icon svg {
    width: 40px;
    height: 40px;
  }
  
  .thank-you-box h3 {
    font-size: 18px;
  }
  
  .thank-you-box p {
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .thank-you-box {
    padding: 28px 20px;
    max-width: 260px;
  }
  
  .thank-you-icon {
    width: 48px;
    height: 48px;
  }
  
  .thank-you-icon svg {
    width: 32px;
    height: 32px;
  }
  
  .thank-you-box h3 {
    font-size: 16px;
  }
  
  .thank-you-box p {
    font-size: 12px;
  }
}

/* ===== RESPONSIVIDADE - APENAS DIMINUINDO PROPORCIONALMENTE ===== */

/* Tablets grandes */
@media (max-width: 1024px) {
  .overlay {
    padding: 16px;
  }
  
  .divprimary {
    max-width: 800px;
    padding: 18px;
    border-radius: 10px;
  }
  
  .header {
    top: 18px;
    left: 18px;
    margin-bottom: 28px;
  }
  
  .content-wrapper {
    gap: 26px;
    padding-top: 54px;
    min-height: 360px;
  }
  
  .valor h1 {
    font-size: 22px;
    margin-bottom: 20px;
  }
  
  .value-grid {
    gap: 14px;
    margin-bottom: 18px;
  }
  
  .value-button {
    padding: 18px;
    font-size: 16px;
    border-radius: 10px;
  }
  
  .custom-value {
    margin-bottom: 28px;
  }
  
  .custom-input {
    padding: 18px;
    font-size: 15px;
    border-radius: 10px;
  }
  
  .donation-type {
    margin-bottom: 36px;
  }
  
  .donation-type h3 {
    font-size: 15px;
    margin-bottom: 14px;
  }
  
  .radio-group {
    gap: 20px;
  }
  
  .radio-label {
    font-size: 15px;
  }
  
  .form h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .payment-options {
    gap: 10px;
    margin-bottom: 28px;
  }
  
  .payment-option {
    padding: 14px 18px;
    border-radius: 10px;
  }
  
  .payment-icon {
    width: 28px;
    height: 28px;
    margin-right: 14px;
  }
  
  .payment-name {
    font-size: 15px;
  }
  
  .payment-desc {
    font-size: 13px;
  }
  
  .finalize-button {
    padding: 14px 20px;
    font-size: 15px;
    border-radius: 10px;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .overlay {
    padding: 12px;
  }
  
  .divprimary {
    max-width: 700px;
    padding: 16px;
    border-radius: 8px;
  }
  
  .header {
    top: 16px;
    left: 16px;
    margin-bottom: 24px;
  }
  
  .back-button {
    padding: 6px;
  }
  
  .back-button svg {
    width: 20px;
    height: 20px;
  }
  
  .content-wrapper {
    gap: 22px;
    padding-top: 48px;
    min-height: 320px;
  }
  
  .valor h1 {
    font-size: 20px;
    margin-bottom: 18px;
  }
  
  .value-grid {
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .value-button {
    padding: 16px;
    font-size: 15px;
    border-radius: 8px;
  }
  
  .custom-value {
    margin-bottom: 24px;
  }
  
  .custom-input {
    padding: 16px;
    font-size: 14px;
    border-radius: 8px;
  }
  
  .donation-type {
    margin-bottom: 32px;
  }
  
  .donation-type h3 {
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .radio-group {
    gap: 18px;
  }
  
  .radio-option input[type="radio"] {
    transform: scale(1.1);
    margin-right: 6px;
  }
  
  .radio-label {
    font-size: 14px;
  }
  
  .form h2 {
    font-size: 16px;
    margin-bottom: 18px;
  }
  
  .payment-options {
    gap: 8px;
    margin-bottom: 24px;
  }
  
  .payment-option {
    padding: 12px 16px;
    border-radius: 8px;
  }
  
  .payment-icon {
    width: 26px;
    height: 26px;
    margin-right: 12px;
  }
  
  .payment-name {
    font-size: 14px;
    margin-bottom: 2px;
  }
  
  .payment-desc {
    font-size: 12px;
  }
  
  .radio-indicator {
    width: 18px;
    height: 18px;
  }
  
  .radio-indicator.active::after {
    width: 8px;
    height: 8px;
  }
  
  .finalize-button {
    padding: 12px 18px;
    font-size: 14px;
    border-radius: 8px;
    gap: 6px;
  }
  
  .finalize-button svg {
    width: 18px;
    height: 18px;
  }
}

/* Smartphones grandes */
@media (max-width: 640px) {
  .overlay {
    padding: 10px;
  }
  
  .divprimary {
    max-width: 600px;
    padding: 14px;
  }
  
  .header {
    top: 14px;
    left: 14px;
  }
  
  .content-wrapper {
    gap: 18px;
    padding-top: 42px;
    min-height: 280px;
  }
  
  .valor h1 {
    font-size: 18px;
    margin-bottom: 16px;
  }
  
  .value-grid {
    gap: 10px;
    margin-bottom: 14px;
  }
  
  .value-button {
    padding: 14px;
    font-size: 14px;
  }
  
  .custom-value {
    margin-bottom: 20px;
  }
  
  .custom-input {
    padding: 14px;
    font-size: 13px;
  }
  
  .donation-type {
    margin-bottom: 28px;
  }
  
  .donation-type h3 {
    font-size: 13px;
    margin-bottom: 10px;
  }
  
  .radio-group {
    gap: 16px;
  }
  
  .radio-label {
    font-size: 13px;
  }
  
  .form h2 {
    font-size: 15px;
    margin-bottom: 16px;
  }
  
  .payment-options {
    gap: 6px;
    margin-bottom: 20px;
  }
  
  .payment-option {
    padding: 10px 14px;
  }
    <script setup>
  import { ref } from 'vue'

  const props = defineProps({
    ong: {
      type: Object,
      required: true
    }
  })

  const showModal = ref(false)
  const selectedValue = ref('')
  const customValue = ref('')
  const donationType = ref('unica')
  const selectedPayment = ref('')
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
      ongId: props.ongId,
      ongNome: props.ong.title,
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

    showModal.value = false
  }

  defineExpose({ showModal })
</script>

  <template>
    <div v-if="showModal" class="overlay">
      <div class="divprimary">
        <div class="header">
          <button class="back-button" @click="showModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <h2>Doando para: {{ ong?.title }}</h2>
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
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
}

.open-button {
  background: #4285F4;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.open-button:hover {
  background: #3367D6;
}

.divprimary {
  width: 90%;
  max-width: 900px;
  height: auto;
  min-height: 500px;
  background: linear-gradient(180deg, #E8E7FF 0%, #F8F9FA 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border-radius: 12px;
  margin: 20px auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  /* Space for the header */
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
  content: '';  <script setup>
  import { ref } from 'vue'

  const props = defineProps({
    ong: {
      type: Object,
      required: true
    }
  })

  const showModal = ref(false)
  const selectedValue = ref('')
  const customValue = ref('')
  const donationType = ref('unica')
  const selectedPayment = ref('')
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
      ongId: props.ongId,
      ongNome: props.ong.title,
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

    showModal.value = false
  }

  defineExpose({ showModal })
</script>

  <template>
    <div v-if="showModal" class="overlay">
      <div class="divprimary">
        <div class="header">
          <button class="back-button" @click="showModal = false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <h2>Doando para: {{ ong?.title }}</h2>
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
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
}

.open-button {
  background: #4285F4;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.open-button:hover {
  background: #3367D6;
}

.divprimary {
  width: 90%;
  max-width: 900px;
  height: auto;
  min-height: 500px;
  background: linear-gradient(180deg, #E8E7FF 0%, #F8F9FA 100%);
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  border-radius: 12px;
  margin: 20px auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  /* Space for the header */
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
</style>

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
</style>

  .payment-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  
  .payment-name {
    font-size: 13px;
  }
  
  .payment-desc {
    font-size: 11px;
  }
  
  .radio-indicator {
    width: 16px;
    height: 16px;
  }
  
  .radio-indicator.active::after {
    width: 6px;
    height: 6px;
  }
  
  .finalize-button {
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .finalize-button svg {
    width: 16px;
    height: 16px;
  }
}

/* Smartphones */
@media (max-width: 480px) {
  .overlay {
    padding: 8px;
  }
  
  .divprimary {
    max-width: 500px;
    padding: 12px;
  }
  
  .header {
    top: 12px;
    left: 12px;
  }
  
  .content-wrapper {
    gap: 14px;
    padding-top: 36px;
    min-height: 240px;
  }
  
  .valor h1 {
    font-size: 16px;
    margin-bottom: 14px;
  }
  
  .value-grid {
    gap: 8px;
    margin-bottom: 12px;
  }
  
  .value-button {
    padding: 12px;
    font-size: 13px;
  }
  
  .custom-value {
    margin-bottom: 16px;
  }
  
  .custom-input {
    padding: 12px;
    font-size: 12px;
  }
  
  .donation-type {
    margin-bottom: 24px;
  }
  
  .donation-type h3 {
    font-size: 12px;
    margin-bottom: 8px;
  }
  
  .radio-group {
    gap: 14px;
  }
  
  .radio-option input[type="radio"] {
    transform: scale(1);
    margin-right: 4px;
  }
  
  .radio-label {
    font-size: 12px;
  }
  
  .form h2 {
    font-size: 14px;
    margin-bottom: 14px;
  }
  
  .payment-options {
    gap: 4px;
    margin-bottom: 16px;
  }
  
  .payment-option {
    padding: 8px 12px;
  }
  
  .payment-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  
  .payment-name {
    font-size: 12px;
  }
  
  .payment-desc {
    font-size: 10px;
  }
  
  .radio-indicator {
    width: 14px;
    height: 14px;
  }
  
  .radio-indicator.active::after {
    width: 4px;
    height: 4px;
  }
  
  .finalize-button {
    padding: 8px 14px;
    font-size: 12px;
  }
  
  .finalize-button svg {
    width: 14px;
    height: 14px;
  }

  .msgzinha {
    padding-top: 4px;
    font-size: 0.7rem;
    color: #818181;
  }
}

/* Smartphones pequenos */
@media (max-width: 360px) {
  .overlay {
    padding: 6px;
  }
  
  .divprimary {
    max-width: 400px;
    padding: 10px;
  }
  
  .header {
    top: 10px;
    left: 10px;
  }
  
  .back-button {
    padding: 4px;
  }
  
  .back-button svg {
    width: 16px;
    height: 16px;
  }
  
  .content-wrapper {
    gap: 12px;
    padding-top: 32px;
    min-height: 200px;
  }
  
  .valor h1 {
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .value-grid {
    gap: 6px;
    margin-bottom: 10px;
  }
  
  .value-button {
    padding: 10px;
    font-size: 12px;
  }
  
  .custom-value {
    margin-bottom: 14px;
  }
  
  .custom-input {
    padding: 10px;
    font-size: 11px;
  }
  
  .donation-type {
    margin-bottom: 20px;
  }
  
  .donation-type h3 {
    font-size: 11px;
    margin-bottom: 6px;
  }
  
  .radio-group {
    gap: 12px;
  }
  
  .radio-label {
    font-size: 11px;
  }
  
  .form h2 {
    font-size: 13px;
    margin-bottom: 12px;
  }
  
  .payment-options {
    gap: 3px;
    margin-bottom: 14px;
  }
  
  .payment-option {
    padding: 6px 10px;
  }
  
  .payment-icon {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }
  
  .payment-name {
    font-size: 11px;
  }
  
  .payment-desc {
    font-size: 9px;
  }
  
  .radio-indicator {
    width: 12px;
    height: 12px;
  }
  
  .finalize-button {
    padding: 6px 12px;
    font-size: 11px;
  }
  
  .finalize-button svg {
    width: 12px;
    height: 12px;
  }
}
</style>