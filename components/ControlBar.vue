<script lang="ts" setup>
import { state, getPlaylist, addTrackToPlaylist, setPlaylistIndex } from '~/stores/playlist'

const playlist = computed({
    get: () => state.playlist,
    set: value => addTrackToPlaylist(value),
})

const index = computed({
    get: () => state.playlistIndex,
    set: value => setPlaylistIndex(value),
})

const getTrackData = (trackId) => {
    fetch('https://audius-discovery-6.cultur3stake.com/v1/tracks/' + trackId + '?app_name=MOODS-TM',
    {
        method: 'GET',

    }).then(function (body) {
        return body.json();
    });
}

let data = getTrackData(state.playlist[state.playlistIndex]);
console.log(state.playlist);
console.log(state.playlistIndex);
</script>

<template>
    <div v-if="playlist == -1">
        <h1>C'est good</h1>
    </div>
    <div v-else>
        <h1>C'est pas good</h1>
    </div>
</template>