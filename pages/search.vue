<template>
    <div>
        <!--div v-if="tracks.length > 0"-->
        <h1 class="text-center text-3xl lg:text-6xl font-black mt-8 mb-8">
            Search results for: {{ $route.query.query }}
        </h1>
        <div class="mx-2 lg:mx-10">
            <div role="tablist" class="tabs lg:tabs-lg font-bold mt-4 w-full">

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Tracks" checked />
                <div role="tabpanel" class="tab-content" v-if="tracks.length != 0" tab-active>
                    <SongCard v-for="track in tracks" :trackParsedData=track />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Playlists" />
                <div role="tabpanel" class="tab-content" v-if="playlists.length != 0">
                    <div v-for="playlist in playlists">
                        <PlaylistCard :trackParsedData=playlist />
                    </div>
                </div>

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Albums" />
                <div role="tabpanel" class="tab-content" v-if="playlists.length != 0">
                    <div v-for="playlist in albums">
                        <AlbumCard :trackParsedData=playlist />
                    </div>
                </div>

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Users" />

                <div role="tabpanel" class="tab-content" v-if="users.length != 0">
                    <div v-for="user in users">
                        <UserCard :userParsedData="user" />
                    </div>
                </div>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            tracks: [],
            playlists: [],
            users: []
        }
    },
    created() {
        this.fetchAll()
    },
    methods: {
        async fetchAll() {
            const { data } = await useFetch(`https://blockdaemon-audius-discovery-03.bdnodes.net/v1/full/search/full?query=${this.$route.query.query}&app_name=MOODS-TM`)
            this.tracks = data.value.data.tracks
            this.playlists = data.value.data.playlists
            this.users = data.value.data.users
            this.albums = data.value.data.albums
        },
    },
    watch: {
        '$route.query'() {
            this.fetchAll()
        }
    }
}
</script>