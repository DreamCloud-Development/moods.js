<template>
  <div>
    <Navbar />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js',
      tagPosition: 'head'
    }
  ]
})
</script>