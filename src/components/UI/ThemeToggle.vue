<template>
    <div @click="ToggleTheme" class="toggle">
        <font-awesome-icon
            v-if="siteStore.getTheme === 'light-theme'"
            icon="moon"
            class="text-xl text-textcolor-active hover:text-[#2b2b2b]" />
        <font-awesome-icon v-else icon="sun" class="text-xl text-[#94A3B8]" />
        <span class="sideBarText"> Theme </span>
    </div>
</template>

<script setup>
import { useSiteStore } from "../../stores/site";
const siteStore = useSiteStore();

if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "light-theme");
} else {
    siteStore.setTheme();
}

const ToggleTheme = () => {
    siteStore.getTheme == "light-theme"
        ? localStorage.setItem("theme", "dark-theme")
        : localStorage.setItem("theme", "light-theme");
    siteStore.setTheme();
};
</script>
