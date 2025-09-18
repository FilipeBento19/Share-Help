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
        </l-map>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from '@vue-leaflet/vue-leaflet'
import ongs from '@/data/ongsData.js'

const zoom = ref(12)
const center = ref([-26.3044, -48.8487])
const termoPesquisa = ref('')

// Referência para o mapa
const map = ref(null)

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

// Função para toggle da sidebar COM atualização do mapa
const toggleSidebar = async () => {
  sidebarEscondida.value = !sidebarEscondida.value
  
  // Aguarda o DOM atualizar e depois força o mapa a recalcular seu tamanho
  await nextTick()
  
  // Adiciona um pequeno delay para garantir que a transição CSS terminou
  setTimeout(() => {
    if (map.value && map.value.leafletObject) {
      map.value.leafletObject.invalidateSize()
    }
  }, 350) // Tempo ligeiramente maior que a transição CSS (300ms)
}

// Computed para mapear os dados das ONGs para o formato do mapa
const pontosDoacao = computed(() => {
  return ongs.map(ong => ({
    id: ong.id,
    nome: ong.title,
    categoria: mapearCategoria(ong.categoria),
    tipos: ong.filtros,
    endereco: ong.local,
    horario: ong.horario,
    telefone: ong.telefone,
    coordenadas: ong.coordenadas,
    descricao: ong.description,
    img: ong.img
  }))
})

// Função para mapear as categorias do arquivo para o formato do mapa
const mapearCategoria = (categoria) => {
  const mapeamento = {
    'criancas': 'ONGs Crianças',
    'idosos': 'ONGs Idosos',
    'moradores-de-rua': 'ONGs Moradores de Rua'
  }
  return mapeamento[categoria] || categoria
}

// Função para obter horário atual (simulado para demonstração)
const obterHorarioAtual = () => {
  const agora = new Date()
  const hora = agora.getHours()
  const minutos = agora.getMinutes()
  return { hora, minutos }
}

// Função para verificar se está aberto agora
const estaAbertoAgora = (horario) => {
  if (horario.includes('24H') || horario.includes('Aberto 24H') || horario.includes('Aberto 24h')) {
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
  return horario.includes('24H') || horario.includes('Aberto 24H') || horario.includes('Aberto 24h')
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
  top: 850px;
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

/* ===== RESPONSIVIDADE MELHORADA ===== */

/* Tablets grandes e laptops pequenos */
@media (max-width: 1024px) {
  .sidebar {
    width: 280px;
  }
  
  .sidebar-content {
    padding: 20px;
  }
  
  .sidebar-title {
    font-size: 16px;
    margin-bottom: 24px;
  }
  
  .filter-group {
    margin-bottom: 24px;
  }
  
  .search-container {
    min-width: 240px;
  }
}

/* Tablets */
@media (max-width: 768px) {
  .sidebar {
    width: 240px;
  }
  
  .sidebar-content {
    padding: 16px;
  }
  
  .sidebar-title {
    font-size: 15px;
    margin-bottom: 20px;
  }
  
  .filter-group {
    margin-bottom: 20px;
  }
  
  .filter-label {
    font-size: 12px;
    margin-bottom: 12px;
  }
  
  .checkbox-item {
    font-size: 13px;
  }
  
  .checkbox-list {
    gap: 10px;
  }
  
  .search-wrapper {
    top: 12px;
    right: 12px;
  }
  
  .search-container {
    min-width: 200px;
    padding: 6px 10px;
  }
  
  .search-input {
    font-size: 13px;
  }
  
  .sidebar-toggle .toggle-text {
    display: none;
  }
  
  .popup-content {
    min-width: 250px;
  }
}

/* Smartphones grandes */
@media (max-width: 640px) {
  .sidebar {
    width: 200px;
  }
  
  .sidebar-content {
    padding: 12px;
  }
  
  .sidebar-title {
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.2;
  }
  
  .filter-group {
    margin-bottom: 16px;
  }
  
  .filter-label {
    font-size: 11px;
    margin-bottom: 10px;
  }
  
  .checkbox-item {
    font-size: 12px;
  }
  
  .checkbox-custom {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }
  
  .checkbox-list {
    gap: 8px;
  }
  
  .search-wrapper {
    top: 10px;
    right: 10px;
  }
  
  .search-container {
    min-width: 160px;
    padding: 5px 8px;
  }
  
  .search-input {
    font-size: 12px;
  }
  
  .sidebar-show-button {
    width: 40px;
    height: 40px;
    top: 15px;
    left: 15px;
  }
  
  .popup-content {
    min-width: 200px;
  }
  
  .popup-content h4 {
    font-size: 14px;
  }
  
  .popup-info p {
    font-size: 12px;
  }
  
  .route-button {
    padding: 8px 10px;
    font-size: 12px;
  }
}

/* Smartphones pequenos */
@media (max-width: 480px) {
  .sidebar {
    width: 180px;
  }
  
  .sidebar-content {
    padding: 10px;
  }
  
  .sidebar-title {
    font-size: 13px;
    margin-bottom: 12px;
  }
  
  .filter-group {
    margin-bottom: 12px;
  }
  
  .filter-label {
    font-size: 10px;
    margin-bottom: 8px;
  }
  
  .checkbox-item {
    font-size: 11px;
  }
  
  .checkbox-custom {
    width: 12px;
    height: 12px;
    margin-right: 6px;
  }
  
  .search-container {
    min-width: 140px;
  }
  
  .search-input {
    font-size: 11px;
  }
  
  .sidebar-show-button {
    width: 36px;
    height: 36px;
    top: 802px;
    left: 12px;
  }
  
  .popup-content {
    min-width: 180px;
  }
  
  .marker-circle {
    width: 20px;
    height: 20px;
  }
  
  .marker-icon {
    font-size: 14px;
  }
}

/* Telas muito pequenas */
@media (max-width: 360px) {
  .sidebar {
    width: 160px;
  }
  
  .sidebar-content {
    padding: 8px;
  }
  
  .sidebar-title {
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  .search-container {
    min-width: 120px;
  }
  
  .popup-content {
    min-width: 160px;
  }
}
</style>