<script setup>
import { computed, ref } from 'vue'
import api from '@/config/api.js'
import Swal from "sweetalert2"

// Estado
const step = ref(1)
const data = ref({
  email: '',
  name: '',
  username: '',
  password: '',
  confirmPassword: ''
})
const error = ref('')
const isLoading = ref(false)

// Computed para configurar etapas
const currentStep = computed(() => {
  const steps = {
    1: {
      title: 'Qual é o seu e-mail?',
      subtitle:
        'Sim, permite que a Share-help lhe envie informações sobre<br>pagamentos, atualizações, relatórios e outros conteúdos<br>relacionados à Share-help.',
      fields: [{ key: 'email', type: 'email', placeholder: 'E-mail' }],
      buttonText: 'Enviar código'
    },
    2: {
      title: 'Verificação de E-mail',
      subtitle: `<div class="verification-steps">
                  <div class="step-item">
                    <span class="step-number">1</span>
                    <span class="step-text">Verifique sua caixa de entrada (e spam) do email:</span>
                  </div>
                  <div class="email-highlight">${data.value.email}</div>

                  <div class="step-item">
                    <span class="step-number">2</span>
                    <span class="step-text">Abra o email da Share-help e clique no link de verificação</span>
                  </div>

                  <div class="step-item">
                    <span class="step-number">3</span>
                    <span class="step-text">Digite o código recebido abaixo</span>
                  </div>
                </div>`,
      fields: [{ key: 'codigo', type: 'text', placeholder: 'Código de verificação' }],
      showResend: true,
      buttonText: 'Verificar Código'
    },
    3: {
      title: 'Como você se chama?',
      subtitle: 'Seu nome verdadeiro não será compartilhado<br>com os outros usuários',
      fields: [
        { key: 'name', type: 'text', placeholder: 'Nome verdadeiro' },
        { key: 'username', type: 'text', placeholder: 'Nome de usuário' }
      ],
      buttonText: 'Continuar'
    },
    4: {
      title: 'Escolha uma senha',
      subtitle: 'Crie uma senha segura para sua conta',
      fields: [
        { key: 'password', type: 'password', placeholder: 'Senha' },
        { key: 'confirmPassword', type: 'password', placeholder: 'Confirmar senha' }
      ],
      showPasswordHints: true,
      buttonText: 'Finalizar cadastro'
    }
  }
  return steps[step.value] || steps[1]
})

// Atualizar campo
const updateField = (key, value) => {
  data.value[key] = value
}

// ✅ FUNÇÃO PARA TRATAR ERROS CORRETAMENTE
const tratarErro = (err) => {
  console.error('Erro completo:', err)

  let mensagemErro = 'Erro inesperado'

  if (err.response?.data) {
    const errorData = err.response.data
    console.log('Dados do erro:', errorData)

    if (errorData.error) {
      // ✅ VERIFICAR SE É ARRAY ANTES DE USAR .join()
      if (Array.isArray(errorData.error)) {
        mensagemErro = errorData.error.join(" | ")
      } else if (typeof errorData.error === 'string') {
        mensagemErro = errorData.error
      } else {
        mensagemErro = 'Erro de validação'
      }
    } else if (errorData.detail) {
      mensagemErro = errorData.detail
    } else if (errorData.message) {
      mensagemErro = errorData.message
    } else if (typeof errorData === 'string') {
      mensagemErro = errorData
    } else {
      // ✅ TRATAR ERROS DE CAMPO ESPECÍFICOS
      const fieldErrors = Object.entries(errorData)
        .map(([field, errors]) => {
          if (Array.isArray(errors)) {
            return `${field}: ${errors.join(', ')}`
          } else {
            return `${field}: ${errors}`
          }
        })
        .join('; ')

      if (fieldErrors) {
        mensagemErro = fieldErrors
      }
    }
  } else if (err.message) {
    mensagemErro = err.message
  }

  error.value = mensagemErro
}

