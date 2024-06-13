<template>
    <div
        :class="['card', 'card-side', 'border-primary-content', 'border-2', 'mt-2', cool ? 'bg-primary' : 'bg-base-300']">
        <figure class="hidden lg:flex">
            <img class="h-32 w-32 rounded-l-none hidden lg:flex" :src="trackParsedData.artwork['480x480']"
                alt="Cover Image" />
        </figure>
        <div class="card-body col-span-2 p-2 lg:p-5">
            <NuxtLink :to="'/track/' + trackParsedData.id">
                <h2 class="text-base lg:text-lg card-title">
                    <Icon name="streamline:music-note-1-solid" />{{ trackParsedData.title }}
                </h2>
            </NuxtLink>
            <p class="font-normal">
                <NuxtLink :to="'/user/' + trackParsedData.user.handle">
                    <Icon name="ph:person-fill" />
                    {{ trackParsedData.user.name }}
                </NuxtLink>
                <span class="font-black"> - </span>
                <Icon name="ph:disc-fill" />
                {{ trackParsedData.genre }}
                <span class="font-black"> - </span>
                <Icon name="ph:clock-fill" />
                {{ new Date(trackParsedData.duration * 1000).toISOString().substring(14, 19)}}
                <span class="font-black"> - </span>
                <Icon name="ph:play-fill" />
                {{ trackParsedData.play_count }} Lisenings
            </p>
        </div>
        <div class="mr-2 lg:mr-8  start-2 flex items-center">
            <PlayButton :trackId=trackParsedData.id />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        trackParsedData: Object,
        cool: false,
    }
};
</script>
