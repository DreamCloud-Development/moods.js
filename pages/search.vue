<template>
    <div>
        <!--div v-if="tracks.length > 0"-->
        <h2>Search results for: {{ $route.query.query }}</h2>
        <div v-for="track in tracks">
            <p>{{ track.title }}</p>
            <p>{{ track.artwork }}</p>
            <SongCard
            title={{ track }} />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tracks: []
        }
    },
    created() {
        this.fetchTracks()
    },
    methods: {
        async fetchTracks() {
            const { data } = await useFetch(`https://blockdaemon-audius-discovery-03.bdnodes.net/v1/tracks/search?query=${this.$route.query.hello_world}`)
            this.tracks = data.value.data 
        }
    }
}
</script>