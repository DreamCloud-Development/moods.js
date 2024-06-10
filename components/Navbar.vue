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
            <button class="btn btn-ghost text-xl font-black gap-px rounded-md" onclick="menu_modal.showModal()">
                <Icon name="streamline:ai-generate-variation-spark-solid" class="mr-1 p-1 bg-primary" />
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
                    <SearchBull />
                </li>
                <li>
                    <a href="https://github.com/DreamCloud-Development/moods.js" target="_blank">
                        <Icon name="ph:github-logo-fill" /> Code
                    </a>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <ThemeDropdown />
        </div>
    </div>
<dialog id="menu_modal" class="modal">
  <div class="modal-box bg-base-300">
    <SearchBull />
    <div class="grid grid-cols-2 gap-2 mt-2">
        <div class="rounded-lg bg-base-100 w-1/2">
            <Icon name="streamline:warehouse-1-solid" />
        </div>
        <div class="rounded-lg bg-base-100 w-1/2">
            <Icon name="streamline:ai-settings-spark-solid" />
        </div>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
</template>
