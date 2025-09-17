<template>
  <div class="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-hidden': sidebarEscondida }">
      <div class="sidebar-content">
        <!-- Título -->
        <h1 class="sidebar-title">Mapa de Pontos de Doação</h1>

        <!-- Tipo de Doação -->
        <div class="filter-group">
          <h3 class="filter-label">Tipo de Doação</h3>
          <div class="checkbox-list">
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.roupas" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Roupas</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.alimentos" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Alimentos</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.brinquedos" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Brinquedos</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.livros" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Livros</span>
            </label>
          </div>
        </div>

        <!-- Categorias -->
        <div class="filter-group">
          <h3 class="filter-label">CATEGORIAS</h3>
          <div class="checkbox-list">
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.criancas" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">ONGs Crianças</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.idosos" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">ONGs Idosos</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.moradores_rua" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Moradores de Rua</span>
            </label>
          </div>
        </div>

        <!-- Filtro por Horários -->
        <div class="filter-group">
          <h3 class="filter-label">FILTRAR POR HORÁRIO</h3>
          <div class="checkbox-list">
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.abertoAgora" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Aberto Agora</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.aberto24h" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">24 Horas</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.horarioComercial" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Horário Comercial (8h-18h)</span>
            </label>
            <label class="checkbox-item">
              <input type="checkbox" v-model="filtros.periodoTarde" @change="aplicarFiltrosComAnimacao">
              <span class="checkbox-custom"></span>
              <span class="checkbox-text">Período da Tarde</span>
            </label>
          </div>
        </div>

        <!-- Botão Toggle Sidebar -->
        <div class="sidebar-footer">
          <button
            class="sidebar-toggle"
            @click="toggleSidebar"
            :title="'Esconder filtros'"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span class="toggle-text">Esconder Filtros</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Botão de Mostrar (quando sidebar está escondida) -->
    <button
      v-if="sidebarEscondida"
      class="sidebar-show-button"
      @click="toggleSidebar"
      title="Mostrar filtros"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </button>

    <!-- Map Area -->
    <main class="map-area" :class="{ 'map-expanded': sidebarEscondida }">
      <!-- Search Bar -->
      <div class="search-wrapper">
        <div class="search-container">
          <input
            v-model="termoPesquisa"
            @input="aplicarFiltrosComAnimacao"
            type="text"
            placeholder="Buscar ponto de doação..."
            class="search-input"
          />
        </div>
      </div>

      <!-- Leaflet Map -->
      <div class="map-container">
        <l-map
          ref="map"
          style="height: 100%; width: 100%"
          :zoom="zoom"
          :center="center"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <l-marker
            v-for="ponto in pontosDoacao"
            :key="ponto.id"
            :lat-lng="ponto.coordenadas"
            :class="{ 'marker-hidden': !pontoVisivel(ponto) }"
          >
            <l-icon
              :icon-size="[24, 24]"
              :icon-anchor="[12, 12]"
              class-name="custom-marker"
            >
              <div
                class="marker-circle"
                :class="[
                  getMarkerClass(ponto),
                  { 'marker-animating-out': !pontoVisivel(ponto) }
                ]"
              >
                <div class="marker-icon"></div>
              </div>
            </l-icon>

            <l-popup v-if="pontoVisivel(ponto)">
              <div class="popup-content">
                <h4>{{ ponto.nome }}</h4>
                <div class="popup-info">
                  <p><strong>Categoria:</strong> {{ ponto.categoria }}</p>
                  <p><strong>Aceita:</strong> {{ formatarTipos(ponto.tipos) }}</p>
                  <p><strong>Endereço:</strong> {{ ponto.endereco }}</p>
                  <p><strong>Horário:</strong> {{ ponto.horario }}</p>
                  <p v-if="ponto.telefone"><strong>Telefone:</strong> {{ ponto.telefone }}</p>
                  <p v-if="ponto.descricao" class="descricao">{{ ponto.descricao }}</p>
                </div>
                <button class="route-button" @click="abrirRota(ponto.coordenadas)">
                  Como Chegar
                </button>
              </div>
            </l-popup>
          </l-marker>

          <l-control-zoom position="bottomright" />
        </l-map>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { LMap, LTileLayer, LControlZoom, LMarker, LIcon, LPopup } from '@vue-leaflet/vue-leaflet'

