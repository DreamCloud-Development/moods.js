<template>
    <NuxtLink :to="'/user/' + userParsedData.handle"
        class="card card-side bg-base-300 border-2 border-primary-content mt-2">
        <figure class="hidden lg:flex">
            <img class="h-32 w-32 rounded-l-none hidden lg:flex" :src="userParsedData.profile_picture['480x480']"
                alt="Cover Image" />
        </figure>
        <div class="card-body col-span-2 p-2 lg:p-5">
            <h2 class="text-base lg:text-lg card-title">
                <Icon name="streamline:user-circle-single-solid" /> {{ userParsedData.name }}
                <span class="text-primary font-normal text-base">@{{
                    userParsedData.handle }}</span>
            </h2>
            <p class="font-normal" v-html="userParsedData.bio || '<i>no bio set<i/>'">
            </p>
        </div>
    </NuxtLink>
</template>

<script>
export default {
    props: {
        userParsedData: Object,
    }
};
</script>