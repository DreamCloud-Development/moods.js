<template>
    <div>
        <!--div v-if="tracks.length > 0"-->
        <h1 class="text-center text-6xl font-black mt-8 mb-8">
            Search results for: {{ $route.query.query }}
        </h1>
        <div v-for="track in tracks">
            <div class="card card-side bg-base-300 border-2 border-primary-content mx-2 lg:mx-10 mt-2">
                <figure>
                    <img class="h-32 w-32 rounded-l-none" :src="track.artwork['480x480']" alt="Cover Image" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ track.title }}</h2>
                    <p>
                        <Icon name="ph:person-fill" />
                        {{ track.user.name }}
                        <span class="font-black"> - </span>
                        <Icon name="ph:music-note-fill" />
                        {{ track.genre }}
                        <span class="font-black"> - </span>
                        <Icon name="ph:clock-fill" />
                        {{ track.duration }}s
                        <span class="font-black"> - </span>
                        <Icon name="ph:play-fill" />
                        {{ track.play_count }} Ecoutes
                    </p>
                </div>
                <figure class="mr-8">
                    <!--a class="btn btn-primary" target="_blank"
                        :href="`https://audius-discovery-4.theblueprint.xyz/v1/tracks/${track.id}/stream`">
                        <Icon name="ph:play-fill" />
                    </a-->
                    <PlayButton :trackId=track.id />
                </figure>
            </div>
        </div>
        <p class="text-lg text-center mb-32">Icon Lib:
            <br>
            <Icon name="streamline:song-recommendation-solid" />
            <br>
            <Icon name="streamline:music-folder-song-solid" />
            <br>
            <Icon name="ph:playlist-bold" />
            <br>
        </p>
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
            const { data } = await useFetch(`https://blockdaemon-audius-discovery-03.bdnodes.net/v1/tracks/search?query=${this.$route.query.query}`)
            this.tracks = data.value.data 
        }
    }
}
</script>