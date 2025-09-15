<template>
  <div class="account-management">

    <div class="main-container">
      <!-- Sidebar -->
      <section class="sidebar">
        <h2>Gerenciamento de conta</h2>
        <nav>
          <a href="#" class=" active">
            <span class="fa-solid fa-infoPerfil" style="color: #2563eb;"></span>
            Informações pessoais
          </a>
          <a href="#" class=" ">
            <span class="fa-solid fa-key" style="color: #2563eb;"></span>
            Login e conta
          </a>
          <a href="#" class=" ">
            <span class="fa-solid fa-heart" style="color: #2563eb;"></span>
            ONGs favoritadas
          </a>
          <a href="#" class=" ">
            <span class="fa-solid fa-chart-simple" style="color: #2563eb;"></span>
            Registros de doação
          </a>
        </nav>
      </section>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>Carregando informações...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <div class="error-icon">⚠️</div>
          <h3>Erro ao carregar dados</h3>
          <p>{{ error }}</p>
          <button class="btn-secondary" @click="getProfile">Tentar novamente</button>
        </div>

        <!-- Content Sections -->
        <div v-else class="content-sections">
          <!-- Personal Information -->
          <section class="conteudoPerfil">
            <div class="conteudoEsquerda">
              <h3>Informações pessoais</h3>
              <p>Essa informação é particular e não
                será compartilhada com outras
                pessoas. Configure suas informações
                agora!</p>
            </div>
            <div class="conteudoDireita">
              <div class="infoPerfil">
                <div class="infoPerfil-item">
                  <label>Nome completo</label>
                  <p>{{ user?.nome || 'Não informado' }}</p>
                </div>
                <div class="infoPerfil-item">
                  <label>Email</label>
                  <p>{{ user?.email || 'Não informado' }}</p>
                </div>
                <div class="infoPerfil-item">
                  <label>Nome de usuário</label>
                  <p>{{ user?.username || 'Não informado' }}</p>
                </div>
              </div>
              <button class="btn-outline">Editar informações</button>
            </div>
          </section>

          <!-- Login and Account -->
          <section class="conteudoPerfil">
            <div class="conteudoEsquerda">
              <h3>Login e conta</h3>
              <p class="card-subtitle">Gerencie sua senha e configurações de segurança da conta</p>
            </div>
            <div class="conteudo direita">
              <div class="account-actions">
                <div class="action-item">
                  <div class="action-infoPerfil">
                    <h4>Senha</h4>
                    <p>Última alteração: Não disponível</p>
                  </div>
                  <button class="btn-outline">Alterar</button>
                </div>
                <div class="action-item">
                  <div class="action-infoPerfil">
                    <h4>Email</h4>
                    <p>{{ user?.email }}</p>
                  </div>
                  <button class="btn-outline">Alterar email</button>
                </div>
              </div>
              <div class="danger-zone">
                <button class="btn-danger" @click="logout">Desconectar</button>
                <button class="btn-outline">Excluir e encerrar</button>
              </div>
            </div>
          </section>

          <!-- Favorite NGOs -->
          <section class="conteudoPerfil">
            <div class="conteudoEsquerda">
              <h3>ONGs favoritadas</h3>
            </div>
            <div class="conteudo direita">
              <div class="favorites-grid">
                <div class="favorite-item">
                  <div class="favorite-logo">🏠</div>
                  <span class="favorite-name">Lar dos Idosos</span>
                </div>
                <div class="favorite-item">
                  <div class="favorite-logo">❤️</div>
                  <span class="favorite-name">Instituto do Coração</span>
                </div>
                <div class="favorite-item placeholder">
                  <div class="favorite-logo">+</div>
                  <span class="favorite-name">Adicionar</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Donation Records -->
          <section class="conteudoPerfil">
            <div class="conteudoEsquerda">
              <h3>Registros de doação</h3>
            </div>
            <div class="conteudo direita">
              <div class="chart-container">
                <div class="chart-header">
                  <span>Últimos meses</span>
                  <select class="chart-select">
                    <option>Últimos 12 meses</option>
                    <option>Este ano</option>
                  </select>
                </div>
                <div class="chart">
                  <div class="chart-bars">
                    <div class="bar" style="height: 80%">
                      <div class="bar-value">R$ 250</div>
                    </div>
                    <div class="bar" style="height: 60%">
                      <div class="bar-value">R$ 180</div>
                    </div>
                    <div class="bar" style="height: 40%">
                      <div class="bar-value">R$ 120</div>
                    </div>
                    <div class="bar" style="height: 90%">
                      <div class="bar-value">R$ 300</div>
                    </div>
                  </div>
                  <div class="chart-labels">
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Ago</span>
                    <span>Set</span>
                  </div>
                </div>
                <div class="chart-summary">
                  <div class="summary-item">
                    <span class="summary-label">Total doado</span>
                    <span class="summary-value">R$ 1.250,00</span>
                  </div>
                  <div class="summary-item">
                    <span class="summary-label">Doações este mês</span>
                    <span class="summary-value">3</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>📊 DonateWay</h4>
          <p>Conectando corações generosos com causas que transformam o mundo.</p>
          <div class="social-links">
            <a href="#" class="social-link">📘</a>
            <a href="#" class="social-link">📷</a>
            <a href="#" class="social-link">🐦</a>
          </div>
        </div>
        <div class="footer-section">
          <h5>Links Rápidos</h5>
          <ul>
            <li><a href="#">Como funciona</a></li>
            <li><a href="#">ONGs parceiras</a></li>
            <li><a href="#">Sobre nós</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h5>Contato</h5>
          <ul>
            <li>📧 contato@donateway.org</li>
            <li>📞 (11) 9999-9999</li>
            <li>📍 São Paulo, SP</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 DonateWay. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Main Container */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  padding: 32px 24px;
  min-height: calc(100vh - 200px);
}

