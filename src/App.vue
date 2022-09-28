<template>
	<div
	    class="rootContainer"
	    :class="siteStore.getTheme"
	>
		<SideBar />

		<div class="mainContainer">
			<router-view v-slot="{ Component }">
				<component :is="Component" />
			</router-view>
		</div>
		</div>
</template>
<script setup>
import { RouterView } from "vue-router";
import SideBar from "./components/UI/SideBar.vue";
import { useSiteStore } from "./stores/site";
const siteStore = useSiteStore();
</script>
<style>
</style>