// Fluxo
const handleNext = async () => {
  error.value = ''
  isLoading.value = true
  try {
    if (step.value === 1) {
      // Enviar código
      await api.post('/send-code/', {
        email: data.value.email
      })
      step.value = 2
    } else if (step.value === 2) {
      // Verificar código
      await api.post('/verify-code/', {
        email: data.value.email,
        codigo: data.value.codigo
      })
      step.value = 3
    } else if (step.value === 3) {
      step.value = 4
    } else if (step.value === 4) {
      // Registrar usuário
      if (data.value.password !== data.value.confirmPassword) {
        throw new Error('As senhas não coincidem')
      } else if (data.value.password.length <= 8) {
        throw new Error('A senha precisa ter mais de 8 caracteres')
      }
      await api.post('/register/', {
        email: data.value.email,
        nome: data.value.name,
        username: data.value.username,
        password: data.value.password
      })
      await Swal.fire({
        title: "Cadastro concluído!",
        text: "Sua conta foi criada com sucesso. Faça login para continuar.",
        icon: "success",
        confirmButtonText: "Fazer login",
        confirmButtonColor: "#4F46E5",
        background: "#ffffff",
        color: "#111827"
      })
      window.location.href = "/login"
      step.value = 1
      data.value = {
        email: '',
        name: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  } catch (err) {
    // ✅ USAR A FUNÇÃO DE TRATAMENTO DE ERRO
    tratarErro(err)
  } finally {
    isLoading.value = false
  }
}

const handleResend = async () => {
  try {
    await api.post('/send-code/', {
      email: data.value.email
    })
    Swal.fire({
      title: "Código reenviado!",
      text: "Verifique sua caixa de entrada",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    })
  } catch (err) {
    // ✅ USAR A FUNÇÃO DE TRATAMENTO DE ERRO
    tratarErro(err)
  }
}
</script>

<template>
  <div class="form-content register-step">
    <!-- Indicador -->
    <div class="step-indicator">
      <div class="step-dots">
        <div v-for="i in 4" :key="i" class="step-dot" :class="{ active: i <= step, current: i === step }"></div>
      </div>
      <div class="step-text">Passo {{ step }} de 4</div>
    </div>

    <h3 class="step-title">{{ currentStep.title }}</h3>
    <div class="step-subtitle" v-html="currentStep.subtitle"></div>

    <!-- Campos -->
    <div v-if="currentStep.fields.length > 0" class="form-fields">
      <div class="input-group" v-for="field in currentStep.fields" :key="field.key">
        <input :value="data[field.key]" @input="updateField(field.key, $event.target.value)" :type="field.type"
          :placeholder="field.placeholder" class="input-field" :disabled="isLoading" @keyup.enter="handleNext"
          autocomplete="off" />
      </div>
    </div>

    <!-- Regras senha -->
    <div v-if="currentStep.showPasswordHints" class="password-requirements">
      <div class="requirement-title">Requisitos da senha:</div>
      <div class="requirement-list">
        <div class="requirement-item">✓ Mínimo de 8 caracteres</div>
        <div class="requirement-item">✓ Combine letras, números e símbolos</div>
      </div>
    </div>

    <!-- Erro -->
    <div v-if="error" class="error-message">
      <div class="error-icon">⚠️</div>
      <div class="error-text">{{ error }}</div>
    </div>

    <!-- Botão -->
    <div class="button-container">
      <button @click="handleNext" :disabled="isLoading" class="submit-button" :class="{ loading: isLoading }">
        <span v-if="!isLoading" class="button-text">
          {{ currentStep.buttonText }}
        </span>
        <span v-else class="loading-text">
          <div class="spinner"></div>
          {{
            step === 1
              ? 'Enviando...'
              : step === 2
                ? 'Verificando...'
                : step === 4
                  ? 'Finalizando...'
                  : 'Processando...'
          }}
        </span>
      </button>
    </div>

    <!-- Reenviar -->
    <div v-if="currentStep.showResend" class="resend-container">
      <div class="resend-text">Não recebeu o e-mail?</div>
      <button @click="handleResend" class="resend-link" :disabled="isLoading">
        Reenviar e-mail de verificação
      </button>
      <div class="resend-tip">💡 Verifique também sua pasta de spam</div>
    </div>
  </div>
</template>


<style scoped>
.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.step-dots {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.step-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e5e7eb;
  transition: all 0.3s ease;
}

.step-dot.active {
  background-color: #4F46E5;
}

.step-dot.current {
  background-color: #06B6D4;
  transform: scale(1.2);
}

.step-text {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.step-title {
  text-align: center;
  color: #1f2937;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.step-subtitle {
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.verification-steps {
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.step-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 10px;
}

.step-number {
  background: #4F46E5;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.step-text {
  font-size: 14px;
  line-height: 1.4;
}

.email-highlight {
  background: #f3f4f6;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  color: #4F46E5;
  margin: 8px 0 16px 34px;
  font-size: 14px;
  border-left: 3px solid #4F46E5;
}

.warning {
  background: #fef3cd;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  padding: 12px;
  margin-top: 16px;
  font-size: 13px;
  color: #92400e;
}

.register-step {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 15px 20px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: #f3f4f6;
  font-size: 16px;
  color: #374151;
  transition: all 0.3s ease;
  outline: none;
}

.input-field:focus {
  background: #ffffff;
  border-color: #4F46E5;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
}

.input-field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.input-field::placeholder {
  color: #9ca3af;
}

.password-requirements {
  background: #f8fafc;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.requirement-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.requirement-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.requirement-item {
  font-size: 13px;
  color: #4b5563;
  line-height: 1.4;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #fecaca;
}

.error-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.error-text {
  line-height: 1.4;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.submit-button {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);
  min-width: 200px;
  min-height: 56px;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.button-text {
  font-weight: 600;
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.arrow-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.arrow-icon svg {
  width: 100%;
  height: 100%;
}

.resend-container {
  text-align: center;
  margin-top: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.resend-text {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 10px;
}

.resend-link {
  background: none;
  border: none;
  color: #4F46E5;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
  padding: 4px 8px;
  border-radius: 4px;
}

.resend-link:hover:not(:disabled) {
  color: #06B6D4;
  background: rgba(79, 70, 229, 0.05);
}

.resend-link:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.resend-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #9ca3af;
  font-style: italic;
}
</style>
