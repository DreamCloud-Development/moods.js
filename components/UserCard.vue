<template>
    <div class="card card-side bg-base-300 border-2 border-primary-content mt-2">
        <figure class="hidden lg:flex">
            <img class="h-32 w-32 rounded-l-none hidden lg:flex" :src="userParsedData.profile_picture['480x480']"
                alt="Cover Image" />
        </figure>
        <div class="card-body col-span-2">
            <NuxtLink :to="'/user/' + userParsedData.name">
                <h2 class="card-title">{{ userParsedData.name }}</h2>
            </NuxtLink>
            <p>{{ userParsedData.bio }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        userParsedData: Object,
    }
};
</script>