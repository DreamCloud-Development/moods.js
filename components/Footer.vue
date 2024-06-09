<template>
    <footer class="footer footer-center p-10 bg-primary text-primary-content pb-32 mt-4 border-t-2 border-base-300">
        <aside>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="500.000000pt" height="500.000000pt"
                viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet" class="fill-base-300 w-32 h-32">

                <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" stroke="none">
                    <path d="M1110 2491 l0 -1361 1390 0 1390 0 0 513 c0 281 3 894 7 1361 5 637
3 848 -5 845 -10 -4 -302 -289 -1144 -1118 l-248 -244 -375 369 c-207 203
-519 510 -695 683 l-320 313 0 -1361z" />
                </g>
            </svg>
            <p class="font-bold">
                MOOD is <span>Open Source</span><br>
                <span class="text-center">
                    <span class="badge bg-base-100 border-2 border-base-300">mood.js</span> <span v-if="hash"
                        class="badge badge-secondary border-2">#{{ hash['sha'].slice(0, 6) }}</span>
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
    </footer>

</template>

<script lang="ts" setup>
const { data: hash } = await useFetch('https://api.github.com/repos/DreamCloud-Development/moods.js/commits/main')
</script>