<template>
    <div>Loading...</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(() => {
    const user = useCookie('user')
    const { token, state } = route.query
    if (token && state === 'SuperDupperSecretState') {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]))
            user.value = decoded
            return navigateTo('/')
        } catch (error) {
            console.error('Error verifying token:', error)
        }
    }
})
</script>