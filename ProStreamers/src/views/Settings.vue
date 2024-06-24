<template>
    <div class="search backdrop-blur-xl border-2 border-gray-300 rounded-full w-1/2 m-auto">
        <p class="text-center font-bold text-xl">Favorites</p>
    </div>
    <div class="grid grid-cols-4">
        <div class=" col-span-1 h-96 p-2">
            <div class="rounded-xl h-full mt-48">
                <div class="grid grid-col-2 gap-2">
                    <RouterLink to="/User" active-class="bg-black/40"
                        class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-black/40 duration-700">
                        Account</RouterLink>
                    <RouterLink to="/Endpoint" active-class="bg-black/40"
                        class="py-2 px-4 rounded-full bg-gray-200 font-bold text-center hover:bg-black/40 duration-700">
                        Endpoint</RouterLink>
                </div>
            </div>
        </div>
        <div class="col-span-3">
            <router-view></router-view>
        </div>
    </div>
    <div class="favorites-container">
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