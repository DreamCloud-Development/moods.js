<template>
    <div :class="gradient + ' flex rounded-lg justify-center items-center flex-col w-32 lg:w-36 bg-gradient-to-tr p-2'">
        <Icon :name=" icon" class="text-base-100 text-4xl md:text-6xl" />
        <h1 class="text-xl font-black text-center text-base-100" v-html="name"></h1>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        gradient: String,
        icon: String,
        name: String,
    }
};
</script>
