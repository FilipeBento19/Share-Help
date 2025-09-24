<template>
  <div class="chart-wrapper">
    <!-- Área do Gráfico -->
    <div class="chart-area">
      <div v-if="chartData.labels.length > 0" class="chart-canvas">
        <!-- Gráfico de Barras -->
        <Bar v-if="graphType === 'Gráfico de colunas'" :data="chartData" :options="chartOptions" />

        <!-- Gráfico de Pizza -->
        <Pie v-else-if="graphType === 'Gráfico pizza'" :data="pieChartData" :options="pieChartOptions" />
      </div>
      <div v-else class="no-data-message">
        <p>Nenhuma doação registrada para exibir no gráfico.</p>
      </div>
    </div>

    <!-- Painel de Controles -->
    <div class="controls-panel">
      <!-- Tipo de registro -->
      <div class="control-group">
        <label class="control-label">Tipo de registro</label>
        <div class="select-wrapper">
          <select v-model="localFiltro" class="control-select">
            <option value="Gráfico">Gráfico</option>
            <option value="">Lista</option>
          </select>
          <div class="select-arrow">▼</div>
        </div>
      </div>

      <!-- ✅ FILTRO ATUALIZADO -->
      <div class="control-group">
        <label class="control-label">Agrupar por</label>
        <div class="select-wrapper">
          <select v-model="contentFilter" class="control-select">
            <option value="ongs">ONGs</option>
            <option value="categorias">Categoria das ONGs</option>
          </select>
          <div class="select-arrow">▼</div>
        </div>
      </div>

      <!-- Tipo de gráfico -->
      <div class="control-group">
        <label class="control-label">Tipo de gráfico</label>
        <div class="radio-group">
          <label class="radio-item">
            <input v-model="graphType" type="radio" value="Gráfico de colunas" class="radio-input" />
            <span class="radio-label">Gráfico de colunas</span>
          </label>
          <label class="radio-item">
            <input v-model="graphType" type="radio" value="Gráfico pizza" class="radio-input" />
            <span class="radio-label">Gráfico pizza</span>
          </label>
        </div>
      </div>

      <!-- Faixa de tempo -->
      <div class="control-group">
        <label class="control-label">Faixa de tempo</label>
        <div class="select-wrapper">
          <select v-model="timeRange" class="control-select">
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 3 meses</option>
            <option value="365">Último ano</option>
            <option value="all">Todos</option>
          </select>
          <div class="select-arrow">▼</div>
        </div>
      </div>

      <!-- Estatísticas -->
      <div class="control-group">
        <div class="stats-box">
          <div class="stat-item">
            <div class="stat-number">{{ estatisticas.totalItems }}</div>
            <div class="stat-label">{{ contentFilter === 'ongs' ? 'ONGs' : 'Categorias' }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">R$ {{ Number(estatisticas.valorTotal).toLocaleString('pt-BR') }}</div>
            <div class="stat-label">Valor Total</div>
          </div>
        </div>
      </div>

      <!-- Legenda para gráfico de pizza -->
      <div v-if="graphType === 'Gráfico pizza'" class="control-group">
        <label class="control-label">Legenda</label>
        <div class="pizza-legend">
          <div v-for="(item, index) in pieChartData.labels" :key="item" class="legend-item">
            <div class="legend-color" :style="{ backgroundColor: pieChartData.datasets[0].backgroundColor[index] }">
            </div>
            <span class="legend-text">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Bar, Pie } from 'vue-chartjs'

// Registrar os módulos do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

// Props para receber dados do componente pai
const props = defineProps({
  doacoes: Array,
  filtro: String,
  ongs: Array
})

const emit = defineEmits(['update:filtro'])

const localFiltro = computed({
  get: () => props.filtro,
  set: (val) => emit('update:filtro', val)
})

// Estados reativos para os controles
const graphType = ref('Gráfico de colunas')
const timeRange = ref('30')
const contentFilter = ref('ongs')

// Dados reativos
const doacoesFiltradas = ref([])

// Cores para os gráficos
const cores = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
  '#14B8A6', '#FB923C', '#A855F7', '#0EA5E9', '#22C55E'
]

// ✅ MAPEAMENTO DE CATEGORIAS
const categoriasMap = {
  'criancas': 'Crianças',
  'moradores-de-rua': 'Moradores de Rua',
  'idosos': 'Idosos',
  'animais': 'Animais',
  'saude': 'Saúde',
  'educacao': 'Educação',
  'meio-ambiente': 'Meio Ambiente',
  'geral': 'Geral'
}

