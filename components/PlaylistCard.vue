<template>
    <div class="card card-side bg-base-300 border-2 border-primary-content mt-2">
        <figure class="hidden lg:flex">
            <img class="h-32 w-32 rounded-l-none hidden lg:flex" :src="trackParsedData.artwork['480x480']"
                alt="Cover Image" />
        </figure>
        <div class="card-body col-span-2">
            <NuxtLink :to="'/playlist/' + trackParsedData.id">
                <h2 class="card-title">{{ trackParsedData.playlist_name }}</h2>
            </NuxtLink>
            <p>
                <NuxtLink :to="'/user/' + trackParsedData.user.handle">
                    <Icon name="ph:person-fill" />
                    {{ trackParsedData.user.name }}
                </NuxtLink>

            </p>
        </div>
        <div class="mr-8 start-2 flex items-center">
            <PlaylistButton :playlistId=trackParsedData.id />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        trackParsedData: Object,
    }
};
</script>