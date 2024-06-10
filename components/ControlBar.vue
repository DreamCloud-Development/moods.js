<script lang="ts" setup>
import { state, getPlaylist, addTrackToPlaylist, setPlaylistIndex } from '~/stores/playlist'
import { watch } from 'vue'

let audioPlayer = ref(null)
const trackData = ref('string')
let mediaData
const bulkTrackData = ref('string')
const isPlaying = ref(true)
const isShuffled = ref(false)
const isLooped = ref(false)
const musicBarWidth = ref(0)
const currentTime = ref(0)
const currentVolume = ref(1)

const playlist = computed({
    get: () => state.playlist,
    set: value => addTrackToPlaylist(value),
})

const index = computed({
    get: () => state.playlistIndex,
    set: value => setPlaylistIndex(value),
})

const getTrackData = (trackId: string) => {
    fetch('https://audius-discovery-6.cultur3stake.com/v1/tracks/' + trackId + '?app_name=MOODS-TM',
        {
            method: 'GET',

        }).then(response => response.json())
        .then(data => {
            // Handle the JSON data
            trackData.value = data.data;
            setupMediaSession(data.data);
            return data.data;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });


}

const getBulkData = () => {
    fetch('https://audius-discovery-6.cultur3stake.com/v1/tracks?' + state.playlist.map(item => `id=${item}`).join('&') + '&app_name=MOODS-TM',
        {
            method: 'GET',

        }).then(response => response.json())
        .then(data => {
            // Handle the JSON data
            bulkTrackData.value = data.data;
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}


watch(index, (newValue, oldValue) => {
    console.log("Index updated", newValue, oldValue)
    audioPlayer = new Audio('https://audius-discovery-4.theblueprint.xyz/v1/tracks/' + state.playlist[state.playlistIndex] + '/stream');
    audioPlayer.addEventListener('ended', handleNextTrack);
    audioPlayer.addEventListener('timeupdate', updateMusicBar)
    audioPlayer.volume = currentVolume.value
    audioPlayer.play();
    getTrackData(state.playlist[state.playlistIndex]);
})

watch(state.playlist, (newValue, oldValue) => {
    if (state.playlistIndex === -1) {
        setPlaylistIndex(0);
    }
    getBulkData();
})

const updateMusicBar = () => {
    currentTime.value = audioPlayer.currentTime;
    musicBarWidth.value = (audioPlayer.currentTime / audioPlayer.duration) * 100
}

const handleNextTrack = () => {
    const currentIndex = state.playlistIndex;
    const nextIndex = currentIndex + 1;

    if (nextIndex < playlist.value.length) {
        setPlaylistIndex(nextIndex);
    } else {
        if (isLooped.value === true) {
            if (currentIndex === 0) {
                audioPlayer.currentTime = 0;
                audioPlayer.play();
                console.log('Looping the playlist, but a single track is playing')
            } else {
                setPlaylistIndex(0);
                console.log('Looping the playlist')
            }

        } else {
            console.log('Reached the end of the playlist');
        }
    }
}

const playPauseButton = () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    isPlaying.value = !isPlaying.value;
}

const shuffleButton = () => {
    isShuffled.value = !isShuffled.value;
}

const loopButton = () => {
    isLooped.value = !isLooped.value;
}

const skipTrack = () => {
    if (state.playlistIndex + 1 < playlist.value.length) {
        audioPlayer.pause();
        setPlaylistIndex(state.playlistIndex + 1);
    }
}

const redoTrack = () => {
    if (state.playlistIndex > 0) {
        audioPlayer.pause();
        setPlaylistIndex(state.playlistIndex - 1);
    }
}

const updateCurrentVolume = () => {
    audioPlayer.volume = currentVolume.value
}

function setupMediaSession(superTrackData) {
    if (navigator.mediaSession) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: superTrackData.title,
            artist: superTrackData.user.name + ' on MOOD™',
            artwork: [
                { src: superTrackData.artwork['480x480'], sizes: '96x96', type: 'image/png' },
                { src: superTrackData.artwork['480x480'], sizes: '256x256', type: 'image/png' }
            ]
        })

        navigator.mediaSession.setActionHandler('play', () => {
            audioPlayer.play()
        })
        navigator.mediaSession.setActionHandler('pause', () => {
            audioPlayer.pause()
        })

        navigator.mediaSession.setActionHandler('previoustrack', () => {
            redoTrack()
        })
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            skipTrack()
        })
    }
}

