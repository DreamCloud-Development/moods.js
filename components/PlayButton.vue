<script lang="ts" setup>
import { state, getPlaylist, addTrackToPlaylist, setPlaylistIndex } from '~/stores/playlist'

let audioPlayer = ref(null)

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
        audioPlayer = new Audio('https://audius-discovery-4.theblueprint.xyz/v1/tracks/' + state.playlist[state.playlistIndex] + '/stream');
        audioPlayer.addEventListener('ended', handleNextTrack);
        audioPlayer.play();
        console.log(audioPlayer)
    }
}

const handleNextTrack = () => {
    const currentIndex = state.playlistIndex;
    const nextIndex = currentIndex + 1;

    if (nextIndex < playlist.value.length) {
        setPlaylistIndex(nextIndex);
        audioPlayer = new Audio('https://audius-discovery-4.theblueprint.xyz/v1/tracks/' + state.playlist[state.playlistIndex] + '/stream');
        audioPlayer.addEventListener('ended', handleNextTrack);
        audioPlayer.play();
        console.log(audioPlayer)
    } else {
        console.log('Reached the end of the playlist');
    }
}
</script>

<template>
    <a class="btn btn-primary" @click="handleAddToPlaylist(trackId)">
        <Icon name="ph:play-fill" />
    </a>
</template>