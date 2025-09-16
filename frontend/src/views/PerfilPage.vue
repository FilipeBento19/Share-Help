<template>
  <!-- Verificação se usuário está logado -->
  <div v-if="!user && !isLoading" class="box-nao-logado">
    <p>Você não está logado.</p>
    <router-link to="/login">Ir para Login</router-link>
  </div>

  <div class="main-container" v-else>
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Gerenciamento de conta</h2>
      <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
          <span class="nav-icon">👤</span>
          Informações pessoais
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">🔐</span>
          Login e conta
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">⭐</span>
          ONGs favoritadas
        </a>
        <a href="#" class="nav-item">
          <span class="nav-icon">📊</span>
          Registros de doação
        </a>
      </nav>
    </aside>

    <main class="conteudo">
      <div>
        <!-- Informações pessoais -->
        <section id="info" class="secao">
          <div id="backCinza">
            <h2>Informações pessoais</h2>
            <p>Essa informação é particular e não
              será compartilhada com outras
              pessoas. Configure suas informações
              agora!</p>
          </div>
          <div>
            <div class="grid">
              <label for="user.name">
                Nome verdadeiro
                <input v-model="user.nome" />
              </label>
              <label for="user.telefone">
                Telefone
                <input v-model="user.telefone" />
              </label>
              <label for="user.data_nascimento">
                Data de nascimento
                <input v-model="user.data_nascimento" />
              </label>
            </div>
            <button class="azul" @click="updateProfile">Salvar e Verificar</button>
          </div>
        </section>

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
              <input type="password" />
            </label>
            <label for="">
              Confirmar senha
              <input type="password" />
            </label>
            <div class="acoes">
              <button @click="logout" class="vermelho">Desconectar</button>
              <button class="azul">Salvar e Verificar</button>
            </div>
          </div>
        </section>

        <!-- Ongs favoritas -->
        <section id="ongs" class="secao">
          <h2>Ongs favoritas</h2>
          <div v-if="user.ongs && user.ongs.length" class="lista-ongs">
            <div v-for="ong in user.ongs" :key="ong.id" class="ong-item">
              <img :src="ong.logo" alt="ong" />
              ❤️
            </div>
          </div>
          <p v-else>Você ainda não favoritou nenhuma ONG.</p>
        </section>

        <!-- Registros de doação -->
        <section id="doacoes" class="secao">
          <h2>Registros de doação</h2>
          <div v-if="user.doacoes && user.doacoes.length" class="grafico">
            <p>Gráfico de doações aparecerá aqui</p>
          </div>
          <p v-else>Nenhuma doação registrada ainda.</p>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const user = ref(null);
const error = ref(null);
const isLoading = ref(false);
const success = ref("")

const getProfile = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      error.value = "Você não está logado.";
      return;
    }

    const response = await axios.get("http://127.0.0.1:8000/api/perfil/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
  alert("Você saiu da conta.");
  window.location.href = "/login";
};

onMounted(() => {
  getProfile();
});

const updateProfile = async () => {
  isLoading.value = true
  error.value = ""
  success.value = ""

  try {
    const token = localStorage.getItem("access_token")
    await axios.put("http://127.0.0.1:8000/api/perfil/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    success.value = "Perfil atualizado com sucesso!"
  } catch {
    error.value = "Erro ao atualizar perfil"
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped>
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

  }
}

section {
  display: grid;
  grid-template-columns: 430px 1fr;
  gap: 2rem;
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
  align-items: center;
}

.favoritas img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
}

.favoritas .heart {
  color: #2563EB;
  font-size: 1.5rem;
}

/* Registros */
.registros {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
