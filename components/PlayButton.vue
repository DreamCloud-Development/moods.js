<script lang="ts" setup>
import { state, getPlaylist, addTrackToPlaylist, setPlaylistIndex } from '~/stores/playlist'

let audio = ref(null)

const playlist = computed({
    get: () => state.playlist,
    set: value => addTrackToPlaylist(value),
})

const index = computed({
    get: () => state.playlistIndex,
    set: value => setPlaylistIndex(value),
})

const props = defineProps<{
    trackId: string;
}>();

const handleAddToPlaylist = (trackId) => {
    addTrackToPlaylist(trackId);
    console.log(state.playlist, state.playlistIndex)

    if (state.playlistIndex === -1) {
        setPlaylistIndex(0);
        audio = new Audio('https://audius-discovery-4.theblueprint.xyz/v1/tracks/' + state.playlist[state.playlistIndex] + '/stream');
        audio.play();
        console.log(audio)
    }
}
</script>

<template>
    <a class="btn btn-primary" @click="handleAddToPlaylist(trackId)">
        <Icon name="ph:play-fill" />
    </a>
</template>