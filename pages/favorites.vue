<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { addTrackToPlaylist } from '~/stores/playlist'

const route = useRoute()
const user = ref(useCookie('user').value)
let blukList = Array<string>()

const login = () => {
    $auth.login()
}

if (!user) {
    login()
}

const { data: favoritesData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/users/' + user.value.userId + '/favorites?app_name=MOODS-TM')

const addAllToPlaylist = () => {
    console.log("Loading Playlist...")
    for (let i = 0; i < favoritesData.value.data.length; i++) {
        addTrackToPlaylist(favoritesData.value.data[i].favorite_item_id);
    }
    console.log("Playlist Loaded!")
}

for (let i = 0; i < favoritesData.value.data.length; i++) {
    if (favoritesData.value.data[i].favorite_type === "SaveType.track") {
        blukList.push(favoritesData.value.data[i].favorite_item_id)
        blukList.push("&id=")
    }  
}
const { data: bulkTracksData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/tracks?id=' + ''.concat(...blukList) + '&app_name=MOODS-TM')

</script>

<template>
    <div v-if="favoritesData">
        <h2 class=" card-title mt-4 mx-12">My favorites
            <button class="btn btn-primary mx-10 rounded-lg" @click="addAllToPlaylist();">
                <Icon name="streamline:add-layer-2-solid" /> Play Next
            </button>
        </h2>

        <div class="mx-2 lg:mx-10" v-if="bulkTracksData">
            <p v-for="(track, index) in bulkTracksData.data">
                <SongCard :trackParsedData="bulkTracksData.data[index]" />
            </p>
        </div>
    </div>
</template>