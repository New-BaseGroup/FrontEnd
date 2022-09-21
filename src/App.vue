<template>
	<div class="container min-h-screen flex space-x-2 h-max ">
		<SideBar />

		<div class="item w-full h-full bg-white-700">
			<router-view />
		</div>
	</div>
</template>
<script setup>
import {RouterView } from 'vue-router';
import SideBar from './components/UI/SideBar.vue';
</script>
