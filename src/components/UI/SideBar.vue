<template>
	<div class="flex flex-row">
		<div
			class="transition-all h-full duration-300 flex-col justify-between bg-[#3094a1] text-white"
			:class="{ 'w-[200px]': expanded, 'w-[50px]': !expanded }"
		>
			<RouterLink
				v-for="item in navItems"
				:key="item.name"
				:to="item.link"
				class="sideBardNavigation"
				active-class="sideBarNavigationActive"
			>
				<span>
					<font-awesome-icon :icon="item.icon" />
				</span>
				<span class="ml-2" v-if="expanded">
					{{ item.title }}
				</span>
			</RouterLink>
		</div>
		<button @click="expand" class="sideBarButton" >
			<font-awesome-icon :icon="expanded === true ? 'caret-left' : 'caret-right'" />
		</button>
		
	</div>
</template>

<script setup>
import { ref } from 'vue';
const expanded = ref(true);
function expand() {
	expanded.value = !expanded.value;
}
const hover = ref(false);
const navItems = [
	{
		icon: 'home',
		title: 'Dashboard',
		link: '/dashboard',
	},
	{
		icon: 'building-columns',
		title: 'Income',
		link: '/income',
	},
	{
		icon: 'notes-medical',
		title: 'Transaction',
		link: '/expense',
	},
	{
		icon: 'wallet',
		title: 'Budget',
		link: '/budget',
	},
	{
		icon: 'id-card',
		title: 'Register',
		link: '/register',
	},
	{
		icon: 'eye',
		title: 'Login',
		link: '/login',
	},
];
</script>
