<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: requestData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/users/handle/' + route.params.handle + '?app_name=MOODS-TM')
const { data: artistData } = await useFetch('https://discoveryprovider2.audius.co/v1/users/' + requestData.value.data.id + '/tracks?app_name=MOODS-TM&limit=1000')
</script>

<template>
    <div class="w-full h-72 bg-center relative bg-cover bg-no-repeat"
        :style="`background-image: url(${requestData.data.cover_photo['2000x']});`">
        <img class="absolute h-32 w-32 rounded-full bottom-0 left-10 translate-y-5"
            :src="requestData.data.profile_picture['480x480']" alt="Cover Image" />
        <h1 class="absolute bottom-12 left-44 font-bold text-xl lg:text-3xl">
            {{ requestData.data.name }}
            {{ requestData.data.is_verified ? '✔️' : ''}}
        </h1>
        <h2 class="absolute bottom-3 left-44 text-md lg:text-xl glass p-1 rounded-lg">
            {{ requestData.data.follower_count }} Folowers - {{ requestData.data.track_count }} Tracks
        </h2>
        <h3 class="absolute bottom-2 right-2 text-sm lg:text-md bg-primary p-1 rounded-lg">
            <Icon name="streamline:sign-hashtag-solid" /> {{ requestData.data.id }}
        </h3>
    </div>
    <div class="card my-8">
        <h2 class="card-title mx-12">Bio</h2>
        <p v-html="requestData.data.bio" class="mx-12" style="white-space: pre;"></p>
        <h2 class=" card-title mt-4 mx-12">Tracks</h2>
        <p v-for="(track, index) in artistData.data">
            <SongCard :trackParsedData="artistData.data[index]" />
        </p>
    </div>
</template>