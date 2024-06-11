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
            <div class="hidden lg:flex">
                <ThemeDropdown />
            </div>
            <NuxtLink v-if="user" class="ml-3 flex btn btn-ghost p-0 rounded-lg mt-1 px-1" :to="'/user/' + user.handle">
                <div class="mr-1 leading-none flex flex-col justify-end items-end">
                    <h1 class="font-semibold">{{ user.name }}</h1>
                    <p class="text-sm" :to="'/user/' + user.handle">@{{ user.handle }}</p>
                </div>
                <img :src="user.profilePicture['480x480']" alt="User Avatar" class="rounded-full h-10 w-10" />
            </NuxtLink>
            <div v-else>
                <button @click="login()" class="col-span-2
                font-family-[Helvetica,Arial,sans-serif]
                text-center
                text-white
                font-bold
                flex
                items-center
                border-0
                h-7
                text-sm
                px-4
                justify-center
                bg-[#CC0FE0]
                rounded-md
                transition-all
                duration-[0.07s]
                ease-in-out
                hover:bg-[#D127E3]
                hover:scale-[1.04]
                active:bg-[#A30CB3]
                ">
                    <svg width="18" height="18" viewBox="0 0 56 48" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        style="padding-right: 5px;">
                        <g id="Assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="assets" transform="translate(-1555.000000, -2588.000000)">
                                <g id="audiusLogoGlyph" transform="translate(1555.000000, 2588.000000)">
                                    <path
                                        d="M55.8191698,46.0362519 L42.4551012,23.3458831 L36.1870263,12.7036635 L29.0910326,0.65551431 C28.5766233,-0.217848954 27.2890668,-0.218676884 26.7734944,0.654065432 L13.3787621,23.3270477 L7.90582764,32.5909699 C7.39025522,33.4637122 8.03324043,34.5553386 9.06332791,34.5560631 L19.4031138,34.56279 C19.881044,34.5631005 20.3230236,34.3136864 20.5623059,33.9087249 L25.9362708,24.8122516 L26.7580568,23.4212248 C26.790518,23.3662709 26.8260456,23.3149392 26.8641108,23.2669192 C27.4325516,22.5520012 28.5935412,22.6041608 29.0755951,23.4226737 L34.6514114,32.8894388 L35.682239,34.6396841 C35.7412402,34.7399672 35.7843808,34.8430445 35.813987,34.9470533 C36.0430129,35.7492145 35.4339691,36.6039494 34.5220954,36.6034319 L22.3586676,36.5954631 C21.8806317,36.5951526 21.4387578,36.8445667 21.1994756,37.2496317 L16.0236614,46.0105861 C15.5080889,46.8833284 16.1510741,47.9749548 17.1810559,47.9756793 L27.9002253,47.9827167 L41.2664086,47.9913065 L54.6590261,47.9999997 C55.6892193,48.0006207 56.3335791,46.9096152 55.8191698,46.0362519"
                                        id="Audius-Logo" fill="#ffffff" fill-rule="evenodd"></path>
                                    <rect id="bound" x="0" y="0" width="56" height="48"></rect>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Login with Audius
                </button>
            </div>
        </div>
    </div>
    <dialog id="menu_modal" class="modal" ref="menu_modal">
        <div class=" modal-box bg-base-300">
            <div class="grid grid-cols-5 gap-2 col-span-2">
                <SearchBull placeholderText="Search on MOOD™..." @submit.prevent="handleModalClick();" />
                <ThemeDropdown />
            </div>
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
                    <button @click="logout" class="btn col-span-2 btn-error rounded-md">
                        <Icon name="streamline:logout-1-solid" /> Logout
                    </button>

                </div>
                <div v-else class="grid grid-cols-2 gap-2 col-span-2">
                    <button @click="login()"
                        class="col-span-2 btn font-family-[Helvetica,Arial,sans-serif] text-white font-bold bg-[#CC0FE0] rounded-md hover:bg-[#D127E3] ">
                        <svg width="18" height="18" viewBox="0 0 56 48" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            style="padding-right: 5px;">
                            <g id="Assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="assets" transform="translate(-1555.000000, -2588.000000)">
                                    <g id="audiusLogoGlyph" transform="translate(1555.000000, 2588.000000)">
                                        <path
                                            d="M55.8191698,46.0362519 L42.4551012,23.3458831 L36.1870263,12.7036635 L29.0910326,0.65551431 C28.5766233,-0.217848954 27.2890668,-0.218676884 26.7734944,0.654065432 L13.3787621,23.3270477 L7.90582764,32.5909699 C7.39025522,33.4637122 8.03324043,34.5553386 9.06332791,34.5560631 L19.4031138,34.56279 C19.881044,34.5631005 20.3230236,34.3136864 20.5623059,33.9087249 L25.9362708,24.8122516 L26.7580568,23.4212248 C26.790518,23.3662709 26.8260456,23.3149392 26.8641108,23.2669192 C27.4325516,22.5520012 28.5935412,22.6041608 29.0755951,23.4226737 L34.6514114,32.8894388 L35.682239,34.6396841 C35.7412402,34.7399672 35.7843808,34.8430445 35.813987,34.9470533 C36.0430129,35.7492145 35.4339691,36.6039494 34.5220954,36.6034319 L22.3586676,36.5954631 C21.8806317,36.5951526 21.4387578,36.8445667 21.1994756,37.2496317 L16.0236614,46.0105861 C15.5080889,46.8833284 16.1510741,47.9749548 17.1810559,47.9756793 L27.9002253,47.9827167 L41.2664086,47.9913065 L54.6590261,47.9999997 C55.6892193,48.0006207 56.3335791,46.9096152 55.8191698,46.0362519"
                                            id="Audius-Logo" fill="#ffffff" fill-rule="evenodd"></path>
                                        <rect id="bound" x="0" y="0" width="56" height="48"></rect>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        Login with Audius
                    </button>
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
        },
        logout() {
            const user = useCookie('user')
            user.value = null
            reloadNuxtApp()
        }
    }
}
</script>
