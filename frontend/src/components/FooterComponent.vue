<script setup>
// Footer ShareHelp - componente visual
const companyInfo = {
  name: 'ShareHelp',
  description: 'Transformando vidas através da generosidade e solidariedade.',
  year: new Date().getFullYear()
}

const quickLinks = [
  { name: 'Home', href: '#' },
  { name: 'Instituições', href: '/institution' },
  { name: 'Mapa Interativo', href: '#' },
  { name: 'Nossa equipe', href: '#' }
]

const contactInfo = {
  phone: '(47) 99975-7571',
  email: 'contatosharehelp@gmail.com',
  location: 'Joinville, SC'
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        
        <!-- Empresa -->
        <div class="section">
          <div class="logo-wrapper">
            <div class="logo">
              <a href=""><img src="/icons/corazonlogo.png" alt=""></a>
            </div>
            <h3 class="company-name">{{ companyInfo.name }}</h3>
          </div>
          <p class="description">{{ companyInfo.description }}</p>
          
          <!-- Redes -->
          <div class="social-links">
            <a href="/"><img src="/icons/facefooter.png" alt=""></a>
            <a href="/"><img src="/icons/instafooter.png" alt=""></a>
            <a href="/"><img src="/icons/twitterfooter.png" alt=""></a>
          </div>
        </div>

        <!-- Links -->
        <div class="section">
          <h4 class="title">Links Rápidos</h4>
          <nav class="nav">
            <a 
              v-for="link in quickLinks" 
              :key="link.name"
              :href="link.href"
              class="nav-link"
            >
              {{ link.name }}
            </a>
          </nav>
        </div>

        <!-- Contato -->
        <div class="section">
          <h4 class="title">Contato</h4>
          <div class="contact-list">
            <div class="contact-item">
              <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span class="contact-text">{{ contactInfo.phone }}</span>
            </div>
            
            <div class="contact-item">
              <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span class="contact-text">{{ contactInfo.email }}</span>
            </div>
            
            <div class="contact-item">
              <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="contact-text">{{ contactInfo.location }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="copyright">
        <div class="copyright-text">
          © {{ companyInfo.year }} {{ companyInfo.name }}. Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-top: 3px solid #3b82f6;
  color: #d1d5db;
  font-family: 'Montserrat', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
}

.section {
  animation: fadeInUp 0.6s ease-out;
}

.section:nth-child(2) {
  animation-delay: 0.2s;
}

.section:nth-child(3) {
  animation-delay: 0.4s;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.logo{
  padding-top: 8px;
  padding-right: 5px;
}

.heart {
  width: 20px;
  height: 20px;
  color: white;
  animation: heartbeat 2s infinite;
}

.company-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.description {
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 300px;
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  background: rgba(55, 65, 81, 0.8);
  backdrop-filter: blur(10px);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(75, 85, 99, 0.3);
}

.social-link:hover {
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  border-color: #3b82f6;
}

.icon {
  width: 16px;
  height: 16px;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 24px;
  position: relative;
  display: inline-block;
}

.title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 1px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-link {
  color: #9ca3af;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link::before {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: white;
}

.nav-link:hover::before {
  width: 100%;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.2s ease;
  padding: 8px 0;
  border-radius: 6px;
}

.contact-item:hover {
  background: rgba(59, 130, 246, 0.1);
  padding-left: 8px;
  transform: translateX(4px);
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.contact-item:hover .contact-icon {
  color: #3b82f6;
}

.contact-text {
  color: #9ca3af;
}



.copyright-text {
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>