// Função para formatar categoria
const formatarCategoria = (categoria) => {
  return categoriasMap[categoria] || categoria || 'Não categorizada'
}

// Função para filtrar doações por tempo
const filtrarPorTempo = (doacoes) => {
  if (!doacoes || !doacoes.length) return []

  if (timeRange.value === 'all') return doacoes

  const dias = parseInt(timeRange.value)
  const dataLimite = new Date()
  dataLimite.setDate(dataLimite.getDate() - dias)

  return doacoes.filter(doacao => {
    const dataDoacao = new Date(doacao.data)
    return dataDoacao >= dataLimite
  })
}

// Atualizar doações filtradas quando dados ou filtros mudarem
watch([() => props.doacoes, timeRange], () => {
  doacoesFiltradas.value = filtrarPorTempo(props.doacoes)
}, { immediate: true })

// ✅ FUNÇÃO ATUALIZADA PARA AGRUPAR DADOS
const getDadosAgrupados = () => {
  if (!doacoesFiltradas.value || !doacoesFiltradas.value.length) {
    return {
      labels: [],
      valores: [],
      cores: []
    }
  }

  const resumo = {}

  doacoesFiltradas.value.forEach(doacao => {
    let chave

    if (contentFilter.value === 'categorias') {
      // ✅ Agrupar por categoria (já vem no objeto doacao)
      const categoria = doacao.categoriaOng || 'Não categorizada'
      chave = formatarCategoria(categoria)
    } else {
      // Agrupar por ONG
      chave = doacao.ongNome || 'ONG não identificada'
    }

    if (!resumo[chave]) {
      resumo[chave] = {
        quantidade: 0,
        valorTotal: 0
      }
    }

    resumo[chave].quantidade += 1
    resumo[chave].valorTotal += doacao.valor || 0
  })

  // Ordenar por valor total (decrescente)
  const entries = Object.entries(resumo)
    .sort((a, b) => b[1].valorTotal - a[1].valorTotal)
    .slice(0, 15)

  const labels = entries.map(([label]) => label)
  const valores = entries.map(([, data]) => data.valorTotal)
  const coresGrafico = labels.map((_, index) => cores[index % cores.length])

  return {
    labels,
    valores,
    cores: coresGrafico
  }
}

// Dados computados para o gráfico de barras
const chartData = computed(() => {
  const { labels, valores, cores: coresGrafico } = getDadosAgrupados()

  if (!labels.length) {
    return { labels: [], datasets: [] }
  }

  return {
    labels,
    datasets: [
      {
        label: contentFilter.value === 'ongs' ? 'Valor por ONG' : 'Valor por Categoria',
        data: valores,
        backgroundColor: coresGrafico,
        borderRadius: 4,
        barThickness: 40,
      }
    ]
  }
})

// Dados computados para o gráfico de pizza
const pieChartData = computed(() => {
  const { labels, valores, cores: coresGrafico } = getDadosAgrupados()

  if (!labels.length) {
    return { labels: [], datasets: [] }
  }

  return {
    labels,
    datasets: [
      {
        label: contentFilter.value === 'ongs' ? 'Doações por ONG' : 'Doações por Categoria',
        data: valores,
        backgroundColor: coresGrafico,
        borderColor: '#fff',
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff'
      }
    ]
  }
})

// Estatísticas
const estatisticas = computed(() => {
  if (!doacoesFiltradas.value || !doacoesFiltradas.value.length) {
    return {
      totalItems: 0,
      valorTotal: 0
    }
  }

  let itensUnicos

  if (contentFilter.value === 'categorias') {
    // Contar categorias únicas
    const categoriasUnicas = new Set()
    doacoesFiltradas.value.forEach(d => {
      const categoria = d.categoriaOng || 'Não categorizada'
      categoriasUnicas.add(formatarCategoria(categoria))
    })
    itensUnicos = categoriasUnicas
  } else {
    // Contar ONGs únicas
    itensUnicos = new Set(doacoesFiltradas.value.map(d => d.ongNome || 'ONG não identificada'))
  }

  const valorTotal = doacoesFiltradas.value.reduce((total, doacao) => {
    return total + (doacao.valor || 0)
  }, 0)

  return {
    totalItems: itensUnicos.size,
    valorTotal: valorTotal.toFixed(2)
  }
})

