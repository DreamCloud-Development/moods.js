<script setup lang="ts">
defineProps({
    error: Object
})

function handleError() {
    clearError({ redirect: '/' })
}


useHead({
    script: [
        {
            src: 'https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js',
            tagPosition: 'head'
        }
    ]
})
</script>

<template>
    <NuxtLoadingIndicator />
    <Navbar />
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                404</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold ">Something's
                missing.</p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Or you misspell, or I fucked up. In both case, you should <NuxtLink to="/" class="underline">go back to
                    the home page</NuxtLink>, it's safer
            </p>
            <NuxtLink class="btn btn-primary" to="/">Yup, take me home
            </NuxtLink>
        </div>
    </div>
    <Footer />
    <ControlBar />
</template>
