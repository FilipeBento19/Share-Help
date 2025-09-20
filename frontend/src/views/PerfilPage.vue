<script setup>
import Swal from "sweetalert2"
import { ref, onMounted, computed } from "vue";
import api from "@/config/api.js";
import { instituicoesService } from '@/services/apiServices'
import FooterComponent from "@/components/FooterComponent.vue";
import graficComponent from "@/components/graficComponent.vue";

// =====================================
// ESTADO REATIVO
// =====================================
const ongs = ref([])
const isLoadingOngs = ref(true)
const errorOngs = ref(null)

// Estados do perfil
const favoritas = ref([])
const doacoes = ref([])
const isLoadingFavoritos = ref(true)
const isLoadingDoacoes = ref(true)
const tipoTexto = ref("simplificada")
const user = ref(null);
const error = ref(null);
const isLoading = ref(false);
const filtroTipo = ref(""); // Texto ou Gráfico

// =====================================
// BUSCAR DADOS
// =====================================
onMounted(async () => {
  // Buscar perfil
  getProfile()

  // Buscar instituições
  try {
    console.log('🎯 Buscando instituições (PerfilPage)...')

    const result = await instituicoesService.getInstituicoes()

    console.log('🎯 Instituições recebidas:', result?.length)
    ongs.value = result || []

  } catch (err) {
    console.error('❌ Erro ao buscar instituições:', err)
    errorOngs.value = err.message
  } finally {
    isLoadingOngs.value = false
  }

  // ✅ BUSCAR FAVORITOS DA API (não mais do localStorage)
  await buscarFavoritos()

  // ✅ BUSCAR DOAÇÕES DA API (não mais do localStorage)
  await buscarDoacoes()
})

// =====================================
// BUSCAR FAVORITOS DA API
// =====================================
const buscarFavoritos = async () => {
  try {
    const token = localStorage.getItem("access_token")
    if (!token) {
      console.log('⚠️ Usuário não logado - não buscando favoritos')
      return
    }

    console.log('🎯 Buscando favoritos da API...')

    const response = await api.get("/favoritos/")

    console.log('✅ Favoritos da API:', response.data)

    // Mapear para o formato do localStorage (IDs das instituições)
    favoritas.value = response.data.map(fav => {
      // Buscar o identificador da instituição nos dados carregados
      const instituicao = ongs.value.find(ong => ong.api_id === fav.instituicao)
      return instituicao?.id || fav.instituicao.toString()
    }).filter(Boolean)

    console.log('✅ Favoritas mapeadas:', favoritas.value)

  } catch (error) {
    console.error('❌ Erro ao buscar favoritos:', error)
  } finally {
    isLoadingFavoritos.value = false
  }
}

// =====================================
// BUSCAR DOAÇÕES DA API
// =====================================
const buscarDoacoes = async () => {
  try {
    const token = localStorage.getItem("access_token")
    if (!token) {
      console.log('⚠️ Usuário não logado - não buscando doações')
      return
    }

    console.log('🎯 Buscando doações da API...')

    const response = await api.get("/doacoes/")

    console.log('✅ Doações da API:', response.data)

    // Mapear para o formato esperado pelo template
    doacoes.value = response.data.map(doacao => ({
      id: doacao.id,
      ongNome: doacao.instituicao_nome || doacao.instituicao_detalhes?.nome || 'Instituição',
      ongId: doacao.instituicao_detalhes?.identificador || doacao.instituicao.toString(),
      tipo: doacao.tipo_doacao_nome || doacao.tipo_doacao_detalhes?.nome_tipo || 'Doação',
      valor: parseFloat(doacao.valor_estimado || 0),
      data: doacao.data_doacao || doacao.data_criacao,
      status: doacao.status,
      descricao: doacao.descricao || ''
    }))

    console.log('✅ Doações mapeadas:', doacoes.value)

  } catch (error) {
    console.error('❌ Erro ao buscar doações:', error)
  } finally {
    isLoadingDoacoes.value = false
  }
}

// =====================================
// COMPUTED REATIVOS
// =====================================

// Lista de ONGs favoritas
const favoritasList = computed(() => {
  if (!ongs.value || ongs.value.length === 0 || !favoritas.value || favoritas.value.length === 0) {
    return []
  }

  return ongs.value.filter(o => favoritas.value.includes(o.id))
})

