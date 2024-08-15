<template>
  <div class="container">
    <div 
      class="frame-animation" 
      :class="{ 'animate': isAnimating }">
    </div>
    <button @click="toggleAnimation">{{ isAnimating ? 'Pause' : 'Play' }} Animation</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isAnimating = ref(false);

const toggleAnimation = () => {
  isAnimating.value = !isAnimating.value;
};
</script>

<style scoped>
.container {
  text-align: center;
}

.frame-animation {
  width: 741px;
  height: 243px;
  background-image: url('../assets/images/sprite/sprite.png');
  background-size: cover;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  position: relative;
}
.frame-animation::before {
  content: "";
  position: absolute;
  width: 247px;
  height: 243px;
  background-color: rgba(40, 42, 44, 0.7);
  left: 247px;
}
.frame-animation::after {
  content: "";
  position: absolute;
  width: 247px;
  height: 243px;
  background-color: rgba(40, 42, 44, 0.7);
  right: 0;
}

.frame-animation.animate {
  animation: play-frames 1s steps(8) infinite;
}

@keyframes play-frames {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -1976px 0;
  }
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
}
</style>

