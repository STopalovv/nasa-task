<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <nav class="nav">
        <RouterLink to="/" class="router">Home</RouterLink>
        <RouterLink to="/poad" class="router">Picture of the day</RouterLink>
        <RouterLink to="/earth" class="router">The Earth</RouterLink>
        <RouterLink to="/epic" class="router">EPIC Earth</RouterLink>
      </nav>

  <RouterView />
</template>

<style scoped>
  .nav {
    margin-bottom: 5rem;
  }
</style>
