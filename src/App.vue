<template>
	<div class="grid grid-cols-6 bg-[#FAFAFA]">
	
		<SideBar v-bind:expanded="lexpanded" />
		<main :class="`h-screen  col-start-2 col-end-6 bg-[#FAFAFA] `">
			<div>
        <button @click="expand">test</button>
				<router-view />
			</div>
		</main>
	</div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import SideBar from './components/UI/SideBar.vue';
const lexpanded = ref(true);
function expand() {
	lexpanded.value = !lexpanded.value;
}
</script>
