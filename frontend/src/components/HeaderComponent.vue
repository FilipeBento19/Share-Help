<script setup>

</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <img src="/logosite.png" alt="ShareHelp Logo">
        <div class="textinho">
            <h1>ShareHelp</h1>
            <span class="slogan">Doe seguro</span>
        </div>
      </div>
      <nav class="main-nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/institution">Instituições</router-link></li>
          <li><router-link to="/map">Mapa interativo</router-link></li>
          <li><router-link to="/team">Nossa equipe</router-link></li>
          <li><button class="header-donate-button">Doar agora</button></li>
          <li class="login"><router-link to="/perfil"><img src="/icons/login.png" alt=""></router-link></li>
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
  height: 40px;
  width: auto;
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
  line-height: 1.2;
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

.header-donate-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95em;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.header-donate-button:hover {
  background-color: #1d4ed8;
}

.login{
  padding-top: 6px;
}
</style>