<template>
    <div>
        <!--div v-if="tracks.length > 0"-->
        <h1 class="text-center text-6xl font-black mt-8 mb-8">
            Search results for: {{ $route.query.query }}
        </h1>
        <div v-for="track in tracks">
            <SongCard :trackParsedData=track />
        </div>
        <!--p class="text-lg text-center mb-32">Icon Lib:
            <br>
            <Icon name="streamline:song-recommendation-solid" />
            <br>
            <Icon name="streamline:music-folder-song-solid" />
            <br>
            <Icon name="ph:playlist-bold" />
            <br>
        </p-->
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
            const { data } = await useFetch(`https://blockdaemon-audius-discovery-03.bdnodes.net/v1/tracks/search?query=${this.$route.query.query}&limit=100`)
            this.tracks = data.value.data 
        }
    },
    watch: {
        '$route.query'() {
            this.fetchTracks()
        }
    }
}
</script>