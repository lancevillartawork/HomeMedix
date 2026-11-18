<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SplashScreen from './components/SplashScreen.vue'

const showSplash = ref(true)

onMounted(() => {
  setTimeout(() => {
    showSplash.value = false
  }, 2000)
})
</script>

<template>
  <Transition name="splash">
    <SplashScreen v-if="showSplash" />
  </Transition>

  <RouterView />
</template>

<style>
.splash-leave-active {
  transition: opacity 0.5s ease;
}

.splash-leave-to {
  opacity: 0;
}
</style>