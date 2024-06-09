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
            <NuxtLink to="/" class="btn btn-ghost text-xl font-black gap-px rounded-md">
                M
                <Icon name="ph:leaf-fill" />
                <Icon name="ph:fire-fill" />
                D
            </NuxtLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1 gap-2 align-bottom">
                <li>
                    <NuxtLink to="/info">
                        <Icon name="ph:info-fill" /> Infos
                    </NuxtLink>
                </li>
                <li>
                    <SearchBull />
                </li>
                <li>
                    <a href="https://github.com/DreamCloud-Development/moods.js">
                        <Icon name="ph:github-logo-fill" /> Code
                    </a>
                </li>
            </ul>
        </div>
        <div class="navbar-center flex lg:hidden">
            <SearchBull />
        </div>
        <div class="navbar-end">
            <ThemeDropdown />
        </div>
    </div>
</template>