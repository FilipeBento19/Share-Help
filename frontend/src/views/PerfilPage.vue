  <template>
    <!-- Verificação se usuário está logado -->
    <div v-if="!user && !isLoading" class="box-nao-logado">

    </div>

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

          <!-- Ongs favoritas -->
          <section id="ongs" class="favoritas">
            <h2>Ongs favoritas</h2>
            <div v-if="favoritasList.length" class="lista-ongs">
              <div v-for="ong in favoritasList" :key="ong.id" class="ong-item">
                <img :src="ong.img" :alt="ong.title" class="ong" />
                <button class="heart" @click="unfavorite(ong.id)" aria-label="Remover dos favoritos">
                  <img src="/icons/heart-solid-full.svg" alt="desfavoritar" />
                </button>
              </div>
            </div>
            <p v-else>Você ainda não favoritou nenhuma ONG.</p>
          </section>

          <!-- Registros de doação -->
          <section id="doacoes" class="doacoes">
            <h2>Registros de doação</h2>

            <!-- Quando for gráfico -->
            <template v-if="filtroTipo === 'Gráfico'">
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
                  <h3>Filtros</h3>

                  <label>
                    Tipo de registro:
                    <select v-model="filtroTipo">
                      <option value="">Texto</option>
                      <option value="Gráfico">Gráfico</option>
                    </select>
                  </label>

                  <p>Tipo de texto:</p>
                  <label class="input">
                    <input type="radio" value="simplificada" v-model="tipoTexto" />
                    Simplificada

                    <input type="radio" value="detalhada" v-model="tipoTexto" />
                    Detalhada
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
    <div>
      <FooterComponent />
    </div>
  </template>

<script setup>
import Swal from "sweetalert2"
import { ref, onMounted, computed } from "vue";
import api from "@/config/api.js"; // ← Importa o service
import ongs from "@/data/ongsData";
import FooterComponent from "@/components/FooterComponent.vue";
import graficComponent from "@/components/graficComponent.vue";

const favoritas = ref([])
const tipoTexto = ref("simplificada")
const user = ref(null);
const error = ref(null);
const isLoading = ref(false);

const getProfile = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "Você não está logado.";
      return;
    }

    // ✅ Usa o service da API - o token é adicionado automaticamente pelo interceptor
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

const favoritasList = computed(() => {
  return ongs.filter(o => favoritas.value.includes(o.id))
})

onMounted(() => {
  getProfile()

  //favoritos
  favoritas.value = JSON.parse(localStorage.getItem('favoritas') || '[]')

  //doacoa
  doacoes.value = JSON.parse(localStorage.getItem('doacoes') || '[]')

  // ouvinte para atualizar se outra aba/modulo mudou o localStorage
  window.addEventListener('storage', () => {
    favoritas.value = JSON.parse(localStorage.getItem('favoritas') || '[]')
  })

  // opcional: evento custom para atualizações dentro da mesma aba
  window.addEventListener('favoritasUpdated', () => {
    favoritas.value = JSON.parse(localStorage.getItem('favoritas') || '[]')
  })
})

function unfavorite(id) {
  let saved = JSON.parse(localStorage.getItem('favoritas') || '[]')
  if (saved.includes(id)) {
    saved = saved.filter(i => i !== id)
    localStorage.setItem('favoritas', JSON.stringify(saved))
    favoritas.value = saved
  }
}

//Doacoes
const filtroTipo = ref(""); // Texto ou Gráfico

const doacoes = ref([]);

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

</script>

<style scoped>
.box-nao-logado {
  width: 10vw;
  height: 1000vw;
}

.main-container {
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 160px;
  padding: 32px 0;
  min-height: calc(100vh - 200px);
}

.conteudo {
  margin-top: 7vw;
}

/* Sidebar */
.sidebar {
  width: 420px;

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

section {
  display: grid;
  grid-template-columns: 430px 1fr;
  gap: 2rem;
  padding: 0 1.5vw 0 0;
  margin: 2rem auto;
  max-width: 1500px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  & #backCinza {
    background-color: #F3F3F3;
    padding: 2vw 2vw;

    & h2 {
      color: #2563EB;
      font-size: 2rem;
      font-weight: 700;

    }

    & p {
      color: #666B73;
      font-size: 1rem;
    }
  }

  /* Inputs */
  div.grid {
    padding: 2vw 0 1vw 0;

    & label {
      color: #2563EB;
      font-weight: 700;
      font-size: 13px;
    }

    & input {
      display: block;
      width: 100%;
      margin-bottom: 0.6rem;
      padding: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      background: #f9fafb;
    }

    & input:focus {
      outline: none;
      border-color: #5588f7;
    }
  }

  & button {
    margin: 0 1vw 1vw 0;
    padding: 0.6rem 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
    transition: background 0.2s ease;
  }

  & button.azul {
    background: white;
    color: #2563EB;
    border: #2563EB solid 1.5px;
  }

  & button.azul:hover {
    background: #d3e1ff;
  }

  & button.vermelho {
    background: white;
    color: #dc2626;
    border: #dc2626 solid 1.5px;
  }

  & button.vermelho:hover {
    background: #ffefef;
  }
}



/* Botões */


/* Ongs Favoritas */
.favoritas {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 15px 30px;

  & h2 {
    color: #2563EB;
    font-weight: 600;

  }

  & .lista-ongs {
    display: flex;

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
    }

    & button.heart:hover {
      transform: scale(1.05)
    }
  }


}



/* Registros */

.doacoes {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  padding: 15px 30px;
  background-color: #F3F3F3;

  & h2 {
    font-size: 1.5rem;
    color: #2563EB;
    font-weight: 600;
  }
}

.registros {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: white;
  padding: 1vw;
  border-radius: 20px;
  font-size: 1.1rem;

  & tr.titulos th {
    font-weight: 900;
    color: #22438C;
  }

  & .preco {
    font-weight: 900;
    color: #22438C;
  }

  & .infos {
    font-weight: 900;
    color: #2563EB;
  }
}

.filtros {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & p {
    font-weight: 600;
    color: #0051ff;
  }
}

.filtros label {
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 2rem;
  font-weight: 600;
  color: #002880;
  align-items: baseline;
  justify-items: center;
}

.filtros label.input {
  display: grid;
  grid-template-columns: 0.2fr 0fr;
  gap: 1rem;
  font-weight: 600;
  color: #002880;
  justify-items: start
}

.filtros select {
  margin-top: 4px;
  padding: 0.4rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.doacoes-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 1rem;
}
</style>
