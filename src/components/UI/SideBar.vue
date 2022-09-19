<template>
	<div
		class="transition-all duration-300 flex h-screen flex-col justify-between bg-[#76C6D1] text-white"
		:class="{ 'w-[200px]': expanded, 'w-[50px]': !expanded }"
	>
		<div class="py-4 pl-5">
			<div v-for="(item, index) in navItems" :key="index" class="flex w-full items-center justify-between mb-14">
				<RouterLink :to="item.link">
					<font-awesome-icon :icon="item.icon"/>
					<span v-if="expanded">
						{{ item.title }}
					</span>
					
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	expanded: { type: Boolean, default: true },
});

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
