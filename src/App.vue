<template>
	<div class="container flex space-x-2 h-screen w-auto">
		<SideBar />

		<div class="item w-screen h-auto bg-white-700">
			<router-view />
		</div>
	</div>
</template>
<script setup>
import {RouterView } from 'vue-router';
import SideBar from './components/UI/SideBar.vue';
</script>
