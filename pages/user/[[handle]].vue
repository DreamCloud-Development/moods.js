<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: requestData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/users/handle/' + route.params.handle + '?app_name=MOODS-TM')

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
    <div class="card m-8">
        <h2 class="card-title">Bio</h2>
        <p> {{ requestData.data.bio }}</p>
        <h2 class="card-title mt-4">Tracks</h2>
    </div>
</template>