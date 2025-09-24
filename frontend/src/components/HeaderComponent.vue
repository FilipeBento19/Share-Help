<script setup>
import { motion } from 'motion-v';
import { ref, onMounted, watch, computed } from 'vue'; // ← ADICIONAR computed
import { useRoute } from 'vue-router';
import api from "@/config/api.js";

// Estado reativo para o usuário
const user = ref(null)
const isLoading = ref(true)

// ✅ VERIFICAR SE O ROUTER ESTÁ DISPONÍVEL
let route = null
try {
  route = useRoute()
} catch {
  console.log('Router não disponível no contexto atual')
}

// Função para verificar se o usuário está logado
const checkUserLogin = async () => {
  const token = localStorage.getItem("access_token")

  if (!token) {
    user.value = null
    isLoading.value = false
    return
  }

  try {
    const response = await api.get("/perfil/")
    user.value = response.data
    console.log('👤 Usuário logado no header:', user.value)
  } catch {
    console.log('⚠️ Token inválido, removendo...')
    // Token inválido, remover
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("keepLoggedIn")
    user.value = null
  } finally {
    isLoading.value = false
  }
}

// Verificar login quando o componente carregar
onMounted(() => {
  checkUserLogin()
})

// ✅ VERIFICAR LOGIN APENAS SE ROUTE ESTIVER DISPONÍVEL
if (route) {
  watch(() => route.path, () => {
    checkUserLogin()
  })
}

// ✅ ALTERNATIVA: Escutar mudanças no localStorage
window.addEventListener('storage', (e) => {
  if (e.key === 'access_token') {
    checkUserLogin()
  }
})

// Função para fazer logout

// Computed para nome de exibição
const displayName = computed(() => {
  if (!user.value) return 'Entrar'

  // Prioridade: nome > first_name > username
  if (user.value.nome && user.value.nome.trim()) {
    return user.value.nome.split(' ')[0] // Só o primeiro nome
  }

  if (user.value.first_name && user.value.first_name.trim()) {
    return user.value.first_name
  }

  return user.value.username || 'Usuário'
})
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <router-link to="/"><img src="/logosite.png" alt="ShareHelp Logo" /></router-link>
        <div class="textinho">
            <router-link to="/">
              <h1>ShareHelp</h1>
              <span class="slogan">Doe seguro</span>
            </router-link>
        </div>
      </div>
      <nav class="main-nav">
        <ul>
          <motion.div
            :whileHover="{ scale: 1.1 }"
            :whileTap="{ scale: 0.1 }"
            class="box"
          >
          <li><router-link to="/">Home</router-link></li>
          </motion.div>
          <motion.div
            :whileHover="{ scale: 1.1 }"
            :whileTap="{ scale: 0.1 }"
            class="box"
          >
          <li><router-link to="/institution">Instituições</router-link></li>
          </motion.div>
          <motion.div
            :whileHover="{ scale: 1.1 }"
            :whileTap="{ scale: 0.1 }"
            class="box"
          >
          <li><router-link to="/mapinterative">Mapa interativo</router-link></li>
          </motion.div>
          <motion.div
            :whileHover="{ scale: 1.1 }"
            :whileTap="{ scale: 0.1 }"
            class="box"
          >
          <li><router-link to="/ourteam">Nossa equipe</router-link></li>
          </motion.div>

          <!-- ÁREA DE LOGIN ATUALIZADA -->
          <div class="header-login" :class="{ 'logged-in': user }">
            <li class="login">
              <!-- Se não estiver logado, mostrar "Entrar" -->
              <router-link v-if="!user" to="/perfil" class="login-link">
                <img src="/icons/user.png" class="login-img" alt="">
                <span class="entrar">Entrar</span>
              </router-link>

              <!-- Se estiver logado, mostrar nome do usuário -->
              <div v-else class="user-menu">
                <router-link to="/perfil" class="user-link">
                  <img src="/icons/user.png" class="login-img" alt="">
                  <span class="user-name">Olá, {{ displayName }}</span>
                </router-link>
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #ffffff;
  color: #111827;
  padding: 10px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
}