// Resumo por ONG
const resumoPorOng = computed(() => {
  const resumo = {};
  doacoes.value.forEach((d) => {
    if (!resumo[d.ongNome]) {
      resumo[d.ongNome] = { quantidade: 0, valorTotal: 0 };
    }
    resumo[d.ongNome].quantidade += 1;
    resumo[d.ongNome].valorTotal += d.valor;
  });

  return Object.entries(resumo).map(([ong, dados]) => ({
    ong,
    quantidade: dados.quantidade,
    valor: dados.valorTotal,
  }));
});

// =====================================
// FUNÇÕES DO PERFIL
// =====================================

const getProfile = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "Você não está logado.";
      return;
    }

    const response = await api.get("/perfil/");
    user.value = response.data;
  } catch {
    error.value = "Erro ao carregar perfil. Verifique seu login.";
  } finally {
    isLoading.value = false;
  }
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("keepLoggedIn");
  user.value = null;
  Swal.fire({
    icon: 'info',
    title: 'Você saiu da conta',
    timer: 2000,
    showConfirmButton: false
  });
  setTimeout(() => {
    window.location.href = "/perfil"
  }, 2200)
};

// =====================================
// FUNÇÕES DOS FAVORITOS
// =====================================

const unfavorite = async (id) => {
  try {
    const token = localStorage.getItem("access_token")
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Login necessário',
        text: 'Faça login para gerenciar favoritos'
      })
      return
    }

    console.log('🗑️ Removendo favorito:', id)

    // Encontrar a ONG nos dados carregados
    const ong = ongs.value.find(o => o.id === id)
    if (!ong) {
      console.error('❌ ONG não encontrada:', id)
      return
    }

    // Buscar o favorito na API
    const favoritosResponse = await api.get("/favoritos/")
    const favorito = favoritosResponse.data.find(fav => fav.instituicao === ong.api_id)

    if (!favorito) {
      console.error('❌ Favorito não encontrado na API')
      return
    }

    // Remover da API
    await api.delete(`/favoritos/${favorito.id}/`)

    // Atualizar estado local
    favoritas.value = favoritas.value.filter(favId => favId !== id)

    console.log('✅ Favorito removido com sucesso')

  } catch (error) {
    console.error('❌ Erro ao remover favorito:', error)
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Erro ao remover favorito'
    })
  }
}

// =====================================
// REFRESH TOKEN
// =====================================

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token")
  if (!refreshToken) return null

  try {
    const response = await api.post("/api/token/refresh/", {
      refresh: refreshToken,
    })
    localStorage.setItem("access_token", response.data.access)
    return response.data.access
  } catch (err) {
    console.error("Erro ao renovar token:", err)
    logout()
    return null
  }
}

