<script setup>
defineProps(['email', 'password', 'keepLoggedIn', 'isLoading', 'error'])
defineEmits(['update:email', 'update:password', 'update:keepLoggedIn', 'login', 'createAccount'])
</script>
<template>
  <div class="form-content">
    <h2 class="form-title">Fazer login</h2>
    
    <div class="input-group">
      <input
        :value="email"
        @input="$emit('update:email', $event.target.value)"
        type="email"
        placeholder="Nome de Usuário"
        class="input-field"
        :disabled="isLoading"
      />
    </div>
    
    <div class="input-group">
      <input
        :value="password"
        @input="$emit('update:password', $event.target.value)"
        type="password"
        placeholder="Senha"
        class="input-field"
        :disabled="isLoading"
        @keyup.enter="$emit('login')"
      />
    </div>
    
    <div class="checkbox-group">
      <label class="checkbox-label">
        <input 
          :checked="keepLoggedIn"
          @change="$emit('update:keepLoggedIn', $event.target.checked)"
          type="checkbox" 
          class="checkbox"
        />
        <span class="checkbox-text">Manter login</span>
      </label>
    </div>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <button 
      @click="$emit('login')"
      :disabled="isLoading"
      class="submit-button"
      :class="{ 'loading': isLoading }"
    >
      <div class="arrow-icon">
        <img src="\icons\enviarlogin.png" alt="">
      </div>
    </button>
    
    <div class="create-account">
      <span>Não consegue fazer login?</span>
      <button @click="$emit('createAccount')" class="create-account-link">
        Criar Conta
      </button>
    </div>
  </div>
</template>
<style scoped>
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

.input-field::placeholder {
  color: #424242;
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
  user-select: none;
}

.checkbox {
  margin-right: 10px;
  transform: scale(1.2);
  accent-color: #4F46E5;
}

.checkbox-text {
  color: #6b7280;
  font-size: 14px;
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

.submit-button:hover {
  transform: translateY(-3px);
}

.submit-button:active {
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-button.loading {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.arrow-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon svg {
  width: 100%;
  height: 100%;
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
  transition: color 0.3s ease;
}

.create-account-link:hover {
  color: #06B6D4;
}
</style>

