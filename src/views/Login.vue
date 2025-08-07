<script setup>
import { ref, computed } from 'vue'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'
import LoginForm from '@/components/LoginForm.vue'
import RegisterStep from '@/components/RegisterStep.vue'
import { 
  sendEmailVerification,
  updatePassword,
  signOut
} from 'firebase/auth'

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

// Referência para o usuário temporário
const tempUser = ref(null)

// Funções principais
const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Por favor, preencha todos os campos'
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('Login bem-sucedido:', userCredential.user)
    alert('Login realizado com sucesso!')
  } catch (err) {
    const errorMessages = {
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/invalid-email': 'Email inválido',
      'auth/user-disabled': 'Conta desativada',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde'
    }
    error.value = errorMessages[err.code] || 'Erro no login. Tente novamente'
  } finally {
    isLoading.value = false
  }
}

const createAccount = () => {
  isAnimating.value = true
  setTimeout(() => {
    showRegister.value = true
    isAnimating.value = false
    registerStep.value = 1
    error.value = ''
  }, 300)
}

const backToLogin = () => {
  isAnimating.value = true
  setTimeout(() => {
    showRegister.value = false
    isAnimating.value = false
    registerStep.value = 1
    error.value = ''
    tempUser.value = null
    registerData.value = {
      email: '', verificationCode: '', name: '', username: '', password: '', confirmPassword: ''
    }
    
    // Fazer logout se houver usuário logado
    if (auth.currentUser) {
      signOut(auth).catch(console.error)
    }
  }, 300)
}

const stepHandlers = {
  1: async () => {
    if (!registerData.value.email) {
      error.value = 'Por favor, digite seu e-mail'
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerData.value.email)) {
      error.value = 'Por favor, digite um e-mail válido'
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      // Gerar senha temporária mais forte
      const tempPassword = `temp_${Date.now()}_${Math.random().toString(36).substring(7)}`
      
      // Criar nova conta
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        registerData.value.email, 
        tempPassword
      )
      
      console.log('Nova conta criada:', userCredential.user.uid)
      tempUser.value = userCredential.user
      
      // Enviar email de verificação
      await sendEmailVerification(userCredential.user, {
        url: window.location.origin, // URL para onde o usuário será redirecionado
        handleCodeInApp: false
      })
      
      console.log('Email de verificação enviado para:', registerData.value.email)
      registerStep.value = 2
      
    } catch (err) {
      console.error('Erro no step 1:', err)
      
      // Tratar erro de email já em uso
      if (err.code === 'auth/email-already-in-use') {
        error.value = 'Este e-mail já está em uso. Tente fazer login ou use outro e-mail.'
      } else {
        const errorMessages = {
          'auth/weak-password': 'Erro interno. Tente novamente.',
          'auth/invalid-email': 'E-mail inválido.',
          'auth/operation-not-allowed': 'Operação não permitida. Contate o suporte.'
        }
        error.value = errorMessages[err.code] || 'Erro ao criar conta. Tente novamente.'
      }
    } finally {
      isLoading.value = false
    }
  },
  
  2: async () => {
    if (!tempUser.value) {
      error.value = 'Sessão expirada. Reinicie o processo.'
      registerStep.value = 1
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      // Recarregar dados do usuário
      await tempUser.value.reload()
      
      console.log('Status de verificação:', tempUser.value.emailVerified)
      
      if (tempUser.value.emailVerified) {
        console.log('Email verificado com sucesso!')
        registerStep.value = 3
      } else {
        error.value = 'Email ainda não foi verificado. Verifique sua caixa de entrada (incluindo spam), clique no link de verificação e tente novamente.'
      }
    } catch (err) {
      console.error('Erro ao verificar email:', err)
      error.value = 'Erro na verificação. Tente novamente.'
    } finally {
      isLoading.value = false
    }
  },

  3: () => {
    if (!registerData.value.name || !registerData.value.username) {
      error.value = 'Por favor, preencha todos os campos'
      return
    }

    if (registerData.value.name.trim().length < 2) {
      error.value = 'Nome deve ter pelo menos 2 caracteres'
      return
    }

    if (registerData.value.username.trim().length < 3) {
      error.value = 'Nome de usuário deve ter pelo menos 3 caracteres'
      return
    }

    // Validar caracteres do username
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(registerData.value.username.trim())) {
      error.value = 'Nome de usuário deve conter apenas letras, números e underscore'
      return
    }

    error.value = ''
    registerStep.value = 4
  },
  
  4: async () => {
    if (!registerData.value.password || !registerData.value.confirmPassword) {
      error.value = 'Por favor, preencha todos os campos'
      return
    }

    if (registerData.value.password.length < 6) {
      error.value = 'Senha deve ter pelo menos 6 caracteres'
      return
    }

    if (registerData.value.password !== registerData.value.confirmPassword) {
      error.value = 'Senhas não coincidem'
      return
    }

    if (!tempUser.value) {
      error.value = 'Sessão expirada. Reinicie o processo.'
      registerStep.value = 1
      return
    }

    if (!tempUser.value.emailVerified) {
      error.value = 'Email não verificado. Volte ao passo anterior.'
      registerStep.value = 2
      return
    }

    isLoading.value = true
    error.value = ''

    try {
      // Atualizar senha do usuário
      await updatePassword(tempUser.value, registerData.value.password)
      
      // Aqui você pode salvar os dados adicionais (nome, username) no Firestore
      // Por exemplo:
      // await saveUserProfile(tempUser.value.uid, {
      //   name: registerData.value.name,
      //   username: registerData.value.username,
      //   email: registerData.value.email
      // })
      
      console.log('Cadastro finalizado com sucesso!')
      alert(`Conta criada com sucesso! Bem-vindo(a), ${registerData.value.name}!`)
      
      // Fazer logout para que o usuário faça login normalmente
      await signOut(auth)
      
      backToLogin()
      
    } catch (err) {
      console.error('Erro no step 4:', err)
      const errorMessages = {
        'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
        'auth/requires-recent-login': 'Sessão expirada. Reinicie o processo.'
      }
      error.value = errorMessages[err.code] || 'Erro ao finalizar cadastro. Tente novamente.'
    } finally {
      isLoading.value = false
    }
  }
}

const handleNextStep = async () => {
  await stepHandlers[registerStep.value]()
}

const resendCode = async () => {
  if (!tempUser.value) {
    error.value = 'Sessão expirada. Reinicie o processo.'
    registerStep.value = 1
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    await sendEmailVerification(tempUser.value, {
      url: window.location.origin,
      handleCodeInApp: false
    })
    
    alert('E-mail de verificação reenviado! Verifique sua caixa de entrada.')
  } catch (err) {
    console.error('Erro ao reenviar email:', err)
    error.value = 'Erro ao reenviar e-mail. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}
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