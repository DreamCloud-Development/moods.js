<template>
    <div class="grid grid-cols-8 gap-0 align-middle mb-1">
        <div>
            <img class="h-8 w-8 rounded-lg" :src='trackParsedData.artwork["480x480"]' alt="Cover Image" />
        </div>
        <div class="text-xs col-span-2 font-black flex align-middle">

            <NuxtLink :to="'/user/' + trackParsedData.user.name">
                <Icon name="ph:person-fill" />
                {{ trackParsedData.user.name }}
            </NuxtLink>
        </div>
        <div class="col-span-5 text-xs flex align-middle">
            <!--Icon name="ph:disc-fill" />
            {{ trackParsedData.genre }}
            -
            <Icon name="ph:clock-fill" />
            {{ new Date(trackParsedData.duration * 1000).toISOString().substring(14, 19) }}-->
            <NuxtLink :to="'/track/' + trackParsedData.id">
                <h2 class="text-md">{{ trackParsedData.title }}</h2>
            </NuxtLink>
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