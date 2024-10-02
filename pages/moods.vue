<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-center text-6xl font-black my-8 ">
            WIP
        </h1>
        <p class="mt-4 mb-2">Use what works instead ⬇️</p>
        <SearchBull placeholderText="I bet you I work." />
    </div>

    <div class="mx-4 lg:mx-16">
        <h1 class="text-3xl lg:text-4xl font-black mt-6">
            Discover new MOODS
        </h1>
        <div class="grid grid-cols-3 lg:grid-cols-8 mt-4 gap-4">
            <MoodCard gradient="from-green-500 via-green-700 to-green-900" icon="ph:leaf-fill" name="Leafing" />
            <MoodCard gradient="from-red-500 via-red-700 to-red-900" icon="ph:fire-fill" name="Rage Enabled " />
            <MoodCard gradient="from-blue-300 via-blue-500 to-blue-700" icon="ic:baseline-water-drop" name="Chillin'" />
            <MoodCard gradient="from-cyan-200 via-sky-300 to-blue-300" icon="gravity-ui:snowflake"
                name="Frozen<br>Heart" />
            <MoodCard gradient="from-violet-950 via-violet-800 to-sky-900" icon="ph:moon-fill" name="Dark Night" />
            <MoodCard gradient="from-fuchsia-400 via-pink-500 to-rose-600" icon="fluent:dust-28-filled"
                name="You'r<br>Weirdo" />
            <MoodCard gradient="from-orange-300 via-orange-400 to-amber-600" icon="streamline:flash-2-solid"
                name="Electrized" />
            <MoodCard gradient="from-orange-800 via-amber-900 to-rose-950" icon="streamline:bomb-solid" name="Rocky" />
            <MoodCard gradient="from-amber-300 via-amber-400 to-yellow-500" icon="heroicons:sparkles-20-solid"
                name="Poptastic" />
            <MoodCard gradient="from-slate-300 via-slate-400 to-slate-500" icon="fluent:weather-duststorm-24-filled"
                name="Flowing Wind" />
            <MoodCard gradient="bg-[url('/img/rainbow.webp')] bg-center bg-cover" icon="streamline:add-circle-solid"
                name="Comming Soon..." />

        </div>
    </div>
</template>