// Interceptor para renovar automaticamente se o token expirar
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const newToken = await refreshAccessToken()
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`
        return api.request(error.config)
      } else {
        logout()
      }
    }
    return Promise.reject(error)
  }
)
</script>
<template>
  <!-- =====================================
          ESTADOS DE CARREGAMENTO
  ===================================== -->

  <!-- Verificação se usuário está logado -->
  <div v-if="!user && !isLoading" class="box-nao-logado">
    <!-- Conteúdo para usuário não logado -->
  </div>

  <!-- =====================================
       CONTEÚDO PRINCIPAL
       ===================================== -->

  <div class="main-container" v-else>
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Gerenciamento de conta</h2>
      <nav class="sidebar-nav">
        <a href="#login" class="nav-item">
          <img src="/public/icons/key-solid-full.svg" alt="" class="nav-icon">
          Login e conta
        </a>
        <a href="#ongs" class="nav-item">
          <img src="/public/icons/star-solid-full.svg" alt="" class="nav-icon"> ONGs favoritadas
        </a>
        <a href="#doacoes" class="nav-item">
          <img src="/public/icons/signal-solid-full.svg" alt="" class="nav-icon">
          Registros de doação
        </a>
      </nav>
    </aside>

    <main class="conteudo">
      <div>
        <!-- Login e conta -->
        <section id="login" class="secao">
          <div id="backCinza">
            <h2>Login e conta</h2>
            <p>Essa informação é particular e não
              será compartilhada com outras
              pessoas. Configure suas informações
              agora!</p>
          </div>
          <div class="grid">
            <label for="user.username">
              Nome de usuário
              <input v-model="user.username" />
            </label>
            <label for="user.email">
              Email
              <input v-model="user.email" />
            </label>
            <label for="">
              Senha
              <input type="password" placeholder="••••••••" />
            </label>
            <label for="">
              Confirmar senha
              <input type="password" placeholder="••••••••" />
            </label>
            <div class="acoes">
              <button @click="logout" class="vermelho">Desconectar</button>
              <button class="azul">Salvar e Verificar</button>
            </div>
          </div>
        </section>

        <!-- ONGs favoritas -->
        <section id="ongs" class="favoritas">
          <h2>ONGs favoritas</h2>

          <!-- Loading das ONGs -->
          <div v-if="isLoadingOngs || isLoadingFavoritos" class="loading-favorites">
            <p>Carregando favoritas...</p>
          </div>

          <!-- Erro ao carregar ONGs -->
          <div v-else-if="errorOngs" class="error-favorites">
            <p>Erro ao carregar instituições: {{ errorOngs }}</p>
            <button @click="$router.go(0)" class="btn-retry">Tentar novamente</button>
          </div>

          <!-- Lista de favoritas -->
          <div v-else-if="favoritasList.length" class="lista-ongs">
            <div v-for="ong in favoritasList" :key="ong.id" class="ong-item">
              <img :src="ong.img" :alt="ong.title" class="ong" />
              <button class="heart" @click="unfavorite(ong.id)" aria-label="Remover dos favoritos">
                <img src="/icons/heart-solid-full.svg" alt="desfavoritar" />
              </button>
            </div>
          </div>

          <!-- Nenhuma favorita -->
          <p v-else>Você ainda não favoritou nenhuma ONG.</p>
        </section>

        <!-- Registros de doação -->
        <section id="doacoes" class="doacoes">
          <h2>Registros de doação</h2>

          <!-- Loading de doações -->
          <div v-if="isLoadingDoacoes" class="loading-favorites">
            <p>Carregando doações...</p>
          </div>

          <!-- Quando for gráfico -->
          <template v-else-if="filtroTipo === 'Gráfico'">
            <div class="grafico-placeholder">
              <graficComponent v-model:filtro="filtroTipo" :doacoes="doacoes" />
            </div>
          </template>

          <!-- Quando for texto -->
          <template v-else>
            <div v-if="doacoes.length" class="grafico doacoes-grid">
              <div class="registros-conteiner">
                <!-- Lista detalhada -->
                <div class="registros" v-if="tipoTexto === 'detalhada'">
                  <h2>Lista detalhada</h2>
                  <table>
                    <tr class="titulos">
                      <th>Ong</th>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th>Valor</th>
                    </tr>
                    <tr v-for="(d, index) in doacoes" :key="index" class="infos">
                      <th>{{ d.ongNome }}</th>
                      <th>{{ new Date(d.data).toLocaleDateString() }}</th>
                      <th>{{ d.tipo }}</th>
                      <th>{{ d.valor }} R$</th>
                    </tr>
                  </table>
                  <p class="preco">Valor total: {{doacoes.reduce((a, b) => a + b.valor, 0)}} R$</p>
                </div>

                <!-- Resumo -->
                <div class="registros" v-if="tipoTexto === 'simplificada'">
                  <h2>Resumo por ONG</h2>
                  <table>
                    <tr class="titulos">
                      <th>Ong</th>
                      <th>Quantidade de doações</th>
                      <th>Valor</th>
                    </tr>
                    <tr v-for="(r, i) in resumoPorOng" :key="i" class="infos">
                      <th>{{ r.ong }}</th>
                      <th>{{ r.quantidade }}</th>
                      <th>{{ r.valor }} R$</th>
                    </tr>
                  </table>
                  <p class="preco">Valor total: {{doacoes.reduce((a, b) => a + b.valor, 0)}} R$</p>
                </div>
              </div>

              <!-- Filtros -->
              <aside class="filtros">
                <label>
                  <p>Tipo de registro:</p>
                  <select v-model="filtroTipo">
                    <option value="">Texto</option>
                    <option value="Gráfico">Gráfico</option>
                  </select>
                </label>

                <p>Tipo de texto:</p>
                <label class="input">
                  <div>
                    <input type="radio" value="simplificada" v-model="tipoTexto" />
                    Simplificada
                  </div>
                  <div>
                    <input type="radio" value="detalhada" v-model="tipoTexto" />
                    Detalhada
                  </div>
                </label>

                <label>
                  Faixa de tempo:
                  <select v-model="filtroTempo">
                    <option value="30">Últimos 30 dias</option>
                    <option value="90">Últimos 3 meses</option>
                    <option value="365">Último ano</option>
                    <option value="all">Todos</option>
                  </select>
                </label>
              </aside>
            </div>

            <!-- Nenhuma doação -->
            <p v-else>Nenhuma doação registrada ainda.</p>
          </template>
        </section>
      </div>
    </main>
  </div>

  <!-- Footer -->
  <div>
    <FooterComponent />
  </div>
</template>

<style scoped>
.loading-favorites,
.error-favorites {
  text-align: center;
  padding: 20px;
  color: #6b7280;
  font-style: italic;
}

.btn-retry {
  background: #dc2626;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-retry:hover {
  background: #b91c1c;
}

.box-nao-logado {
  width: 10vw;
  height: 1000vw;
}

.main-container {
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 40px;
  padding: 32px 20px;
  min-height: calc(100vh - 200px);
}

.conteudo {
  margin-top: 2rem;
}

/* ✅ SIDEBAR (mantida como estava) */
.sidebar {
  position: sticky;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  & h2 {
    color: #2563EB;
    font-size: 3rem;
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
      margin: 0 0 0 1vw;
      padding: 12px 16px;
      border-radius: 10px;
      text-decoration: none;
      color: #64748b;
      font-size: 1.2rem;
      transition: all 0.2s;
    }

    & a:hover {
      background: #f1f5f9;
      color: #334155;
    }

    a.active {
      background: #eff6ff;
      color: #2563EB;
    }

    .nav-icon {
      width: 34px;
    }
  }
}

/* ✅ SEÇÕES (mantidas como estavam) */
section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding: 0;
  margin: 2rem 0;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);

  & #backCinza {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    padding: 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    & h2 {
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    & p {
      color: #64748b;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }

  div.grid {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    & label {
      color: #374151;
      font-weight: 600;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      display: block;
    }

    & input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 0.95rem;
      background: #f9fafb;
      transition: all 0.3s ease;
      margin-bottom: 0;
    }

    & input:focus {
      outline: none;
      border-color: #3b82f6;
      background: white;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    & .acoes {
      grid-column: 1 / -1;
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
  }

  & button {
    padding: 0.875rem 1.5rem;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    font-size: 0.95rem;
  }

  & button.azul {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  & button.azul:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  & button.vermelho {
    background: white;
    color: #ef4444;
    border-color: #ef4444;
  }

  & button.vermelho:hover {
    background: #ef4444;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }
}

/* ✅ FAVORITAS (mantidas como estavam) */
.favoritas {
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  padding: 2rem;

  & h2 {
    color: #1e293b;
    font-weight: 600;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  & .lista-ongs {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    & .ong-item {
      display: flex;
      flex-direction: column;
      position: relative;
    }

    & img.ong {
      margin: 0 1vw 0 0;
      width: 120px;
      height: 110px;
      background: white;
      border-radius: 0.75vw;
      box-shadow: 3px 3px 13px rgba(0, 0, 0, 0.658);
      padding: 0.5rem;
      transition: all 0.3s ease;
    }

    & img.ong:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    & button.heart {
      position: absolute;
      padding: 0;
      top: 4vw;
      right: -17px;
      width: 50px;
      height: 50px;
      background: none;
      cursor: pointer;
      transition: transform 0.2s ease;
      border: none;

      & img {
        width: 100%;
        height: 100%;
      }
    }

    & button.heart:hover {
      transform: scale(1.05);
    }
  }
}

/* ✅ DOAÇÕES AJUSTADAS - FUNDO CINZA MANTIDO */
.doacoes {
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
  background-color: #F3F3F3;

  & h2 {
    font-size: 2rem;
    color: #2563EB;
    font-weight: 600;
  }
}

/* ✅ REGISTROS AJUSTADOS - FUNDO BRANCO MANTIDO */
.registros {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* ✅ Reduzido de 1.5rem */
  background-color: white;
  /* ✅ MANTIDO - Fundo branco dos "recibos" */
  padding: 1vw;
  /* ✅ Reduzido de 1vw */
  border-radius: 12px;
  /* ✅ Reduzido de 20px */
  font-size: 0.95rem;
  /* ✅ Reduzido de 1.1rem */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  /* ✅ Sombra mais sutil */

  & h2 {
    color: #0062ff;
    font-size: 1.1rem;
    /* ✅ Reduzido */
    font-weight: 600;
    margin: 0 0 1rem 0;
    /* ✅ Reduzido */
    padding-bottom: 0.5rem;
    /* ✅ Reduzido */
    border-bottom: 1px solid #e2e8f0;
    /* ✅ Borda mais fina */
  }

  & table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    /* ✅ Reduzido */
    overflow: hidden;
  }

  & tr.titulos {
    background: #f8fafc;

    & th {
      font-weight: 600;
      /* ✅ Reduzido de 900 */
      color: #000000;
      /* ✅ Cor mais suave */
      padding: 0.75rem;
      /* ✅ Reduzido */
      text-align: left;
      font-size: 1rem;
      /* ✅ Reduzido */
    }
  }

  & .infos {

    & th {
      font-weight: 500;
      /* ✅ Reduzido de 900 */
      color: #36465f;
      /* ✅ Cor mais suave */
      padding: 0.75rem;
      /* ✅ Reduzido */
      text-align: left;
      border-bottom: 1px solid #f1f5f9;
      font-size: 1rem;
      /* ✅ Reduzido */
    }
  }

  & .preco {
    font-weight: 600;
    /* ✅ Reduzido de 900 */
    color: #001033;
    /* ✅ Cor mais suave */
    font-size: 1.2rem;
    /* ✅ Reduzido */
    margin-top: 1rem;
    /* ✅ Reduzido */
    text-align: end;
  }
}

/* ✅ FILTROS AJUSTADOS */
.filtros {
  background: white;
  /* ✅ MANTIDO */
  padding: 1.25rem;
  /* ✅ Reduzido de 1.5rem */
  border-radius: 12px;
  /* ✅ Reduzido */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  /* ✅ Sombra mais sutil */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* ✅ Reduzido de 1.5rem */
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: fit-content;

  & h3 {
    color: #374151;
    font-weight: 600;
    font-size: 1rem;
    /* ✅ Reduzido */
    margin: 0;
    padding-bottom: 0.5rem;
    /* ✅ Reduzido */
    border-bottom: 1px solid #f1f5f9;
    /* ✅ Borda mais fina */
  }

  & p {
    font-size: 0.75rem;
    /* ✅ Reduzido */
    color: #64748b;
    /* ✅ Cor mais suave */
    margin: 0.25rem 0;
    /* ✅ Reduzido */
    font-weight: 500;
  }

  & label {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    /* ✅ Mantido */
    font-weight: 500;
    color: #374151;

    &.input {
      flex-direction: column;

      & input[type="radio"] {
        margin-right: 0.5rem;
        color: #2563EB;
        transform: scale(1);
      }
    }
  }

  & select {
    padding: 0.625rem;
    /* ✅ Reduzido */
    border: 1px solid #d1d5db;
    /* ✅ Borda mais fina */
    border-radius: 8px;
    /* ✅ Reduzido */
    background: white;
    font-size: 0.875rem;
    /* ✅ Reduzido */
    transition: all 0.2s ease;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: #2563EB;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
      /* ✅ Sombra menor */
    }

    &:hover {
      border-color: #9ca3af;
    }
  }
}

/* ✅ GRID DE DOAÇÕES AJUSTADO */
.doacoes-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  /* ✅ Reduzido de 2rem */
  margin-top: 1rem;

  & .registros-conteiner {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    /* ✅ Reduzido */
  }
}

/* ✅ PLACEHOLDER DO GRÁFICO */
.grafico-placeholder {
  background: white;
  border-radius: 12px;
  /* ✅ Reduzido */
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  /* ✅ Sombra mais sutil */
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* ✅ RESPONSIVIDADE */
@media (max-width: 1024px) {
  .main-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .sidebar {
    position: static;
    order: -1;
  }

  .doacoes-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    /* ✅ Reduzido */
  }
}

@media (max-width: 768px) {
  .main-container {
    padding: 1rem;
  }

  .sidebar {
    padding: 1.5rem 1rem;

    & h2 {
      font-size: 2.5rem;
    }

    & nav a {
      padding: 12px 16px;
      font-size: 0.9rem;

      .nav-icon {
        width: 20px;
        height: 20px;
      }
    }
  }

  section div.grid {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .favoritas .lista-ongs .ong-item button.heart {
    top: 3vw;
    right: -10px;
    width: 40px;
    height: 40px;
  }

  /* ✅ Responsividade das doações ajustada */
  .doacoes {
    padding: 1rem 1.25rem;
    /* ✅ Reduzido */
  }

  .registros {
    padding: 1rem;
    /* ✅ Reduzido */

    & tr.titulos th,
    & .infos th {
      padding: 0.5rem;
      /* ✅ Reduzido */
      font-size: 0.8rem;
      /* ✅ Reduzido */
    }

    & .preco {
      font-size: 0.9rem;
      /* ✅ Reduzido */
      padding: 0.5rem;
      /* ✅ Reduzido */
    }
  }

  .filtros {
    padding: 1rem;
    /* ✅ Reduzido */
  }
}
</style>
