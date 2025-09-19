<script setup>
import { ref } from "vue"
import api from "@/config/api.js" // ← Importa o service
import Swal from "sweetalert2"
defineEmits(['createAccount'])

const email = ref("")
const password = ref("")
const keepLoggedIn = ref(false)
const isLoading = ref(false)
const error = ref(null)

const login = async () => {
  isLoading.value = true
  error.value = null

  try {
    // ✅ Usa o service da API ao invés da URL hardcoded
    const response = await api.post("/token/", {
      username: email.value,
      password: password.value,
    })

    // salva tokens
    localStorage.setItem("access_token", response.data.access)
    localStorage.setItem("refresh_token", response.data.refresh)

    if (keepLoggedIn.value) {
      localStorage.setItem("keepLoggedIn", "true")
    } else {
      localStorage.removeItem("keepLoggedIn")
    }

    Swal.fire({
      title: "Login realizado!",
      text: "Bem-vindo de volta!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      background: "#ffffff",
      color: "#111827"
    })

    setTimeout(() => {
      window.location.href = "/perfil"
    }, 2200)
  } catch {
    error.value = "Usuário ou senha incorretos."

    Swal.fire({
      title: "Erro",
      text: "Usuário ou senha incorretos.",
      icon: "error",
      confirmButtonText: "Tentar novamente",
      confirmButtonColor: "#DC2626",
      background: "#ffffff",
      color: "#111827"
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="form-content">
    <h2 class="form-title">Fazer login</h2>

    <!-- Usuário -->
    <div class="input-group">
      <input v-model="email" type="text" placeholder="Nome de Usuário" class="input-field" :disabled="isLoading" />
    </div>

    <!-- Senha -->
    <div class="input-group">
      <input v-model="password" type="password" placeholder="Senha" class="input-field" :disabled="isLoading"
        @keyup.enter="login" />
    </div>

    <!-- Checkbox manter login -->
    <div class="checkbox-group">
      <label class="checkbox-label">
        <input v-model="keepLoggedIn" type="checkbox" class="checkbox" />
        <span class="checkbox-text">Manter login</span>
      </label>
    </div>

    <!-- Erro -->
    <div v-if="error" class="error-message">{{ error }}</div>

    <!-- Botão -->
    <button @click="login" :disabled="isLoading" class="submit-button" :class="{ 'loading': isLoading }">
      <div class="arrow-icon">
        <img src="/icons/enviarlogin.png" alt="login" />
      </div>
    </button>

    <!-- Criar conta -->
    <div class="create-account">
      <span>Não consegue fazer login?</span>
      <button @click="$emit('createAccount')" class="create-account-link">
        Criar Conta
      </button>
    </div>
  </div>
</template>

<style scoped>
/* mesmo CSS que você já tinha no 1º código */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-title {
  text-align: center;
  color: #1f2937;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 15px 20px;
  border: none;
  border-radius: 12px;
  background: #E8E8E8;
  font-size: 16px;
  color: #424242;
  transition: all 0.3s ease;
  outline: none;
}

.input-field:focus {
  background: #e5e7eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
}

.input-field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  margin-right: 10px;
  transform: scale(1.2);
  accent-color: #4F46E5;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #fecaca;
}

.submit-button {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background-color: rgba(236, 236, 236, 0.95);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(70, 70, 70, 0.4);
}

.submit-button.loading {
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

.arrow-icon {
  width: 24px;
  height: 24px;
}

.create-account {
  text-align: center;
  margin-top: 20px;
}

.create-account span {
  color: #6b7280;
  font-size: 14px;
  display: block;
  margin-bottom: 8px;
}

.create-account-link {
  background: none;
  border: none;
  color: #4F46E5;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
</style>
