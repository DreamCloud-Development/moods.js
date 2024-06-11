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
                        <PlaylistCard v-if="playlist.is_album === false" :trackParsedData=playlist />
                    </div>
                </div>

                <input type="radio" name="my_tabs_1" role="tab" class="tab" aria-label="Albums" />
                <div role="tabpanel" class="tab-content" v-if="playlists.length != 0">
                    <p><br>This feature should work.<br><br>But Audius Not.</p>
                    <div v-for="playlist in playlists">
                        <PlaylistCard v-if="playlist.is_album" :trackParsedData=playlist />
                    </div>
                    <div class="collapse collapse-arrow bg-base-200 mt-4 w-[88.5rem] hidden lg:grid">
                        <input type="radio" name="my-accordion-2" />
                        <div class="collapse-title text-xl font-medium">
                            Show raw playlist data
                        </div>
                        <div class="collapse-content">
                            <pre>{{ playlists }}</pre>
                            <p class="text-error">You see? No <code>playlist.is_album</code> anywhere.</p>
                        </div>
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
        this.fetchTracks()
        this.fetchPlaylist()
        this.fetchUser()
    },
    methods: {
        async fetchTracks() {
            const { data } = await useFetch(`https://blockdaemon-audius-discovery-03.bdnodes.net/v1/tracks/search?query=${this.$route.query.query}&limit=100`)
            this.tracks = data.value.data
        },
        async fetchPlaylist() {
            const { data } = await useFetch(`https://blockdaemon-audius-discovery-03.bdnodes.net/v1/playlists/search?query=${this.$route.query.query}&limit=100`)
            this.playlists = data.value.data
        },
        async fetchUser() {
            const { data } = await useFetch(`https://blockdaemon-audius-discovery-03.bdnodes.net/v1/users/search?query=${this.$route.query.query}&limit=100`)
            this.users = data.value.data
        }
    },
    watch: {
        '$route.query'() {
            this.fetchTracks()
            this.fetchPlaylist()
            this.fetchUser()
        }
    }
}
</script>