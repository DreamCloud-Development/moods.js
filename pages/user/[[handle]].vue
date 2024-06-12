<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { data: requestData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/users/handle/' + route.params.handle + '?app_name=MOODS-TM')
const { data: artistData } = await useFetch('https://discoveryprovider2.audius.co/v1/users/' + requestData.value.data.id + '/tracks?app_name=MOODS-TM&limit=1000')
const { data: pinnedData } = await useFetch('https://discoveryprovider2.audius.co/v1/tracks/' + requestData.value.data.artist_pick_track_id + '?app_name=MOODS-TM&limit=1000')
const { data: repostData } = await useFetch('https://discoveryprovider2.audius.co/v1/users/' + requestData.value.data.id + '/reposts?app_name=MOODS-TM&limit=1000')
</script>

<template>
    <div class="w-full h-72 bg-center relative bg-cover bg-no-repeat"
        :style="`background-image: url(${requestData.data.cover_photo['2000x']});`">
        <img class="absolute h-32 w-32 rounded-full bottom-0 left-10 translate-y-5"
            :src="requestData.data.profile_picture['480x480']" alt="Cover Image" />
        <h1 class="absolute bottom-12 left-44 font-bold text-xl lg:text-3xl">
            {{ requestData.data.name }}

            <div v-if="requestData.data.is_verified" class="tooltip" data-tip="Verified Artist">
                <Icon name="ri:verified-badge-fill" class="text-emerald-500" />
            </div>
            <div v-if="requestData.data.id === 'aY1Alz'" class="tooltip" data-tip="MOOD™ Team">
                <Icon name="ri:verified-badge-fill" class="text-cyan-300" />
            </div>
        </h1>
        <h2 class="absolute bottom-3 left-44 text-md lg:text-xl glass p-1 rounded-lg">
            {{ requestData.data.follower_count }} Folowers - {{ requestData.data.track_count }} Tracks
        </h2>
        <h3
            class="absolute bottom-64 lg:bottom-2 right-1 lg:right-2 text-sm lg:text-md bg-primary p-1 rounded-lg text-primary-content">
            <Icon name="streamline:sign-hashtag-solid" /> {{ requestData.data.id }}
        </h3>
    </div>
    <div class="card my-8">
        <h2 class="card-title mx-12">Bio</h2>
        <p v-html="requestData.data.bio" class="mx-12" style="white-space: pre;"></p>

        <div v-if="requestData.data.artist_pick_track_id">
            <h2 class=" card-title mt-4 mx-12">Picked Tracks</h2>
            <div class="mx-2 lg:mx-10">
                <SongCard :trackParsedData="pinnedData.data" :cool="true" />
            </div>
        </div>

        <div role="tablist" class="tabs tabs-bordered mx-10 tabs-lg font-bold mt-4">
            <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Tracks" checked />
            <div role="tabpanel" class="tab-content">
                <p v-for="(track, index) in artistData.data">
                    <SongCard :trackParsedData="artistData.data[index]" />
                </p>
            </div>

            <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Reposts" />
            <div role="tabpanel" class="tab-content">
                <p v-for="(track, index) in repostData.data">
                    <SongCard v-if="repostData.data[index].item_type === 'track'"
                        :trackParsedData="repostData.data[index].item" />
                    <PlaylistCard v-if="repostData.data[index].item_type === 'playlist'"
                        :trackParsedData="repostData.data[index].item" />
                </p>
            </div>
        </div>
    </div>
</template>
