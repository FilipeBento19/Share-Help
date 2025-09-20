<!-- src/components/LogoLoop.vue -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  logos: {
    type: Array,
    required: true
  },
  speed: {
    type: Number,
    default: 60 // pixels por segundo
  },
  direction: {
    type: String,
    default: 'left' // 'left' ou 'right'
  },
  logoHeight: {
    type: Number,
    default: 48
  },
  gap: {
    type: Number,
    default: 40
  },
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  scaleOnHover: {
    type: Boolean,
    default: false
  },
  fadeOut: {
    type: Boolean,
    default: false
  },
  fadeOutColor: {
    type: String,
    default: '#ffffff'
  },
  ariaLabel: {
    type: String,
    default: 'Logos das ONGs parceiras'
  }
})

const router = useRouter()
const containerRef = ref(null)
const trackRef = ref(null)
const isHovered = ref(false)
let animationFrameId = null
let lastTimestamp = null
let offset = 0
let velocity = 0

// Calcula quantas cópias renderizar para preencher a tela
const copyCount = computed(() => {
  if (!containerRef.value) return 3
  const containerWidth = containerRef.value.offsetWidth
  const totalLogosWidth = props.logos.length * (props.logoHeight + props.gap)
  const copiesNeeded = Math.ceil(containerWidth / totalLogosWidth) + 2
  return Math.max(3, copiesNeeded)
})

// Direção da animação
const sign = computed(() => (props.direction === 'left' ? -1 : 1))

// Animação suave com requestAnimationFrame
const animate = (timestamp) => {
  if (!lastTimestamp) lastTimestamp = timestamp

  const deltaTime = (timestamp - lastTimestamp) / 1000
  lastTimestamp = timestamp

  const targetVelocity = props.pauseOnHover && isHovered.value ? 0 : props.speed * sign.value

  // Suavização da velocidade (ease-in-out natural)
  const easingFactor = 1 - Math.exp(-deltaTime / 0.25) // tau = 0.25
  velocity += (targetVelocity - velocity) * easingFactor

  if (trackRef.value) {
    const sequenceWidth = props.logos.length * (props.logoHeight + props.gap)
    if (sequenceWidth > 0) {
      offset += velocity * deltaTime
      offset = ((offset % sequenceWidth) + sequenceWidth) % sequenceWidth
      trackRef.value.style.transform = `translateX(${-offset}px)`
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})

const handleMouseEnter = () => {
  if (props.pauseOnHover) isHovered.value = true
}

const handleMouseLeave = () => {
  if (props.pauseOnHover) isHovered.value = false
}

const goToOng = (id) => {
  router.push(`/institution/${id}`)
}
</script>

<template>
  <div
    ref="containerRef"
    class="logo-loop-container"
    :style="{
      position: 'relative',
      overflow: 'hidden',
      maskImage: fadeOut ? `linear-gradient(90deg, ${fadeOutColor} 0%, transparent 10%, transparent 90%, ${fadeOutColor} 100%)` : 'none',
      WebkitMaskImage: fadeOut ? `linear-gradient(90deg, ${fadeOutColor} 0%, transparent 10%, transparent 90%, ${fadeOutColor} 100%)` : 'none',
      width: '100%'
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :aria-label="ariaLabel"
    role="region"
  >
    <div ref="trackRef" class="logo-track" style="display: inline-flex; align-items: center;">
      <!-- Renderiza N cópias para loop contínuo -->
      <template v-for="n in copyCount" :key="n">
        <div
          v-for="(logo, index) in logos"
          :key="index"
          class="logo-item"
          :style="{
            height: `${logoHeight}px`,
            marginRight: `${gap}px`,
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: scaleOnHover ? 'transform 0.2s ease' : 'none'
          }"
          @click="goToOng(logo.id)"
          @mouseenter="(e) => scaleOnHover && (e.currentTarget.style.transform = 'scale(1.1)')"
          @mouseleave="(e) => scaleOnHover && (e.currentTarget.style.transform = 'scale(1)')"
        >
          <img
            :src="logo.img"
            :alt="logo.title"
            :title="logo.title"
            :style="{ height: '100%', maxHeight: '100%', objectFit: 'contain' }"
            loading="lazy"
            draggable="false"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.logo-loop-container {
  width: 100%;
  white-space: nowrap;
  user-select: none;
}

.logo-track {
  display: inline-flex;
  align-items: center;
}

.logo-item {
  flex-shrink: 0;
}

/* Safari support */
.logo-loop-container {
  -webkit-mask-size: auto;
  mask-size: auto;
}
</style>