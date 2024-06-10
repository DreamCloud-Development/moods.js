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

const props = defineProps<{
    playlistId: string;
}>();

const handleAddToPlaylist = (playlistId: string) => {
    fetch('https://discovery-au-02.audius.openplayer.org/v1/playlists/' + playlistId + '/tracks?app_name=MOODS-TM',
        {
            method: 'GET',

        }).then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.data.length; i++) {
                addTrackToPlaylist(data.data[i].id);
            }
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}
</script>

<template>
    <a class="btn btn-primary" @click="handleAddToPlaylist(playlistId)">
        <Icon name="ph:play-fill" />
    </a>
</template>