<script setup>
import { defineProps } from 'vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  cause: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<template>
  <div class="causas-card">
    <img :src="cause.image" :alt="cause.title" class="cause-image">
    <div class="card-content">
        <h3>{{ cause.title }}</h3>
        <p class="description">{{ cause.description }}</p>
        <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: cause.progress + '%' }"></div>
    </div>
        <div class="progress-info">
            <span>{{ cause.progress }}% alcançado</span>
            <span>Meta: {{ formatCurrency(cause.goal) }}</span>
        </div>
      <button class="card-button"></button>
    </div>
  </div>
</template>

<style scoped>
.causas-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: left;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  min-height: 220px; 
}

.card-content {
  padding: 15px; 
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.causas-card h3 {
  font-size: 1.2em; 
  margin-top: 0;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.causas-card .description {
  font-size: 0.85em; 
  color: #555;
  line-height: 1.3; 
  margin-bottom: 15px; 
  flex-grow: 1;
}

.progress-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 6px; 
  margin-bottom: 6px; 
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #10b981;
  border-radius: 5px;
  transition: width 0.5s ease-in-out;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.75em; 
  color: #777;
  margin-bottom: 15px; 
}

.card-button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 15px; 
  border-radius: 6px; 
  font-size: 0.9em;
  font-weight: 600;
  transition: background-color 0.3s ease;
  width: 100%;
}

.cause-image {
  width: 100%;
  height: 200px; 
  margin-bottom: 10px; 
}

.card-button:hover {
  background-color: #1d4ed8;
}
</style>