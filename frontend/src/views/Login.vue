<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterStep from '@/components/RegisterStep.vue'


// Estados principais
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')
const keepLoggedIn = ref(false)
const showRegister = ref(false)
const isAnimating = ref(false)
const registerStep = ref(1)

// Dados do cadastro
const registerData = ref({
  email: '',
  verificationCode: '',
  name: '',
  username: '',
  password: '',
  confirmPassword: ''
})


</script>

<template>
  <div class="page-container">
    <div class="background-image"></div>
    
    <!-- Quadrado Principal -->
    <div 
      class="main-card" 
      :class="{ 
        'slide-left': showRegister, 
        'blur-effect': isAnimating 
      }"
    >
      <!-- Tela de Login -->
      <div v-if="!showRegister" class="card-content">
        <LoginForm
          v-model:email="email"
          v-model:password="password"
          v-model:keepLoggedIn="keepLoggedIn"
          :isLoading="isLoading"
          :error="error"
          @login="handleLogin"
          @createAccount="createAccount"
        />
      </div>
      
      <!-- Tela de Cadastro -->
      <div v-else class="card-content">
        <RegisterStep
          :step="registerStep"
          v-model:data="registerData"
          :error="error"
          :isLoading="isLoading"
          @next="handleNextStep"
          @resend="resendCode"
        />
        
        <div class="back-to-login">
          <span>Já possui uma conta?</span>
          <button @click="backToLogin" class="back-login-link">
            Fazer Login
          </button>
        </div>
      </div>
    </div>
    
    <div 
      class="side-text" 
      :class="{ 'show': showRegister }"
    >
      <h1>CRIAR UMA<br>CONTA</h1>
    </div>
    
    <!-- Rodapé -->
    <div class="footer-text">
      É necessário uma conta para realizar doações não anônimas<br>
      by share-help
    </div>
  </div>
</template>

<style scoped>
.page-container {
  position: relative;
  width: 100vw;
  height: 92.7vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
  background-image: url('/icons/ref.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.main-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 550px;
  min-height: 500px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(0);
  filter: blur(0px);
  z-index: 1;
}

.main-card.slide-left {
  transform: translateX(25vw);
}

.main-card.blur-effect {
  filter: blur(8px);
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.side-text {
  position: absolute;
  left: 8%;
  top: 30%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.6s ease 0.3s;
  pointer-events: none;
}

.side-text.show {
  opacity: 1;
  pointer-events: auto;
}

.side-text h1 {
  color: white;
  font-size: 5rem;
  font-weight: bold;
  line-height: 1.1;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.back-to-login {
  text-align: center;
  margin-top: 20px;
}

.back-to-login span {
  color: #6b7280;
  font-size: 14px;
  display: block;
  margin-bottom: 8px;
}

.back-login-link {
  background: none;
  border: none;
  color: #4F46E5;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.back-login-link:hover {
  color: #06B6D4;
}

.footer-text {
  padding: 0 0 0 15px;
  opacity: 40%;
  position: absolute;
  bottom: 40px;
  left: 0;
  text-align: left;
  color: #ffffff;
  font-size: 12px;
}
</style>