<template>
  <div class="chart-wrapper">
    <!-- Área do Gráfico -->
    <div class="chart-area">
      <div v-if="chartData.labels.length > 0" class="chart-canvas">
        <Bar :data="chartData" :options="chartOptions" />
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
            <option value="">Texto</option>
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
            <div class="stat-number">{{ estatisticas.totalOngs }}</div>
            <div class="stat-label">ONGs com Doações</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ estatisticas.valorTotal.toLocaleString() }}</div>
            <div class="stat-label">Valor Total (R$)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'


// Registrar os módulos do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Props para receber dados do componente pai
const props = defineProps({
  doacoes: Array,
  filtro: String
})
const emit = defineEmits(['update:filtro'])

const localFiltro = computed({
  get: () => props.filtro,
  set: (val) => emit('update:filtro', val)
})


// Estados reativos para os controles
const graphType = ref('Gráfico de colunas')
const timeRange = ref('30')

// Dados reativos
const doacoesFiltradas = ref([])

// Cores para o gráfico
const cores = ['#4285F4', '#34A853', '#EA4335', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF']

// Função para filtrar doações por tempo
const filtrarPorTempo = (doacoes) => {
  if (timeRange.value === 'all') return doacoes

  const dias = parseInt(timeRange.value)
  const dataLimite = new Date()
  dataLimite.setDate(dataLimite.getDate() - dias)

  return doacoes.filter(doacao => {
    const dataDoacao = new Date(doacao.data)
    return dataDoacao >= dataLimite
  })
}

// Atualizar doações filtradas quando props.doacoes ou timeRange mudar
watch([() => props.doacoes, timeRange], () => {
  doacoesFiltradas.value = filtrarPorTempo(props.doacoes)
}, { immediate: true })

// Dados computados para o gráfico
const chartData = computed(() => {
  if (!doacoesFiltradas.value.length) {
    return {
      labels: [],
      datasets: []
    }
  }

  // Agrupar doações por ONG e somar valores
  const resumoPorOng = {}

  doacoesFiltradas.value.forEach(doacao => {
    if (!resumoPorOng[doacao.ongNome]) {
      resumoPorOng[doacao.ongNome] = {
        quantidade: 0,
        valorTotal: 0
      }
    }
    resumoPorOng[doacao.ongNome].quantidade += 1
    resumoPorOng[doacao.ongNome].valorTotal += doacao.valor
  })

  const ongs = Object.keys(resumoPorOng)
  const valores = ongs.map(ong => resumoPorOng[ong].valorTotal)
  const coresGrafico = ongs.map((_, index) => cores[index % cores.length])

  return {
    labels: ongs,
    datasets: [
      {
        label: 'Valor Total das Doações (R$)',
        data: valores,
        backgroundColor: coresGrafico,
        borderRadius: 4,
        barThickness: 40,
      }
    ]
  }
})

// Estatísticas computadas
const estatisticas = computed(() => {
  if (!doacoesFiltradas.value.length) {
    return {
      totalOngs: 0,
      valorTotal: 0
    }
  }

  const ongsUnicas = new Set(doacoesFiltradas.value.map(d => d.ongNome))
  const valorTotal = doacoesFiltradas.value.reduce((total, doacao) => total + doacao.valor, 0)

  return {
    totalOngs: ongsUnicas.size,
    valorTotal
  }
})

// Opções do gráfico
const chartOptions = {
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
}

onMounted(() => {
  doacoesFiltradas.value = filtrarPorTempo(props.doacoes)
})
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 6px;
  padding: 15px;
}

.chart-area {
  flex: 1;
  background: #fafafa;
  border-radius: 4px;
  padding: 15px;
  min-height: 400px;
}

.chart-canvas {
  height: 370px;
  width: 100%;
}

.no-data-message {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 14px;
}

.controls-panel {
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.control-group {
  display: flex;
  flex-direction: column;
}

.control-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.select-wrapper {
  position: relative;
}

.control-select {
  width: 100%;
  padding: 8px 30px 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 13px;
  appearance: none;
  cursor: pointer;
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
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-input {
  margin: 0;
  accent-color: #2563EB;
}

.radio-label {
  font-size: 13px;
  color: #333;
  cursor: pointer;
}

.stats-box {
  background: #f0f7ff;
  border: 1px solid #e3f2fd;
  border-radius: 6px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-number {
  font-size: 18px;
  font-weight: bold;
  color: #2563EB;
  line-height: 1.2;
}

.stat-label {
  font-size: 10px;
  color: #666;
  margin-top: 2px;
}

.control-select:focus {
  outline: none;
  border-color: #2563EB;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
}

.radio-input:focus {
  outline: 2px solid #4285F4;
  outline-offset: 2px;
}
</style>
