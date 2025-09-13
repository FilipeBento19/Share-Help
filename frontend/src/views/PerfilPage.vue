<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const user = ref(null)
const error = ref(null)
const isLoading = ref(false)

const getProfile = async () => {
  isLoading.value = true
  error.value = null

  try {
    const token = localStorage.getItem("access_token")
    if (!token) {
      error.value = "Você não está logado."
      return
    }

    // Faz chamada para o endpoint que retorna os dados do usuário
    const response = await axios.get("http://127.0.0.1:8000/api/perfil/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    user.value = response.data
  } catch {
    error.value = "Erro ao carregar perfil. Verifique seu login."
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  localStorage.removeItem("keepLoggedIn")
  user.value = null
  alert("Você saiu da conta.")
  window.location.href = "/login"
}

onMounted(() => {
  getProfile()
})
</script>

<template>
  <div class="profile-container">
    <div class="profile-card" v-if="!isLoading && user">
      <h2 class="profile-title">Perfil</h2>
      <p><strong>Usuário:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Nome:</strong> {{ user.nome }}</p>

      <button class="logout-button" @click="logout">Sair</button>
    </div>

    <div v-else-if="isLoading" class="loading">Carregando perfil...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f3f4f6;
  padding: 20px;
}

.profile-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

.profile-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #1f2937;
}

.profile-card p {
  margin: 8px 0;
  font-size: 15px;
  color: #374151;
  text-align: left;
}

.logout-button {
  margin-top: 20px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background: #dc2626;
}

.loading {
  font-size: 16px;
  color: #4b5563;
}

.error-message {
  color: #dc2626;
  background: #fee2e2;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
}
</style>
