<script setup>
const { $auth } = useNuxtApp()

const login = () => {
    $auth.login()
}
const menu_modal = ref(null)

const user = ref(useCookie('user').value)
</script>

<template>
    <div class="navbar bg-base-300 border-b-2 border-primary-content">
        <div class="navbar-start">
            <div class="dropdown hidden">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Test</a>
                    </li>
                    <li>
                        <a>Parent</a>
                        <ul class="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <button class="btn btn-ghost text-xl font-black gap-px rounded-md " onclick="menu_modal.showModal()">
                <Icon name="streamline:ai-generate-variation-spark-solid"
                    class="mr-2 p-1 rounded-lg bg-primary text-primary-content" />
                M
                <Icon name="ph:leaf-fill" />
                <Icon name="ph:fire-fill" />
                D
            </button>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1 gap-2 align-bottom">
                <li>
                    <NuxtLink to="/info">
                        <Icon name="ph:info-fill" /> Infos
                    </NuxtLink>
                </li>
                <li>
                    <SearchBull placeholderText="Search..." />
                </li>
                <li>
                    <a href="https://github.com/DreamCloud-Development/moods.js" target="_blank">
                        <Icon name="ph:github-logo-fill" /> Code
                    </a>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <NuxtLink v-if="user" class="flex btn btn-ghost p-0 rounded-lg mt-1 px-1" :to="'/user/' + user.handle">
                <div class="mr-1 leading-none flex flex-col justify-end items-end">
                    <h1 class="font-semibold">{{ user.name }}</h1>
                    <p class="text-sm" :to="'/user/' + user.handle">@{{ user.handle }}</p>
                </div>
                <img :src="user.profilePicture['480x480']" alt="User Avatar" class="rounded-full h-10 w-10" />
            </NuxtLink>
            <div v-else>
                <LoginButton />
            </div>
        </div>
    </div>
    <dialog id="menu_modal" class="modal" ref="menu_modal">
        <div class=" modal-box bg-base-300">
            <SearchBull placeholderText="Search on MOOD™..." @submit.prevent="handleModalClick();" />
            <div class="grid grid-cols-2 gap-2 mt-4">

                <NuxtLink @click="handleModalClick();" to="/"
                    class=" flex rounded-lg bg-base-100 h-20 justify-center items-center flex-col">
                    <Icon name="streamline:warehouse-1-solid" /> Home
                </NuxtLink>

                <NuxtLink @click="handleModalClick();" to="/info"
                    class="flex rounded-lg bg-base-100 h-20 justify-center items-center flex-col">
                    <Icon name="streamline:information-circle-solid" /> Infos <!-- Then Discovery-->
                </NuxtLink>

                <NuxtLink @click="handleModalClick();" to="/moods"
                    class="flex rounded-lg bg-base-100 h-20 justify-center items-center flex-col">
                    <Icon name="ic:baseline-water-drop" /> MOODS
                </NuxtLink>

                <NuxtLink @click="handleModalClick();" to="/"
                    class="flex rounded-lg bg-base-100 h-20 justify-center items-center flex-col">
                    <Icon name="streamline:ai-settings-spark-solid" /> Settings
                </NuxtLink>

                <div v-if="user" class="grid grid-cols-2 gap-2 col-span-2">
                    <NuxtLink @click="handleModalClick();" to="/favorites"
                        class="flex rounded-lg bg-base-100 h-20 justify-center items-center flex-col">
                        <Icon name="streamline:hearts-symbol-solid" /> Favorites
                    </NuxtLink>

                    <NuxtLink @click="handleModalClick();" :to="'/user/' + user.handle"
                        class="flex rounded-lg bg-base-100 h-20 justify-center items-center flex-col">
                        <Icon name="streamline:user-circle-single-solid" /> Profile
                    </NuxtLink>
                </div>
                <div v-else>
                    <LoginButton />
                </div>

            </div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>

<script>
export default {
    methods: {
        handleModalClick() {
            menu_modal.close()
        }
    }
}
</script>
