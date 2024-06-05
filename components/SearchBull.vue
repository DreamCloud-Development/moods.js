<template>
    <label class="input input-sm input-bordered flex items-center gap-1">
        <Icon name="ph:magnifying-glass-bold" />
        <input type="text" v-model="searchTerm" @keyup.enter="handleSubmit" placeholder="Search..." />
    </label>
</template>

<script>
export default {
    data() {
        return {
            searchTerm: ''
        }
    },
    methods: {
        handleSubmit() {
            this.$router.push({ path: '/search', query: { query: this.searchTerm } })
        }
    }
}
</script>