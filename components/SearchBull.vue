<template>
    <form @submit.prevent="handleSubmit" class="p-0">
        <label class="input input-sm input-bordered flex items-center gap-1">
            <Icon name="ph:magnifying-glass-bold" />
            <input type="text" v-model="searchTerm" placeholder={{ placeholderText }} class="placeholder:text-base-content" />
        </label>
    </form>
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
    },
    props: {
        placeholderText: "Search...",
    }
}
</script>