/* Sidebar */

.sidebar {

  & h2 {
    color: #3b82f6;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 32px;
    line-height: 1.2;
  }

  & nav {
    display: flex;
    flex-direction: column;
    gap: 8px;

    & a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 10px;
      text-decoration: none;
      color: #64748b;
      font-weight: 500;
      transition: all 0.2s;
    }

    & a:hover {
      background: #f1f5f9;
      color: #334155;
    }

    a.active {
      background: #eff6ff;
      color: #3b82f6;
    }

  }
}

/* Loading and Error States */
.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f1f5f9;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.error-state {
  color: #dc2626;

  & button {
    background: #6b7280;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  & button:hover {
    background: #4b5563;
  }
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

/* Content Cards */
.conteudoPerfil {
  display: flex;
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.conteudoEsquerda {
  background: #F3F3F3;
  margin-bottom: 24px;

  & h3 {
    font-size: 24px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 8px;
  }

  & p {
    color: #64748b;
    font-size: 16px;
  }
}



/* Info Grid */
.conteudoDireita {
border-radius: 20vw;

  & .infoPerfil {
    

    & label {
      display: block;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }

    & p {
      color: #6b7280;
      font-size: 16px;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }

  }

  & button {
    background: transparent;
    border: 2px solid #e5e7eb;
    color: #374151;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  & button:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
}

/* Buttons */




.btn-danger {
  background: #dc2626;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-danger:hover {
  background: #b91c1c;
}

/* Account Actions */
.account-actions {
  margin-bottom: 32px;
}

.action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
}

.action-infoPerfil h4 {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
}

.action-infoPerfil p {
  color: #64748b;
  font-size: 14px;
}

.danger-zone {
  display: flex;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #fee2e2;
}

/* Favorites */
.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.favorite-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.favorite-item:hover {
  border-color: #3b82f6;
}

.favorite-item.placeholder {
  border-style: dashed;
  opacity: 0.7;
}

.favorite-logo {
  width: 48px;
  height: 48px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 12px;
}

.favorite-name {
  font-weight: 500;
  color: #374151;
  text-align: center;
  font-size: 14px;
}

/* Chart */
.chart-container {
  max-width: 600px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.chart-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
}

.chart {
  margin-bottom: 24px;
}

.chart-bars {
  display: flex;
  align-items: end;
  gap: 16px;
  height: 200px;
  margin-bottom: 12px;
}

.bar {
  flex: 1;
  background: #3b82f6;
  border-radius: 4px 4px 0 0;
  position: relative;
  min-height: 20px;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 8px;
}

.bar-value {
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.chart-labels {
  display: flex;
  gap: 16px;
}

.chart-labels span {
  flex: 1;
  text-align: center;
  color: #64748b;
  font-size: 14px;
}

.chart-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 10px;
}

.summary-item {
  text-align: center;
}

.summary-label {
  display: block;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 4px;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

/* Footer */
.footer {
  background: #1e293b;
  color: white;
  margin-top: 80px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  padding: 48px 24px;
}

.footer-section h4 {
  font-size: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-section h5 {
  font-size: 16px;
  margin-bottom: 16px;
  color: #cbd5e1;
}

.footer-section p {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 16px;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-section ul li a:hover {
  color: white;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: #334155;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background 0.2s;
}

.social-link:hover {
  background: #475569;
}

.footer-bottom {
  border-top: 1px solid #334155;
  padding: 24px;
  text-align: center;
  color: #94a3b8;
}

/* Responsive */
@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px 16px;
  }

  .sidebar {
    order: 2;
  }

  .main-content {
    order: 1;
  }

  .conteudoPerfil {
    padding: 24px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 16px;
  }

  .infor {
    grid-template-columns: 1fr;
  }

  .danger-zone {
    flex-direction: column;
  }
}
</style>
