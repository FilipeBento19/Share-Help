<script setup>
import { motion } from 'motion-v';
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <router-link to="/"><img src="/logosite.png" alt="ShareHelp Logo"></img></router-link>
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
          <motion.div
            :whileHover="{ scale: 1.1 }"
            :whileTap="{ scale: 0.1 }"
            class="box"
          >
          <li class="login"><router-link to="/perfil"><img src="/icons/login.png" alt=""></router-link></li>
          </motion.div>
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
}

@media (max-width: 400px) {
    .main-nav ul {
        gap: 5px 12px;
    }
    
    .main-nav li a {
        font-size: 0.8em;
    }
}


</style>