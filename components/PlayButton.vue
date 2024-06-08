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
    trackId: string;
}>();

const handleAddToPlaylist = (trackId) => {
    addTrackToPlaylist(trackId);
    console.log(state.playlist, state.playlistIndex)
}
</script>

<template>
    <a class="btn btn-primary" @click="handleAddToPlaylist(trackId)">
        <Icon name="ph:play-fill" />
    </a>
</template>