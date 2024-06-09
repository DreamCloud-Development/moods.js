<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: trackData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/tracks/' + route.params.id + '?app_name=MOODS-TM')

</script>

<template>
    <div class="w-full h-72 bg-center relative bg-cover bg-no-repeat -z-10"
        :style="`background-image: url(/music-banner.jpg);`">
        <img class="absolute h-32 w-32 rounded-full bottom-0 left-10 translate-y-5 z-10 overflow-auto"
            :src="trackData.data.artwork['480x480']" alt="Cover Image" />
        <h1 class="absolute bottom-12 left-44 font-bold text-xl lg:text-3xl">
            {{ trackData.data.title }}
        </h1>
        <h2 class="absolute bottom-3 left-44 text-md lg:text-xl glass p-1 rounded-lg">
            {{ trackData.data.play_count }} Listenings - {{ trackData.data.favorite_count }} Likes
        </h2>
        <h3
            class="absolute bottom-64 lg:bottom-2 right-1 lg:right-2 text-sm lg:text-md bg-primary p-1 rounded-lg text-primary-content">
            <Icon name="streamline:sign-hashtag-solid" /> {{ trackData.data.id }}
        </h3>
    </div>
    <div class="card m-8">
        <SongCard :trackParsedData=trackData.data />
    </div>
</template>