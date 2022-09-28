<template>
	<div class="sideBarContainer">
		<div class="sideBarContent">
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
					<span
					    class="ml-2"
					    v-if="expanded"
					>
						{{ item.title }}
						</span>
						</RouterLink>
						<div v-else>
							<RouterLink
							    :key="item.name"
							    :to="item.link"
							    class="sideBardNavigation"
							    active-class="sideBarNavigationActive"
							    @click="setActiveSublink(item)"
							>
								<span>
									<font-awesome-icon :icon="item.icon" />
								</span>
								<span
								    class="ml-2"
								    v-if="expanded"
								>
									{{ item.title }}
									</span>
									</RouterLink>
									<div
									    v-for="sublink in item.sublinks"
									    :key="sublink"
									    v-show="activeSub == item.title"
									>
										<router-link
										    :key="sublink.name"
										    :to="item.link + sublink.link"
										    class="sideBardNavigation"
										    active-class="sideBarNavigationActive"
										>
											<span v-if="expanded">{{ sublink.title }}</span>
											</router-link>
						</div>
		</div>
	</div>
	<ThemeToggle />
	</div>
	<!-- <button
	    @click="expand"
	    class="sideBarButton"
	>
		<font-awesome-icon :icon="expanded === true ? 'caret-left' : 'caret-right'" />
		</button> -->

	</div>
</template>

<script setup>
import { ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";
const expanded = ref(true);
const activeSub = ref("");
function expand() {
    expanded.value = !expanded.value;
}
function setActiveSublink(parent) {
    this.activeSub == parent.title
        ? (this.activeSub = "")
        : (this.activeSub = parent.title);
}
const hover = ref(false);
const navItems = [
    {
        icon: "home",
        title: "Dashboard",
        link: "/dashboard",
    },
    {
        icon: "notes-medical",
        title: "Transaction",
        link: "/balance",
        sublinks: [
            {
                icon: "",
                title: "Create",
                link: "/create",
            },
            {
                icon: "",
                title: "View",
                link: "/view",
            },
        ],
    },
    {
        icon: "wallet",
        title: "Budget",
        link: "/budget",
        sublinks: [
            {
                icon: "",
                title: "Create",
                link: "/create",
            },
            {
                icon: "",
                title: "View",
                link: "/view",
            },
        ],
    },
    {
        icon: "id-card",
        title: "Register",
        link: "/register",
    },
    {
        icon: "eye",
        title: "Login",
        link: "/login",
    },
];
</script>