.header-content {
  max-width: 1700px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5em;
  font-weight: 700;
}

.logo img {
  height: 50px;
  width: auto;
  padding-top: 9px;
}

.logo .slogan {
  font-size: 0.7em;
  margin-left: -5px;
  margin: 0;
  padding: 0;
}

.textinho {
  display: flex;
  flex-direction: column;
  line-height: 0.8;
}

.textinho a {
  text-decoration: none;
  text-decoration-color: none;
  color: black;
}

.logo h1 {
    font-size: 1.5rem;
    font-weight: 890;
}

.main-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 25px;
}

.main-nav li a {
  color: #111827;
  text-decoration: none;
  font-size: 0.95em;
  font-weight: 500;
  transition: color 0.3s ease;
}

.main-nav li a:hover {
  color: #2563eb;
}

.login{
  padding-top: 6px;
  color: white;
}

.header-login {
  background-color: #2563eb;
  border-radius: 25px;
  padding: 3px 20px 6px 20px;
  transition: all 0.3s ease;
  position: relative;
}

.header-login:hover {
  background-color: #1856ff;
}

/* ESTILOS PARA USUÁRIO NÃO LOGADO */
.login-link {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95em;
}

.login-img {
  width: 20px;
  height: 20px;
}

.entrar {
  color: white;
  font-weight: 700;
  padding-bottom: 3px;
}

/* ESTILOS PARA USUÁRIO LOGADO */
.user-menu {
  position: relative;
}

.user-link {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95em;
  cursor: pointer;
}

.user-name {
  color: white;
  font-weight: 700;
  padding-bottom: 3px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* DROPDOWN MENU */
.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  padding: 8px 0;
  margin-top: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.user-menu:hover .user-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #374151;
  text-decoration: none;
  font-size: 0.9em;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}

.logout-btn {
  color: #dc2626;
  border-top: 1px solid #e5e7eb;
  margin-top: 4px;
  padding-top: 12px;
}

.logout-btn:hover {
  background-color: #fef2f2;
}

/* INDICADOR VISUAL PARA USUÁRIO LOGADO */
.header-login.logged-in {
  background: #2563eb
}

.header-login.logged-in:hover {
  background: #1d51c0
}

@media (max-width: 1200px) {
    .main-nav ul {
        gap: 20px;
    }

    .logo h1 {
        font-size: 1rem;
    }

    .logo img {
        height: 45px;
    }
}

@media (max-width: 992px) {
    .main-nav ul {
        gap: 15px;
    }

    .logo h1 {
        font-size: 1.3rem;
    }

    .logo img {
        height: 40px;
    }

    .main-nav li a {
        font-size: 0.9em;
    }
}

@media (max-width: 768px) {
    .header-content {
        flex-wrap: wrap;
    }

    .main-nav {
        width: 100%;
        order: 3;
        margin-top: 15px;
    }

    .main-nav ul {
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px 20px;
    }

    .logo h1 {
        font-size: 1rem;
    }

    .logo img {
        height: 35px;
    }

    .logo .slogan {
        font-size: 0.6em;
    }

    /* Simplificar dropdown em mobile */
    .user-dropdown {
        position: fixed;
        top: auto;
        right: 20px;
        left: 20px;
        width: auto;
        min-width: auto;
    }
}

@media (max-width: 576px) {
    .logo {
        padding-left: 115px;
        gap: 8px;
    }

    .logo h1 {
        font-size: 1rem;
    }

    .logo img {
        height: 30px;
    }

    .main-nav ul {
        gap: 8px 10px;
    }

    .main-nav li a {
        font-size: 0.85em;
    }

    .login img {
        width: 20px;
        height: 20px;
    }

    .user-name {
        max-width: 80px;
        font-size: 0.85em;
    }
}

@media (max-width: 400px) {
    .main-nav ul {
        gap: 5px 12px;
    }

    .main-nav li a {
        font-size: 0.8em;
    }

    .user-name {
        max-width: 70px;
        font-size: 0.8em;
    }
}
</style>
