<template>
    <div class="card card-side bg-base-300 border-2 border-primary-content mx-2 lg:mx-10 mt-2">
        <figure class="hidden lg:flex">
            <img class="h-32 w-32 rounded-l-none hidden lg:flex" :src="trackParsedData.artwork['480x480']"
                alt="Cover Image" />
        </figure>
        <div class="card-body col-span-2">
            <NuxtLink :to="'/track/' + trackParsedData.id">
                <h2 class="card-title">{{ trackParsedData.title }}</h2>
            </NuxtLink>
            <p>
                <NuxtLink :to="'/user/' + trackParsedData.user.handle">
                    <Icon name="ph:person-fill" />
                    {{ trackParsedData.user.name }}
                </NuxtLink>
                <span class="font-black"> - </span>
                <Icon name="ph:disc-fill" />
                {{ trackParsedData.genre }}
                <span class="font-black"> - </span>
                <Icon name="ph:clock-fill" />
                {{ new Date(trackParsedData.duration * 1000).toISOString().substring(14, 19) }}
                <span class="font-black"> - </span>
                <Icon name="ph:play-fill" />
                {{ trackParsedData.play_count }} Ecoutes
            </p>
        </div>
        <div class="mr-8 start-2 flex items-center">
            <PlayButton :trackId=trackParsedData.id />
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