</script>

<template>
    <div v-if="state.playlistIndex != -1">
        <div
            class="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-4 bg-base-300 border-t-2 border-primary-content md:grid-cols-3">
            <div class="items-center justify-center hidden me-auto md:flex">
                <img class="h-12 me-3 rounded" :src="trackData.artwork['480x480']" alt="Song's Artwork">
                <div class="inline-block leading-none">
                    <span class="text-sm">
                        <NuxtLink :to="'/track/' + trackData.id">
                            <Icon name="ph:music-note-fill" /> {{ trackData.title }}
                        </NuxtLink>
                    </span>
                    <br>
                    <span class="text-sm">
                        <NuxtLink :to="'/user/' + trackData.user.handle">
                            <Icon name="ph:person-fill" /> {{ trackData.user.name }}
                        </NuxtLink>
                    </span>
                </div>
            </div>
            <div class="flex items-center w-full">
                <div class="w-full">
                    <div class="flex items-center justify-center mx-auto mb-1 self-end">
                        <button data-tooltip-target="tooltip-expand" type="button" onclick="sound_modal_3.showModal()"
                            class="p-2.5 mr-8 md:hidden group rounded-full hover:bg-gray-100 me-1 dark:hover:bg-gray-600">
                            <Icon name="streamline:volume-level-high-solid" class="text-primary" />
                            <span class="sr-only">Adjust Volume</span>
                        </button>
                        <dialog id="sound_modal_1" class="modal">
                            <div class="absolute modal-box w-5 left-4 bottom-8 p-0 m-0 rounded-sm"
                                style="height: 136px;">
                                <input type="range" min="0" max="1" step="0.1" orient="vertical" class="translate-y-1"
                                    style="writing-mode: vertical-lr; direction: rtl" v-model="currentVolume"
                                    @input="updateCurrentVolume();" />
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                        <dialog id="sound_modal_3" class="modal">
                            <div class="absolute bottom-28 modal-box flex items-center gap-2 p-2 rounded-lg w-10/12">
                                <Icon name="streamline:volume-mute-solid" />
                                <input type="range" min="0" max="1" step="0.01" class="range" v-model="currentVolume"
                                    @input="updateCurrentVolume();" />
                                <Icon name="streamline:volume-level-high-solid" />
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                        <div class="tooltip" data-tip="Not Implemented">
                            <button data-tooltip-target="tooltip-shuffle" type="button"
                                class="p-2.5 group rounded-full me-1">
                                <Icon name="streamline:play-list-folder-solid" class="text-error" />
                                <span class="sr-only">Add to Playlist</span>
                            </button>
                        </div>


                        <button @click="redoTrack();" data-tooltip-target="tooltip-previous" type="button"
                            class="p-2.5 group rounded-full">
                            <Icon name="streamline:button-previous-solid" class="text-primary" />
                            <span class="sr-only">Previous Song</span>
                        </button>


                        <button @click="playPauseButton();" data-tooltip-target="tooltip-pause" type="button"
                            class="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-primary rounded-lg">
                            <Icon
                                :name="audioPlayer.paused ? 'streamline:button-play-solid' : 'streamline:button-pause-2-solid'"
                                class="text-primary-content" />
                            <span class="sr-only">Pause Song</span>
                        </button>

                        <button @click="skipTrack();" data-tooltip-target="tooltip-next" type="button"
                            class="p-2.5 group rounded-full">
                            <Icon name="streamline:button-next-solid" class="text-primary" />
                            <span class="sr-only">Next Song</span>
                        </button>

                        <div class="tooltip" data-tip="Not Implemented">
                            <button data-tooltip-target="tooltip-restart" type="button"
                                class="p-2.5 group rounded-full ">
                                <Icon name="streamline:hearts-symbol-solid" class="text-error" />
                                <span class="sr-only">Add to Favorites</span>
                            </button>
                        </div>


                        <button data-tooltip-target="tooltip-volume" type="button" onclick="queue_modal.showModal()"
                            class="p-2.5 ml-8 md:hidden group rounded-lg bg-base-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                            <Icon name="ph:playlist-bold" class="text-primary" />
                            {{ playlist.length }}
                            <span class="sr-only">Open Queue</span>
                        </button>
                        <dialog id="queue_modal" class="modal">
                            <div class="modal-box h-96 w-96">
                                <h3 class="font-bold text-lg">My Queue</h3>
                                <div v-if="state.playlistIndex != -1">
                                    <div v-for="track in bulkTrackData">
                                        <!-- Erreur interne de vue ; ça ne marche pas
                                        SongCardMinimal :trackParsedData=track /-->
                                    </div>
                                </div>
                                <div class="flex justify-center gap-2 lg:hidden">
                                    <button @click="shuffleButton();" data-tooltip-target="tooltip-captions"
                                        type="button"
                                        class="btn btn-disabled w-1/2 inline-block p-0 rounded-lg text-error">
                                        <Icon name="streamline:shuffle-solid" class="text-error" />
                                        Shuffle Tracks
                                    </button>
                                    <button @click="loopButton();" data-tooltip-target="tooltip-captions" type="button"
                                        :class="[isLooped ? 'btn btn-success w-1/2 inline-block p-0 rounded-lg' : 'btn btn-ghost w-1/2 inline-block p-0 rounded-lg']">
                                        <Icon name="streamline:arrow-infinite-loop-solid"
                                            :class="[isLooped ? 'text-primary' : 'text-secondary']" />
                                        Loop Tracks
                                    </button>
                                </div>
                            </div>
                            <form method="dialog" class="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>

                    <div class="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex">
                            {{ new Date(currentTime * 1000).toISOString().substring(14, 19) }}</span>
                        <div class="w-full bg-base-100 rounded-full h-1.5">
                            <div class="bg-primary h-1.5 rounded-full" :style="{ width: musicBarWidth + '%' }">
                            </div>
                        </div>
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex">
                            {{ new Date(trackData.duration * 1000).toISOString().substring(14, 19) }}</span>
                    </div>

                </div>
            </div>

            <div class="items-center justify-center hidden ms-auto md:flex">
                <div class="tooltip" data-tip="Not Implemented">
                    <button data-tooltip-target="tooltip-playlist" type="button"
                        class="p-2.5 group rounded-full hover:bg-gray-100 me-1 dark:hover:bg-gray-600">
                        <Icon name="streamline:shuffle-solid" class="text-error" />
                        <span class="sr-only">Shuffle Tracks</span>
                    </button>
                </div>


                <button @click="loopButton();"
                    class="p-2.5 group rounded-full hover:bg-gray-100 me-1  dark:hover:bg-gray-600">
                    <Icon name="streamline:arrow-infinite-loop-solid"
                        :class="[isLooped ? 'text-primary' : 'texttext-secondary']" />
                    <span class="sr-only">Loop Tracks</span>
                </button>


                <button onclick="sound_modal_3.showModal()"
                    class="p-2.5 group rounded-full hover:bg-gray-100 me-1  dark:hover:bg-gray-600">
                    <Icon name="streamline:volume-level-high-solid" class="text-primary" />
                    <span class="sr-only">Adjust Volume</span>
                </button>

                <dialog id="sound_modal_2" class="modal">
                    <div class="absolute modal-box w-3 right-12 bottom-8 p-0 m-0 rounded-sm" style="height: 136px;">
                        <input type="range" min="0" max="1" step="0.1" orient="vertical" class="translate-y-1"
                            style="writing-mode: vertical-lr; direction: rtl" v-model="currentVolume"
                            @input="updateCurrentVolume();" />
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>



                <button onclick="queue_modal.showModal()"
                    class="p-2.5 group rounded-lg bg-base-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <Icon name="ph:playlist-bold" class="text-primary" />
                    {{ playlist.length }}
                    <span class="sr-only">Open Queue</span>
                </button>
            </div>
        </div>
    </div>
</template>
