<template>
	<div
	    @click="ToggleTheme"
	    class="toggle"
	>
		<font-awesome-icon
		    v-if="theme === 'light-theme'"
		    icon="moon"
		    class="text-xl text-[#fff] hover:text-[#2b2b2b]"
		/>
		<font-awesome-icon
		    v-else
		    icon="sun"
		    class="text-xl text-[#ccf807]"
		/>
		<span class="sideBarText"> Theme </span>
		</div>
</template>

<script setup>
import { ref } from "vue";
import { useSiteStore } from "../../stores/site";
const siteStore = useSiteStore();

const theme = ref("light-theme");

if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "light-theme");
} else {
    theme.value = localStorage.getItem("theme");
}

const ToggleTheme = () => {
    theme.value = theme.value == "light-theme" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", theme.value);
    siteStore.setTheme();
};
</script>
