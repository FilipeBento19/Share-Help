// src/composables/timeGlobal.js
import { ref, computed } from 'vue'

// Defina o tempo inicial em dias, horas, minutos e segundos
// Formato: [dias, horas, minutos, segundos]
const initialTime = [12, 23, 1, 9] 

const timeLeft = ref([...initialTime])

let interval = null

// Função para decrementar o tempo
function startTimer() {
  if (interval) return // evita múltiplos intervalos
  interval = setInterval(() => {
    let [days, hours, minutes, seconds] = timeLeft.value

    if (seconds > 0) {
      seconds--
    } else {
      seconds = 59
      if (minutes > 0) {
        minutes--
      } else {
        minutes = 59
        if (hours > 0) {
          hours--
        } else {
          hours = 23
          if (days > 0) {
            days--
          } else {
            clearInterval(interval) // timer terminou
          }
        }
      }
    }

    timeLeft.value = [days, hours, minutes, seconds]
  }, 1000)
}

// Computed para mostrar no formato `dd:hh:mm:ss`
const formattedTime = computed(() => {
  return timeLeft.value.map(t => String(t).padStart(2, '0')).join(':')
})

export function useTimeGlobal() {
  return {
    timeLeft,
    formattedTime,
    startTimer
  }
}
