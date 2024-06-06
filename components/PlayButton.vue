<template>
    <a class="btn btn-primary" @click="addToPlaylist(trackId)">
        <Icon name="ph:play-fill" />
        {{ trackId }}
    </a>
</template>


<script>
export default {
    props: {
        trackId: {
            type: String,
            required: true
        }
    },
    methods: {
        addToPlaylist() {
            if (!this.playlist) {
                this.playlist = [];
            }
            this.playlist.push('https://audius-discovery-4.theblueprint.xyz/v1/tracks/' + this.trackId + '/stream');
            if (!this.currentPlaying) {
                this.currentPlaying = 0;
                this.audio = new Audio(this.playlist[this.currentPlaying]);
                this.audio.play();
            }
        }
    }
}
</script>
 