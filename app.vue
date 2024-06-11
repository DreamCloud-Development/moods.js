<template>
  <div>
    <NuxtLoadingIndicator />
    <Navbar />
    <NuxtPage />
    <Footer />
    <ControlBar />
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js',
      tagPosition: 'head'
    }
  ]
})
</script>