const zoom = ref(12)
const center = ref([-26.3044, -48.8487])
const termoPesquisa = ref('')

// Estado para controlar se a sidebar está escondida
const sidebarEscondida = ref(false)

const filtros = ref({
  roupas: false,
  alimentos: false,
  brinquedos: false,
  livros: false,
  criancas: false,
  idosos: false,
  moradores_rua: false,
  abertoAgora: false,
  aberto24h: false,
  horarioComercial: false,
  periodoTarde: false
})

// Estado para controlar animações
const pontosAnimando = ref(new Set())

// Função para toggle da sidebar
const toggleSidebar = () => {
  sidebarEscondida.value = !sidebarEscondida.value
}

const pontosDoacao = ref([
  // ONGs para Crianças
  {
    id: 1,
    nome: 'Associação de Amigos das Crianças do Lar Abdon Batista',
    categoria: 'ONGs Crianças',
    tipos: ['roupas', 'alimentos'],
    endereco: 'R. Pres. Affonso Penna, 680 - Bucarein, Joinville - SC',
    horario: '08:00 - 18:00',
    telefone: '(47) 3422-6944',
    coordenadas: [-26.3044, -48.8487],
    descricao: 'Acolhemos crianças que não podem estar com suas famílias no momento.'
  },
  {
    id: 2,
    nome: 'OMUNGA Grife Social e Instituto',
    categoria: 'ONGs Crianças',
    tipos: ['livros'],
    endereco: 'Rua Dona Francisca, 8300 - Sala 307 - Distrito Industrial',
    horario: '08:30 - 17:30',
    telefone: '(47) 33056716',
    coordenadas: [-26.2744, -48.8187],
    descricao: 'Organização que leva educação para comunidades vulneráveis.'
  },
  {
    id: 3,
    nome: 'Missão Criança Jardim Paraíso',
    categoria: 'ONGs Crianças',
    tipos: ['brinquedos', 'roupas'],
    endereco: 'R. Crux, 450 - Jardim Paraíso, Joinville - SC',
    horario: '08:00 - 17:00',
    telefone: '(47) 39031827',
    coordenadas: [-26.3244, -48.8687],
    descricao: 'Há 28 anos transformando vidas no contraturno escolar.'
  },
  {
    id: 4,
    nome: 'Associação Ecos de Esperança',
    categoria: 'ONGs Crianças',
    tipos: ['roupas', 'brinquedos', 'alimentos'],
    endereco: 'R. Osvaldo Valcanaia, 766 - Paranaguamirim, Joinville - SC',
    horario: '08:00 - 17:00',
    telefone: '(47) 34230104',
    coordenadas: [-26.2844, -48.8787],
    descricao: 'Instituição cristã dedicada à proteção de crianças e adolescentes.'
  },
  {
    id: 5,
    nome: 'Instituto Conforme',
    categoria: 'ONGs Crianças',
    tipos: ['roupas', 'brinquedos', 'alimentos'],
    endereco: 'R. do Campo, 315 - Morro do Meio, Joinville - SC',
    horario: '08:00 - 17:00',
    telefone: '(47) 34266602',
    coordenadas: [-26.3344, -48.8887],
    descricao: 'Atendemos famílias em vulnerabilidade com projetos e palestras.'
  },
  {
    id: 6,
    nome: 'Associação Casa do Adalto',
    categoria: 'ONGs Crianças',
    tipos: ['roupas', 'alimentos'],
    endereco: 'R. Inambu, 3.290 - Costa e Silva, Joinville - SC',
    horario: '08:00 - 18:00',
    telefone: '(47) 34381629',
    coordenadas: [-26.2644, -48.8287],
    descricao: 'Apoio às crianças e adolescentes com neoplasia.'
  },
  {
    id: 7,
    nome: 'Projeto Resgate',
    categoria: 'ONGs Crianças',
    tipos: ['roupas', 'brinquedos', 'livros'],
    endereco: 'R. XV de Novembro, 780 - Centro, Joinville - SC',
    horario: '13:00 - 18:00',
    telefone: '(47) 996950330',
    coordenadas: [-26.3000, -48.8450],
    descricao: 'Oferecemos um ambiente acolhedor para fortalecer vínculos familiares.'
  },
  {
    id: 8,
    nome: 'Casa Lar Emanuel',
    categoria: 'ONGs Crianças',
    tipos: ['roupas', 'alimentos'],
    endereco: 'Rua Padre Roma, 339 - João Costa, Joinville - SC',
    horario: '08:00 - 18:00',
    telefone: '(47) 3436-2999',
    coordenadas: [-26.3144, -48.8387],
    descricao: 'Acolhe crianças e adolescentes de 0 a 12 anos conforme o ECA.'
  },
  {
    id: 9,
    nome: 'Instituto Caranguejo',
    categoria: 'ONGs Crianças',
    tipos: ['roupas', 'alimentos'],
    endereco: 'R. Ten. Antônio João, 4296 - Jardim Sofia, Joinville - SC',
    horario: '08:00 - 18:00',
    telefone: '(47) 3473-0772',
    coordenadas: [-26.3444, -48.8987],
    descricao: 'Instituto de Educação Ambiental com trabalhos pedagógicos.'
  },

  // ONGs para Idosos
  {
    id: 10,
    nome: 'Lar do Idoso Betânia',
    categoria: 'ONGs Idosos',
    tipos: ['roupas'],
    endereco: 'R. Dr. Plácido Olímpio de Oliveira, 565 - Bucarein',
    horario: '08:00 - 17:00',
    telefone: '(47) 34225258',
    coordenadas: [-26.3044, -48.8587],
    descricao: 'ILPI que oferece cuidados para até 50 idosos.'
  },
  {
    id: 11,
    nome: 'Ventura Residence - Residencial de Idosos',
    categoria: 'ONGs Idosos',
    tipos: ['alimentos'],
    endereco: 'Av. Cel. Procópio Gomes, 669 - Bucarein',
    horario: '07:00 - 19:00',
    telefone: '(47) 30296600',
    coordenadas: [-26.3144, -48.8687],
    descricao: 'Residencial para hóspedes acima de 60 anos.'
  },
  {
    id: 12,
    nome: 'Associação Beneficente Lar Renascer',
    categoria: 'ONGs Idosos',
    tipos: ['roupas', 'livros', 'alimentos'],
    endereco: 'R. Dep. Lauro Carneiro de Loyola, 836 - Iririú',
    horario: 'Aberto 24H',
    telefone: '(47) 3227-7910',
    coordenadas: [-26.2844, -48.8387],
    descricao: 'Acolhimento de mulheres idosas em vulnerabilidade social.'
  },
  {
    id: 13,
    nome: 'Centro Integrado João de Paula - Exército da Salvação',
    categoria: 'ONGs Idosos',
    tipos: ['alimentos', 'roupas'],
    endereco: 'R. XV de Novembro, 3165 - Glória, Joinville - SC',
    horario: '09:00 - 17:00',
    telefone: '(47) 3453-0588',
    coordenadas: [-26.3244, -48.8487],
    descricao: 'Apoio a pessoas em vulnerabilidade, principalmente idosos.'
  },
  {
    id: 14,
    nome: 'Casa de Repouso Lar Aconchego',
    categoria: 'ONGs Idosos',
    tipos: ['alimentos', 'livros'],
    endereco: 'R. Adhemar de Barros, 47 - Bucarein, Joinville - SC',
    horario: 'Aberto 24H',
    telefone: '(47) 99684-3724',
    coordenadas: [-26.3044, -48.8687],
    descricao: 'Ambiente acolhedor com acompanhamento 24h.'
  },
  {
    id: 15,
    nome: 'Casa de Repouso Bom Retiro',
    categoria: 'ONGs Idosos',
    tipos: ['alimentos', 'livros'],
    endereco: 'R. Max Colin, 155 - Centro, Joinville - SC',
    horario: '09:00 - 19:00',
    telefone: '(47) 98494-7572',
    coordenadas: [-26.3000, -48.8550],
    descricao: 'Cuidado integral de pessoas idosas com atendimento humanizado.'
  },
  {
    id: 16,
    nome: 'Casa de Repouso SILOÉ',
    categoria: 'ONGs Idosos',
    tipos: ['alimentos', 'livros'],
    endereco: 'R. Copacabana, 1109 - Floresta, Joinville - SC',
    horario: '09:00 - 17:00',
    telefone: '(47) 99668-7569',
    coordenadas: [-26.3344, -48.8787],
    descricao: 'Cuidado e bem-estar da pessoa idosa com atenção individualizada.'
  },
  {
    id: 17,
    nome: 'Ação Social Joinville',
    categoria: 'ONGs Idosos',
    tipos: ['roupas', 'alimentos'],
    endereco: 'Av. Cel. Procópio Gomes, 219 - Bucarein, Joinville - SC',
    horario: '08:00 - 17:00',
    telefone: '(47) 3422-6204',
    coordenadas: [-26.3144, -48.8587],
    descricao: 'Trabalho dedicado ao cuidado de idosos em vulnerabilidade.'
  },

  // ONGs para Moradores de Rua
  {
    id: 18,
    nome: 'Casa de Passagem Santo Egídio',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['roupas', 'alimentos'],
    endereco: 'R. Alexandre Schlemm, 850 - Anita Garibaldi',
    horario: '24H',
    telefone: '(47) 997887356',
    coordenadas: [-26.3244, -48.8487],
    descricao: 'Casa que acolhe pessoas em situação de rua e migrantes.'
  },
  {
    id: 19,
    nome: 'Casa da Vó Joaquina',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['roupas', 'alimentos'],
    endereco: 'R. Erivelto Martins, 669 - Ulysses Guimarães',
    horario: '09:00 - 17:00',
    telefone: '',
    coordenadas: [-26.3344, -48.8787],
    descricao: 'Fundada em 1994, atua no acolhimento de pessoas em vulnerabilidade.'
  },
  {
    id: 20,
    nome: 'Centro de Referência População em Situação de Rua',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['roupas', 'alimentos', 'brinquedos', 'livros'],
    endereco: 'Rua Paraíba, 937 – Anita Garibaldi, Joinville – SC',
    horario: '07:00 - 19:00',
    telefone: '(47) 3422-7445',
    coordenadas: [-26.3144, -48.8587],
    descricao: 'Acolhimento garantindo acesso a direitos e reintegração social.'
  },
  {
    id: 21,
    nome: 'Centro de Atenção Psicossocial em Álcool e outras Drogas',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['alimentos', 'livros'],
    endereco: 'Rua Doutor Plácido Olímpio de Oliveira, 1489 – Anita Garibaldi',
    horario: '07:00 - 18:00',
    telefone: '(47) 3423-3367',
    coordenadas: [-26.3244, -48.8687],
    descricao: 'Cuidado de pessoas com problemas relacionados ao uso de álcool e drogas.'
  },
  {
    id: 22,
    nome: 'Restaurante Popular Herbert José de Souza',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['alimentos'],
    endereco: 'R. Urussanga, 442 - Bucarein, Joinville - SC',
    horario: '09:00 - 19:00',
    telefone: '(47) 3433-0153',
    coordenadas: [-26.2944, -48.8687],
    descricao: 'Oferece refeições saudáveis e acessíveis.'
  },
  {
    id: 23,
    nome: 'Restaurante Popular Zilda Arns',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['alimentos'],
    endereco: 'Av. Alwino Hansen, 65 - Adhemar Garcia',
    horario: '09:00 - 19:00',
    telefone: '(47) 3804-0154',
    coordenadas: [-26.3444, -48.8287],
    descricao: 'Refeições nutritivas a preços populares promovendo dignidade.'
  },
  {
    id: 24,
    nome: 'Casa de Levi - Comunidade Eis-me Aqui',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['alimentos', 'roupas'],
    endereco: 'Rua Voluntários da Pátria, 105 – Itaum, Joinville – SC',
    horario: '17:00 - 19:00',
    telefone: '(47) 9718-4655',
    coordenadas: [-26.3144, -48.8787],
    descricao: 'Iniciativa comunitária de acolhimento a pessoas em vulnerabilidade.'
  },
  {
    id: 25,
    nome: 'Centro de Atendimento às Famílias Carentes Sementes do Futuro',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['alimentos', 'livros', 'roupas', 'brinquedos'],
    endereco: 'R. dos Comerciários, 116 - Petrópolis, Joinville - SC',
    horario: '14:00 - 17:00',
    telefone: '(47) 9989-4529',
    coordenadas: [-26.3244, -48.8987],
    descricao: 'Apoio a famílias com foco na proteção de crianças.'
  },
  {
    id: 26,
    nome: 'Associação de Apoio a Reabilitação de Pessoas Necessitadas',
    categoria: 'ONGs Moradores de Rua',
    tipos: ['livros', 'alimentos', 'roupas'],
    endereco: 'R. Blumenau, 178 - Centro, Joinville - SC',
    horario: '09:00 - 17:00',
    telefone: '(47) 3029-1091',
    coordenadas: [-26.3000, -48.8650],
    descricao: 'Reabilitação social, emocional e física de pessoas em vulnerabilidade.'
  }
])

