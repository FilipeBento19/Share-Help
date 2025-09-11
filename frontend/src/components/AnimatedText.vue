<!-- components/AnimatedText.vue -->
<script setup>
import { motion } from 'motion-v'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'div'
  },
  animationType: {
    type: String,
    default: 'fadeInUp' // Opções: fadeInUp, fadeIn, slideInLeft, bounceIn
  },
  delay: {
    type: Number,
    default: 0.05
  },
  duration: {
    type: Number,
    default: 0.5
  },
  stagger: {
    type: Boolean,
    default: true
  },
  once: {
    type: Boolean,
    default: true
  },
  // Nova prop para controlar quebras de linha
  inline: {
    type: Boolean,
    default: false
  }
})

const words = props.text.split(' ')

// Configurações de animação baseadas no tipo
const animationConfig = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  bounceIn: {
    initial: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
}

const selectedAnimation = animationConfig[props.animationType] || animationConfig.fadeInUp
</script>

<template>
  <component 
    :is="tag" 
    class="animated-text-container"
    :class="{ 'inline-mode': inline }"
  >
    <motion.span
      v-for="(word, i) in words"
      :key="i"
      class="animated-word"
      :initial="selectedAnimation.initial"
      :while-in-view="selectedAnimation.visible"
      :viewport="{ once: once }"
      :transition="{
        duration: duration,
        delay: stagger ? i * delay : 0
      }"
    >
      {{ word }}<span v-if="i < words.length - 1">&nbsp;</span>
    </motion.span>
  </component>
</template>

<style scoped>
.animated-text-container {
  display: block;
  line-height: 1.2;
}

.animated-text-container.inline-mode {
  display: inline;
}

.animated-word {
  display: inline-block;
  white-space: nowrap;
}

/* Para garantir que as palavras não quebrem */
.animated-text-container ::v-deep(.animated-word) {
  white-space: nowrap;
}
</style>