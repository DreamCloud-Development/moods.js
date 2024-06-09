<script lang="ts" setup>
import { state, addTrackToPlaylist } from '~/stores/playlist'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: playlistData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/playlists/' + route.params.playlist + '?app_name=MOODS-TM')
const { data: playlistTracksData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/resolve?url=' + playlistData.value.data[0].permalink + '&app_name=MOODS-TM')

const addAllToPlaylist = () => {
    for (let i = 0; i < playlistTracksData.value.data[0].playlist_contents.length; i++) {
        addTrackToPlaylist(playlistTracksData.value.data[0].playlist_contents[i].track_id);
    }
}

addAllToPlaylist();
</script>

<template>
    <!--div class="w-full h-72 bg-center relative bg-cover bg-no-repeat -z-10"
        :style="`background-image: url(/music-banner.jpg);`">
        <img class="absolute h-32 w-32 rounded-full bottom-0 left-10 translate-y-5 z-10 overflow-auto"
            :src="playlistTracksData.data[0].artwork['480x480']" alt="Cover Image" />
        <h1 class="absolute bottom-12 left-44 font-bold text-xl lg:text-3xl">
            {{ playlistTracksData.data[0].playlist_name }}
        </h1>
        <h2 class="absolute bottom-3 left-44 text-md lg:text-xl glass p-1 rounded-lg">
            {{ playlistTracksData.data[0].play_count }} Listenings - {{ playlistTracksData.data[0].favorite_count }}
            Likes
        </h2>
        <h3 class="absolute bottom-2 right-2 text-sm lg:text-md bg-primary p-1 rounded-lg">
            <Icon name="streamline:sign-hashtag-solid" /> {{ playlistTracksData.data[0].id }}
        </h3>
        <Icon name="ph:plus-circle-fill" @click="addAllToPlaylist();" class="text-6xl z-20" />
    </div>
    <div class="card m-8">
        <p v-for="track in playlistTracksData.data[0].playlist_contents">
            <IdSongCard :id=track.track_id />
        </p>
    </div-->
</template>