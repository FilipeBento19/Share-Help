import { ref, computed } from "vue"

export function createTimer(initialTime, storageKey) {
  // Tenta pegar o tempo salvo no localStorage
  const saved = localStorage.getItem(storageKey)
  const timeLeft = ref(saved ? JSON.parse(saved) : [...initialTime])

  let interval = null

  const startTimer = () => {
    if (interval) return

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
              clearInterval(interval)
              interval = null
            }
          }
        }
      }

      timeLeft.value = [days, hours, minutes, seconds]
      // Salva no localStorage a cada atualização
      localStorage.setItem(storageKey, JSON.stringify(timeLeft.value))
    }, 1000)
  }

  const stopTimer = () => {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  const formattedTime = computed(() =>
    timeLeft.value.map((t) => String(t).padStart(2, "0")).join(":")
  )

  return {
    timeLeft,
    formattedTime,
    startTimer,
    stopTimer,
  }
}
