<template>
	<div class="flex flex-row">
		<div
			class="transition-all h-full duration-300 flex-col justify-between bg-[#3094a1] text-white"
			:class="{ 'w-[200px]': expanded, 'w-[50px]': !expanded }"
		>
			<div 
				v-for="item in navItems" 
				:key="item"
			>
				<RouterLink
					v-if="!item.sublinks"
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
				<div v-else>
					<RouterLink
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
				<div v-for="sublink in item.sublinks" :key="sublink">
					<router-link :key="sublink.name" :to="item.link + sublink.link" class="sideBardNavigation">
						<span v-if="expanded">{{ sublink.title }}</span>
					</router-link>
				</div>

				</div>

			</div>
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
		icon: 'notes-medical',
		title: 'Transaction',
		link: '/balance',
	},
	{
		icon: 'wallet',
		title: 'Budget',
		link: '/budget',
		sublinks: [
			{
				icon: '',
				title: 'Create',
				link: '/create'
			},
			{
				icon: '',
				title: 'View',
				link: '/view'
			}
		]
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
