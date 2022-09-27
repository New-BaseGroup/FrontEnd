<template>
	<div class="rootContainer" :class="store.state.toggle">
		<SideBar />

		<div class="mainContainer">
			<router-view />
		</div>
	</div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import SideBar from './components/UI/SideBar.vue';
import { useStore } from 'vuex';
const store = useStore();
</script>