// Opções do gráfico de barras
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 20,
      bottom: 60
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      callbacks: {
        label: function (context) {
          return `R$ ${context.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        }
      }
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false
      },
      ticks: {
        display: true,
        font: {
          size: 10
        },
        color: '#666',
        maxRotation: 45,
        minRotation: 0
      },
      border: {
        display: false
      }
    },
    y: {
      display: true,
      beginAtZero: true,
      ticks: {
        font: {
          size: 11
        },
        color: '#999',
        callback: function (value) {
          return 'R$ ' + value.toLocaleString('pt-BR')
        }
      },
      grid: {
        display: true,
        color: '#f0f0f0',
        drawBorder: false
      },
      border: {
        display: false
      }
    }
  },
  elements: {
    bar: {
      borderWidth: 0
    }
  }
}))

// Opções do gráfico de pizza
const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0,0,0,0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      callbacks: {
        label: function (context) {
          const valor = context.parsed
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const porcentagem = ((valor / total) * 100).toFixed(1)
          return `${context.label}: R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} (${porcentagem}%)`
        }
      }
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: '#fff'
    }
  },
  cutout: 0,
  radius: '85%'
}

onMounted(() => {
  doacoesFiltradas.value = filtrarPorTempo(props.doacoes)
})
</script>

<style scoped>
/* Reset e prevenção de scroll horizontal */
* {
  box-sizing: border-box;
}

/* Estilos base */
.chart-wrapper {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 6px;
  padding: 15px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; /* Previne scroll horizontal */
}

.chart-area {
  flex: 1;
  background: #fafafa;
  border-radius: 4px;
  padding: 15px;
  min-height: 400px;
  overflow: hidden;
  min-width: 0; /* Permite que o flex item encolha */
}

.chart-canvas {
  height: 370px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.no-data-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 14px;
  text-align: center;
  padding: 20px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.controls-panel {
  width: 220px;
  max-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex-shrink: 0;
  overflow-x: hidden;
}

.control-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.control-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
  word-wrap: break-word;
}

.select-wrapper {
  position: relative;
  width: 100%;
  max-width: 100%;
}

.control-select {
  width: 100%;
  max-width: 100%;
  padding: 8px 30px 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 13px;
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-arrow {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: #999;
  pointer-events: none;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.radio-input {
  margin: 0;
  accent-color: #2563EB;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.radio-label {
  font-size: 13px;
  color: #333;
  cursor: pointer;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.stats-box {
  background: #f0f7ff;
  border: 1px solid #e3f2fd;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.stat-item {
  text-align: center;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.stat-number {
  font-size: 18px;
  font-weight: bold;
  color: #2563EB;
  line-height: 1.2;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.stat-label {
  font-size: 10px;
  color: #666;
  margin-top: 2px;
  word-wrap: break-word;
}

.pizza-legend {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-text {
  font-size: 11px;
  color: #333;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
}

/* Estados de foco */
.control-select:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
}

.radio-input:focus {
  outline: 2px solid #4285F4;
  outline-offset: 2px;
}

/* Scrollbar customizado */
.pizza-legend::-webkit-scrollbar {
  width: 4px;
}

.pizza-legend::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.pizza-legend::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}

.pizza-legend::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* RESPONSIVIDADE COM PREVENÇÃO DE SCROLL HORIZONTAL */

/* Tablets - Telas médias (768px a 1024px) */
@media (max-width: 1024px) {
  .chart-wrapper {
    gap: 15px;
    padding: 12px;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .controls-panel {
    width: 200px;
    max-width: 200px;
  }
  
  .chart-area {
    min-height: 350px;
    min-width: 0;
  }
  
  .chart-canvas {
    height: 320px;
  }
}

/* Tablets pequenos (600px a 768px) */
@media (max-width: 768px) {
  .chart-wrapper {
    flex-direction: column;
    gap: 20px;
    padding: 15px;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    margin: 0;
  }
  
  .chart-area {
    min-height: 300px;
    order: 2;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }
  
  .chart-canvas {
    height: 270px;
    width: 100%;
    max-width: 100%;
  }
  
  .controls-panel {
    width: 100%;
    max-width: 100%;
    order: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    overflow-x: hidden;
  }
  
  .control-group {
    min-width: 0;
    width: 100%;
    max-width: 100%;
  }
  
  .stats-box {
    padding: 10px;
  }
  
  .stat-number {
    font-size: 16px;
  }
  
  .stat-label {
    font-size: 9px;
  }
  
  .radio-group {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
    overflow: hidden;
  }
  
  .radio-item {
    flex: 0 0 auto;
    min-width: fit-content;
    max-width: 100%;
  }
}

/* Mobile - Telas pequenas (até 600px) */
@media (max-width: 600px) {
  .chart-wrapper {
    padding: 10px;
    gap: 15px;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    margin: 0;
    box-sizing: border-box;
  }
  
  .chart-area {
    min-height: 250px;
    padding: 10px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  
  .chart-canvas {
    height: 220px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }
  
  .controls-panel {
    grid-template-columns: 1fr;
    gap: 12px;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }
  
  .control-select {
    padding: 10px 35px 10px 12px;
    font-size: 14px;
    min-height: 44px;
    width: 100%;
    max-width: 100%;
  }
  
  .select-arrow {
    right: 12px;
    font-size: 12px;
  }
  
  .radio-item {
    padding: 8px 0;
    min-height: 44px;
    width: 100%;
    max-width: 100%;
  }
  
  .radio-input {
    width: 20px;
    height: 20px;
  }
  
  .radio-label {
    font-size: 14px;
    min-width: 0;
  }
  
  .control-label {
    font-size: 13px;
    margin-bottom: 6px;
  }
  
  .stats-box {
    flex-direction: column;
    text-align: center;
    gap: 8px;
    width: 100%;
    max-width: 100%;
  }
  
  .stat-item {
    padding: 5px 0;
    width: 100%;
  }
  
  .stat-number {
    font-size: 20px;
    word-break: break-word;
    overflow-wrap: break-word;
  }
  
  .stat-label {
    font-size: 11px;
  }
  
  .pizza-legend {
    max-height: 120px;
    width: 100%;
    overflow-x: hidden;
  }
  
  .legend-item {
    padding: 6px 0;
    width: 100%;
    max-width: 100%;
  }
  
  .legend-color {
    width: 14px;
    height: 14px;
  }
  
  .legend-text {
    font-size: 12px;
    min-width: 0;
  }
  
  .no-data-message {
    font-size: 13px;
    padding: 15px;
    width: 100%;
    max-width: 100%;
    word-break: break-word;
  }
}

/* Mobile muito pequeno (até 380px) */
@media (max-width: 380px) {
  .chart-wrapper {
    padding: 8px;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
  
  .chart-area {
    min-height: 200px;
    padding: 8px;
    width: 100%;
    max-width: 100%;
  }
  
  .chart-canvas {
    height: 180px;
    width: 100%;
    max-width: 100%;
  }
  
  .controls-panel {
    gap: 10px;
    width: 100%;
    max-width: 100%;
  }
  
  .control-group {
    margin-bottom: 5px;
    width: 100%;
    max-width: 100%;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  
  .stat-number {
    font-size: 16px;
    word-break: break-all;
    overflow-wrap: anywhere;
  }
  
  .stat-label {
    font-size: 10px;
  }
}

/* Landscape para mobile */
@media (max-height: 500px) and (orientation: landscape) {
  .chart-wrapper {
    flex-direction: row;
    overflow-x: hidden;
    max-width: 100vw;
  }
  
  .chart-area {
    order: 1;
    min-height: 200px;
    overflow: hidden;
    min-width: 0;
  }
  
  .chart-canvas {
    height: 180px;
    max-width: 100%;
  }
  
  .controls-panel {
    order: 2;
    width: 250px;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 300px;
  }
}

/* Touch device enhancements */
@media (hover: none) and (pointer: coarse) {
  .control-select {
    min-height: 44px;
    font-size: 16px; /* Previne zoom no iOS */
    width: 100%;
    max-width: 100%;
  }
  
  .radio-item {
    min-height: 44px;
    touch-action: manipulation;
    width: 100%;
    max-width: 100%;
  }
  
  .radio-input {
    width: 20px;
    height: 20px;
  }
  
  .legend-item {
    padding: 8px 0;
    min-height: 32px;
    width: 100%;
    max-width: 100%;
  }
}

/* High DPI screens */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .legend-color {
    border-radius: 3px;
  }
  
  .select-arrow {
    font-weight: bold;
  }
}

/* Garantia extra para prevenir scroll horizontal em qualquer situação */
@media (max-width: 768px) {
  .chart-wrapper,
  .chart-area,
  .controls-panel,
  .control-group,
  .stats-box,
  .pizza-legend {
    overflow-x: hidden !important;
    max-width: 100% !important;
  }
  
  /* Previne que textos muito longos causem scroll */
  .stat-number,
  .legend-text,
  .radio-label,
  .control-label {
    overflow-wrap: break-word !important;
    word-break: break-word !important;
    hyphens: auto;
  }
}
</style>

