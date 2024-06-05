<template>
    <div class="card card-side bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ title }}</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Watch</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    }
};
</script>