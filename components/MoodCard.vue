<template>
    <div class="flex rounded-lg justify-center items-center flex-col bg-base-300 w-32 lg:w-36">
        <div
            :class="'m-2 rounded-lg bg-gradient-to-tr h-28 w-28 lg:h-32 lg:w-32 flex justify-center items-center text-6xl lg:text-[6rem] ' + gradient">
            <Icon :name="icon" class="text-base-100" />
        </div>
        <h1 class="text-xl font-black text-center mb-2" v-html="name"></h1>
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