// Função para obter horário atual (simulado para demonstração)
const obterHorarioAtual = () => {
  const agora = new Date()
  const hora = agora.getHours()
  const minutos = agora.getMinutes()
  return { hora, minutos }
}

// Função para verificar se está aberto agora
const estaAbertoAgora = (horario) => {
  if (horario.includes('24H') || horario.includes('Aberto 24H')) {
    return true
  }

  const { hora: horaAtual } = obterHorarioAtual()

  // Regex para extrair horários no formato HH:MM - HH:MM
  const regex = /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
  const match = horario.match(regex)

  if (match) {
    const horaInicio = parseInt(match[1])
    const horaFim = parseInt(match[3])

    return horaAtual >= horaInicio && horaAtual <= horaFim
  }

  return false
}

// Função para verificar se é 24h
const eh24Horas = (horario) => {
  return horario.includes('24H') || horario.includes('Aberto 24H')
}

// Função para verificar se é horário comercial (8h-18h)
const ehHorarioComercial = (horario) => {
  const regex = /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
  const match = horario.match(regex)

  if (match) {
    const horaInicio = parseInt(match[1])
    const horaFim = parseInt(match[3])

    return horaInicio >= 8 && horaFim <= 18
  }

  return false
}

// Função para verificar se funciona no período da tarde
const ehPeriodoTarde = (horario) => {
  const regex = /(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/
  const match = horario.match(regex)

  if (match) {
    const horaInicio = parseInt(match[1])
    const horaFim = parseInt(match[3])

    // Considera período da tarde se funciona das 13h às 18h ou similar
    return horaInicio >= 12 && horaFim >= 17
  }

  return false
}

// Função para verificar se um ponto deve ser visível
const pontoVisivel = (ponto) => {
  // Filtros de tipo de doação
  const tipoSelecionado = filtros.value.roupas || filtros.value.alimentos ||
                         filtros.value.brinquedos || filtros.value.livros

  if (tipoSelecionado) {
    const tipoMatch =
      (filtros.value.roupas && ponto.tipos.includes('roupas')) ||
      (filtros.value.alimentos && ponto.tipos.includes('alimentos')) ||
      (filtros.value.brinquedos && ponto.tipos.includes('brinquedos')) ||
      (filtros.value.livros && ponto.tipos.includes('livros'))

    if (!tipoMatch) return false
  }

  // Filtros de categoria
  const categoriaSelecionada = filtros.value.criancas || filtros.value.idosos ||
                               filtros.value.moradores_rua

  if (categoriaSelecionada) {
    const categoriaMatch =
      (filtros.value.criancas && ponto.categoria === 'ONGs Crianças') ||
      (filtros.value.idosos && ponto.categoria === 'ONGs Idosos') ||
      (filtros.value.moradores_rua && ponto.categoria === 'ONGs Moradores de Rua')

    if (!categoriaMatch) return false
  }

  // Filtros de horário
  const horarioSelecionado = filtros.value.abertoAgora || filtros.value.aberto24h ||
                             filtros.value.horarioComercial || filtros.value.periodoTarde

  if (horarioSelecionado) {
    const horarioMatch =
      (filtros.value.abertoAgora && estaAbertoAgora(ponto.horario)) ||
      (filtros.value.aberto24h && eh24Horas(ponto.horario)) ||
      (filtros.value.horarioComercial && ehHorarioComercial(ponto.horario)) ||
      (filtros.value.periodoTarde && ehPeriodoTarde(ponto.horario))

    if (!horarioMatch) return false
  }

  // Filtro de pesquisa por texto
  if (termoPesquisa.value) {
    const termo = termoPesquisa.value.toLowerCase()
    return ponto.nome.toLowerCase().includes(termo) ||
           ponto.endereco.toLowerCase().includes(termo)
  }

  return true
}

const aplicarFiltrosComAnimacao = () => {
  console.log('Filtros aplicados:', filtros.value)

  // Primeiro identifica os pontos que vão sair
  pontosDoacao.value.forEach(ponto => {
    if (!pontoVisivel(ponto)) {
      pontosAnimando.value.add(ponto.id)
    }
  })

  // Remove os pontos da animação após o tempo da transição
  setTimeout(() => {
    pontosAnimando.value.clear()
  }, 400)
}

const abrirRota = (coordenadas) => {
  const [lat, lng] = coordenadas
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  window.open(url, '_blank')
}

const getMarkerClass = (ponto) => {
  if (ponto.categoria.includes('Crianças')) return 'marker-criancas'
  if (ponto.categoria.includes('Idosos')) return 'marker-idosos'
  if (ponto.categoria.includes('Moradores de Rua')) return 'marker-moradores-rua'
  return 'marker-default'
}

const formatarTipos = (tipos) => {
  return tipos.map(tipo => {
    const nomes = {
      'roupas': 'Roupas',
      'alimentos': 'Alimentos',
      'brinquedos': 'Brinquedos',
      'livros': 'Livros'
    }
    return nomes[tipo] || tipo
  }).join(', ')
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #2d3748;
  background: #f8fafc;
  height: 100vh;
  overflow: hidden;
}

.app-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
}

