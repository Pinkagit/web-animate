<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <nav>
      <RouterLink to="/svg">Svg</RouterLink>
      <RouterLink to="/spine">Spine</RouterLink>
      <RouterLink to="/sprite">Sprite</RouterLink>
      <RouterLink to="/tween">Tween</RouterLink>
      <RouterLink to="/canvas">Canvas</RouterLink>
    </nav>
    <RouterView class="view" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
}

nav {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border); 
  margin-right: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

</style>
