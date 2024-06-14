<template>
    <div class="settings backdrop-blur-xl border-2 border-gray-300 rounded-full w-1/2 m-auto">
        <p class="text-center font-bold text-xl">Settings</p>
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
</template>
<script lang="ts" setup>
</script>
<style></style>