.sidebar {
  width: 320px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 4px rgba(0,0,0,0.02);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 100;
}

.sidebar-hidden {
  transform: translateX(-100%);
}

.sidebar-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 32px;
  line-height: 1.3;
}

/* Botão Toggle dentro da Sidebar */
.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.sidebar-toggle {
  width: 100%;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
}

.sidebar-toggle:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  color: #2d3748;
}

.sidebar-toggle:active {
  transform: scale(0.98);
}

.toggle-text {
  user-select: none;
}

/* Botão de Mostrar (quando sidebar está escondida) */
.sidebar-show-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #4a5568;
}

.sidebar-show-button:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #2d3748;
}

.sidebar-show-button:active {
  transform: scale(0.95);
}

.filter-group {
  margin-bottom: 28px;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  color: #4a5568;
  transition: color 0.2s ease;
}

.checkbox-item:hover {
  color: #2d3748;
}

.checkbox-item input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  width: 16px;
  height: 16px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.checkbox-item input[type="checkbox"]:checked + .checkbox-custom {
  background: #3182ce;
  border-color: #3182ce;
  transform: scale(1.05);
}

.checkbox-item input[type="checkbox"]:focus + .checkbox-custom {
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

.checkbox-item:hover input[type="checkbox"]:not(:checked) + .checkbox-custom {
  border-color: #a0aec0;
  background: #f7fafc;
}

.checkbox-custom::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #3182ce;
  transform: scale(0);
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.checkbox-item input[type="checkbox"]:checked + .checkbox-custom::before {
  transform: scale(1);
}

.checkbox-custom::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 0px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
}

