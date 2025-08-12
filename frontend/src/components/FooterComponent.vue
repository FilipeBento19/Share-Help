<script setup>
// Footer ShareHelp - componente visual
const companyInfo = {
  name: 'ShareHelp',
  description: 'Transformando vidas através da generosidade e solidariedade.',
  year: new Date().getFullYear()
}

const quickLinks = [
  { name: 'Home', href: '#' },
  { name: 'Instituições', href: '#' },
  { name: 'Mapa Interativo', href: '#' },
  { name: 'Nossa equipe', href: '#' }
]

const contactInfo = {
  phone: '(47) 99846-3469',
  email: 'contato@ShareHelp.org',
  location: 'Joinville, SC'
}

const socialLinks = [
  { name: 'Facebook', icon: 'facebook', href: '#' },
  { name: 'Instagram', icon: 'instagram', href: '#' },
  { name: 'Twitter', icon: 'twitter', href: '#' }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        
        <!-- Empresa -->
        <div class="section">
          <div class="logo-wrapper">
            <div class="logo">
              <a href=""><img src="/public/logosite.png" alt=""></a>
            </div>
            <h3 class="company-name">{{ companyInfo.name }}</h3>
          </div>
          <p class="description">{{ companyInfo.description }}</p>
          
          <!-- Redes -->
          <div class="social-links">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.href"
              class="social-link"
              :aria-label="social.name"
            >
              <svg v-if="social.icon === 'facebook'" class="icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <svg v-else-if="social.icon === 'instagram'" class="icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <svg v-else-if="social.icon === 'twitter'" class="icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
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
  margin-bottom: 20px;
}

.logo:hover {
  transform: translateY(-2px);
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

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .container {
    padding: 40px 20px;
  }
  
  .social-link {
    width: 36px;
    height: 36px;
  }
}
</style>