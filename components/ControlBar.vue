<script lang="ts" setup>
import { state, getPlaylist, addTrackToPlaylist, setPlaylistIndex } from '~/stores/playlist'
import { watch } from 'vue'

let audioPlayer = ref(null)
const trackData = ref('string')
const isPlaying = ref(true)

const playlist = computed({
    get: () => state.playlist,
    set: value => addTrackToPlaylist(value),
})

const index = computed({
    get: () => state.playlistIndex,
    set: value => setPlaylistIndex(value),
})

const getTrackData = (trackId: string, arg: string) => {
    fetch('https://audius-discovery-6.cultur3stake.com/v1/tracks/' + trackId + '?app_name=MOODS-TM',
        {
            method: 'GET',

        }).then(response => response.json())
        .then(data => {
            // Handle the JSON data
            trackData.value = data.data;
            console.log(trackData.value)
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
    audioPlayer.play();
    getTrackData(state.playlist[state.playlistIndex]);
    console.log
})

watch(state.playlist, (newValue, oldValue) => {
    console.log("Playlist updated", newValue, oldValue)
    if (state.playlistIndex === -1) {
        setPlaylistIndex(0);
    }
})

const handleNextTrack = () => {
    const currentIndex = state.playlistIndex;
    const nextIndex = currentIndex + 1;

    if (nextIndex < playlist.value.length) {
        setPlaylistIndex(nextIndex);
    } else {
        console.log('Reached the end of the playlist');
    }
}

const playPauseButton = () => {
    if (isPlaying.value) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying.value = !isPlaying.value;
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
</script>

<template>
    <div v-if="state.playlistIndex != -1">
        <div
            class="fixed bottom-0 left-0 z-50 grid w-full h-24 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-gray-700 dark:border-gray-600">
            <div class="items-center justify-center hidden me-auto md:flex">
                <img class="h-8 me-3 rounded" :src="trackData.artwork['480x480']" alt="Song's Artwork">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ trackData.title }}</span>
            </div>
            <div class="flex items-center w-full">
                <div class="w-full">
                    <div class="flex items-center justify-center mx-auto mb-1">

                        <button data-tooltip-target="tooltip-shuffle" type="button"
                            class="p-2.5 group rounded-full hover:bg-gray-100 me-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                            <Icon name="streamline:shuffle-solid" class="text-error" />
                            <span class="sr-only">Shuffle video</span>
                        </button>
                        <div id="tooltip-shuffle" role="tooltip"
                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Shuffle video
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>


                        <button @click="redoTrack();" data-tooltip-target="tooltip-previous" type="button"
                            class="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                            <Icon name="streamline:button-previous-solid" />
                            <span class="sr-only">Previous Song</span>
                        </button>
                        <div id="tooltip-previous" role="tooltip"
                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Previous video
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>


                        <button @click="playPauseButton();" data-tooltip-target="tooltip-pause" type="button"
                            class="inline-flex items-center justify-center p-2.5 mx-2 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                            <Icon
                                :name="isPlaying ? 'streamline:button-pause-2-solid' : 'streamline:button-play-solid'" />
                            <span class="sr-only">Pause video</span>
                        </button>
                        <div id="tooltip-pause" role="tooltip"
                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Pause video
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>


                        <button @click="skipTrack();" data-tooltip-target="tooltip-next" type="button"
                            class="p-2.5 group rounded-full hover:bg-gray-100 me-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                            <Icon name="streamline:button-next-solid" />
                            <span class="sr-only">Next video</span>
                        </button>
                        <div id="tooltip-next" role="tooltip"
                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Next video
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>


                        <button data-tooltip-target="tooltip-restart" type="button"
                            class="p-2.5 group rounded-full hover:bg-gray-100 me-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                            <Icon name="streamline:shuffle-solid" class="text-error" />
                            <span class="sr-only">Restart video</span>
                        </button>
                        <div id="tooltip-restart" role="tooltip"
                            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Restart video
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>


                    </div>
                    <div class="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">3:45</span>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-800">
                            <div class="bg-blue-600 h-1.5 rounded-full" style="width: 65%"></div>
                        </div>
                        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">5:00</span>
                    </div>
                </div>
            </div>
            <div class="items-center justify-center hidden ms-auto md:flex">
                <button data-tooltip-target="tooltip-playlist" type="button"
                    class="p-2.5 group rounded-full hover:bg-gray-100 me-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <Icon name="streamline:shuffle-solid" class="text-error" />
                    <span class="sr-only">View playlist</span>
                </button>
                <div id="tooltip-playlist" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    View playlist
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>


                <button data-tooltip-target="tooltip-captions" type="button"
                    class="p-2.5 group rounded-full hover:bg-gray-100 me-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <Icon name="streamline:shuffle-solid" class="text-error" />
                    <span class="sr-only">Captions</span>
                </button>
                <div id="tooltip-captions" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Toggle captions
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>


                <button data-tooltip-target="tooltip-expand" type="button"
                    class="p-2.5 group rounded-full hover:bg-gray-100 me-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <Icon name="streamline:shuffle-solid" class="text-error" />
                    <span class="sr-only">Expand</span>
                </button>
                <div id="tooltip-expand" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Full screen
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>


                <button data-tooltip-target="tooltip-volume" type="button"
                    class="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600">
                    <Icon name="streamline:shuffle-solid" class="text-error" />
                    <span class="sr-only">Adjust volume</span>
                </button>
                <div id="tooltip-volume" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Adjust volume
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                
            </div>
        </div>
    </div>
</template>