.checkbox-item input[type="checkbox"]:checked + .checkbox-custom::after {
  transform: rotate(45deg) scale(1);
  transition-delay: 0.05s;
}

.checkbox-text {
  user-select: none;
  line-height: 1.4;
}

.map-area {
  flex: 1;
  position: relative;
  background: #f8fafc;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.map-expanded {
  margin-left: -320px;
}

.search-wrapper {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
}

.search-container {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 280px;
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #2d3748;
  background: transparent;
}

.search-input::placeholder {
  color: #a0aec0;
}

.map-container {
  height: 100vh;
  width: 100%;
}

.marker-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid white;
  position: relative;
  transform: scale(1);
  opacity: 1;
}

.marker-circle:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(0,0,0,0.35);
}

/* Animação de saída para marcadores que não passam no filtro */
.marker-animating-out {
  transform: scale(0) !important;
  opacity: 0 !important;
  transition: all 0.4s cubic-bezier(0.6, 0, 0.4, 1) !important;
}

/* Animação de entrada mais suave */
.marker-circle:not(.marker-animating-out) {
  animation: markerFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes markerFadeIn {
  from {
    transform: scale(0.3);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.marker-circle::before {
  content: '';
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid currentColor;
  opacity: 0.2;
  animation: ripple 2.5s infinite;
  top: -6px;
  left: -6px;
}

.marker-animating-out::before {
  animation: none !important;
  opacity: 0 !important;
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  70% {
    transform: scale(1.4);
    opacity: 0.1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

.marker-icon {
  font-size: 18px;
  font-weight: bold;
  z-index: 10;
  position: relative;
}

/* Cores dos Marcadores por Categoria - Mais profissionais */
.marker-criancas {
  background: #e74c3c;
  color: white;
}

.marker-idosos {
  background: #27ae60;
  color: white;
}

.marker-moradores-rua {
  background: #3498db;
  color: white;
}

.marker-default {
  background: #95a5a6;
  color: white;
}

.popup-content {
  min-width: 300px;
  padding: 4px;
  font-family: inherit;
}

.popup-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
  line-height: 1.3;
}

.popup-info {
  margin-bottom: 16px;
}

.popup-info p {
  margin-bottom: 6px;
  font-size: 13px;
  color: #4a5568;
  line-height: 1.4;
}

.popup-info .descricao {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #f1f5f9;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.route-button {
  width: 100%;
  background: #3182ce;
  color: white;
  border: none;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.route-button:hover {
  background: #2c5aa0;
  transform: translateY(-1px);
}

/* Esconder marcadores completamente quando necessário */
.marker-hidden {
  display: none !important;
}

  @media (max-width: 768px) {
    .app-layout {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
      height: auto;
      max-height: 50vh;
      overflow-y: auto;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 200;
    }

    .sidebar-hidden {
      transform: translateY(-100%);
    }

    .sidebar-show-button {
      top: 10px;
      left: 10px;
    }

    .map-area {
      margin-top: 0;
    }

    .map-expanded {
      margin-left: 0;
      margin-top: 0;
    }

    .map-container {
      height: 100vh;
    }

    .search-wrapper {
      top: 70px;
      right: 10px;
    }

    .search-container {
      min-width: 200px;
    }

    .sidebar-toggle .toggle-text {
      display: none;
    }
  }
</style>
