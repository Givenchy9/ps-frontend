<template>
    <div class="search backdrop-blur-xl border-2 border-gray-300 rounded-full w-1/2 m-auto">
        <p class="text-center font-bold text-xl">Favorites</p>
    </div>
    <div>
        <div class="relative mt-10 w-1/2 m-auto">
            <i
                class="fa-solid fa-magnifying-glass absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></i>
            <input type="text" name="price" id="price"
                class=" block w-full rounded-full py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="Search">
        </div>
    </div>
    <div class="favorites-container flex flex-col justify-between">
        <Footer />
    </div>
</template>

<script setup>
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.favorites-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* Full height of the viewport */
}

.favorites-content {
    flex-grow: 1;
    /* Allow the content to grow and take up available space */
}
</style>