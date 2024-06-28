<template>
    <div @click="toggleDark()" class="toggle-switch-container flex items-center">
        <input type="checkbox" id="toggle-switch" v-model="isDark"
            class="toggle-input appearance-none w-10 h-5 bg-gray-400 rounded-3xl relative cursor-pointer outline-none checked:bg-blue-500">
    </div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
console.log(isDark.value);
const toggleDark = useToggle(isDark); 
</script>

<style>
.toggle-input::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 50%;
    transform: translateY(-50%);
    left: 2px;
    transition: 0.2s;
}

.toggle-input:checked::before {
    left: 20px;
}
</style>