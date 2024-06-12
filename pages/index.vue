<script lang="ts" setup>

const { data: trendingData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/tracks/trending?time=week&limit=20&app_name=MOODS-TM')
const { data: undergroundData } = await useFetch('https://discovery-au-02.audius.openplayer.org/v1/tracks/trending/underground?time=week&limit=20&app_name=MOODS-TM')

</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-center text-6xl font-black my-8 ">
            Welcome to MOOD
        </h1>
        <SearchBull placeholderText="A track in da head ?" />
        <p class="mt-4">Learn more about us ⬇️</p>
        <NuxtLink class="btn btn-primary" to="/info">About</NuxtLink>
    </div>
    <div class="mx-2 lg:mx-8">
        <h1 class="text-3xl lg:text-4xl font-black mt-6">
            Discover new MOODs
        </h1>
        <div class="grid grid-cols-3 lg:grid-cols-8 mt-4 gap-4">
            <MoodCard gradient="from-green-500 via-green-700 to-green-900" icon="ph:leaf-fill" name="XXX<br>XXX" />
            <MoodCard gradient="from-red-500 via-red-700 to-red-900" icon="ph:fire-fill" name="Rage Enabled " />
            <MoodCard gradient="from-blue-300 via-blue-500 to-blue-700" icon="ic:baseline-water-drop"
                name="[bing]<br>Chillin'" />
            <MoodCard gradient="from-cyan-200 via-sky-300 to-blue-300" icon="gravity-ui:snowflake"
                name="Frozen<br>Heart" />
            <MoodCard gradient="from-violet-950 via-violet-800 to-sky-900" icon="ph:moon-fill" name="XXX<br>XXX" />
            <MoodCard gradient="from-fuchsia-400 via-pink-500 to-rose-600" icon="fluent:dust-28-filled"
                name="You'r<br>Weirdo" />
            <MoodCard gradient="from-orange-300 via-orange-400 to-amber-600" icon="streamline:flash-2-solid"
                name="XXX<br>XXX" />
            <MoodCard gradient="from-orange-800 via-amber-900 to-rose-950" icon="streamline:bomb-solid"
                name="XXX<br>XXX" />
            <MoodCard gradient="from-amber-300 via-amber-400 to-yellow-500" icon="heroicons:sparkles-20-solid"
                name="XXX<br>XXX" />
            <MoodCard gradient="from-slate-300 via-slate-400 to-slate-500" icon="fluent:weather-duststorm-24-filled"
                name="XXX<br>XXX" />

            <div class="flex rounded-lg justify-center items-center flex-col bg-base-300 w-32 lg:w-36">
                <div
                    class="bg-[url('/img/rainbow.webp')] bg-center bg-cover m-2 rounded-lg  h-28 w-28 lg:h-32 lg:w-32 flex justify-center items-center text-6xl lg:text-[6rem]">
                    <Icon name="streamline:add-circle-solid" class="text-base-100" />
                </div>
                <h1 class="text-xl font-black text-center mb-2">Comming Soon...</h1>
            </div>
        </div>

        <h1 class="text-3xl lg:text-4xl font-black mt-14">
            Weekly Trending Tracks
        </h1>
        <div class=" grid grid-cols-4 lg:grid-cols-10 mt-4 gap-4" v-if="trendingData">
            <div class="relative" v-for="track in trendingData.data.slice(0, 19)">
                <img :src="track.artwork['480x480']" alt="IMAGE" class="h-24 w-24 lg:w-32 lg:h-32 rounded-lg ">
                <div class="absolute bottom-2 right-2">
                    <PlayButton :trackId="track.id" />
                </div>
            </div>
            <NuxtLink to="/trending"
                class="bg-[url('/img/rainbow.webp')] bg-center bg-cover rounded-lg flex justify-center flex-col items-center h-24 w-24 lg:w-32 lg:h-32">
                <Icon name="streamline:add-circle-solid"
                    class="text-4xl lg:text-6xl rounded-lg flex items-center justify-center" />
                <h1 class="font-bold mt-2">See All...</h1>
            </NuxtLink>
        </div>
        <h1 class="text-3xl lg:text-4xl font-black mt-14">
            Weekly Underground Tracks
        </h1>
        <div class=" grid grid-cols-4 lg:grid-cols-10 mt-4 gap-4" v-if="undergroundData">
            <div class="relative" v-for="track in undergroundData.data.slice(0, 19)">
                <img :src="track.artwork['480x480']" alt="IMAGE" class="h-24 w-24 lg:w-32 lg:h-32 rounded-lg ">
                <div class="absolute bottom-2 right-2">
                    <PlayButton :trackId="track.id" />
                </div>
            </div>
            <NuxtLink to="/underground"
                class="bg-[url('/img/rainbow.webp')] bg-center bg-cover rounded-lg flex justify-center flex-col items-center h-24 w-24 lg:w-32 lg:h-32">
                <Icon name="streamline:add-circle-solid"
                    class="text-4xl lg:text-6xl rounded-lg flex items-center justify-center" />
                <h1 class="font-bold mt-2">See All...</h1>
            </NuxtLink>
        </div>
    </div>
</template>