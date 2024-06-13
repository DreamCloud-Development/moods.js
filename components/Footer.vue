<template>
    <footer class="footer footer-center p-10 bg-primary text-primary-content pb-32 mt-4 border-t-2 border-base-300">
        <aside>
            <img src="/favicon.png" class="w-28 h-28" />
            <p class="font-bold">
                MOOD is <span class="bg-gradient-to-r from-warning to-error bg-clip-text text-transparent">Open
                    Source</span><br>
                <span class="text-center">
                    <span class="badge bg-base-100 border-2 border-base-300 mx-1">mood.js</span>
                    <span v-if="hash" class="badge badge-secondary border-2 mx-1">#{{ hash['sha'].slice(0, 6) }}</span>
                    <span v-else class="badge badge-secondary border-2 mx-1">#GITHUB</span>
                </span>

            </p>
            <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
            <div class="grid grid-flow-col gap-4 text-3xl">
                <a href="https://github.com/DreamCloud-Development/moods.js" target="_blank">
                    <Icon name="ph:github-logo-fill" />
                </a>
                <a href="https://dreamclouds.fr" target="_blank">
                    <Icon name="ph:planet-bold" />
                </a>
                <a href="https://dsc.gg/drmcld" target="_blank">
                    <Icon name="mingcute:discord-fill" />
                </a>
            </div>
        </nav>
        <p class="text-primary" href="https://f.dreamclouds.fr/dreamcode">DreamCode: FLIXSAN</p>
    </footer>

</template>

<script lang="ts" setup>
const { data: hash } = await useFetch('https://api.github.com/repos/DreamCloud-Development/moods.js/commits/main')
</script>