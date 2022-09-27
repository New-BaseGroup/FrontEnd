<template>
  <div class="flex flex-row h-full">
    <div
      class="transition-all bg-background-primary overflow-clip h-full duration-300 flex flex-col text-white"
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
      <div class="toggle">
        <ThemeToggle />
      </div>
    </div>

    <button @click="expand" class="sideBarButton">
      <font-awesome-icon
        :icon="expanded === true ? 'caret-left' : 'caret-right'"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";

const expanded = ref(true);

function expand() {
  expanded.value = !expanded.value;
}

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
  },
  {
    icon: "wallet",
    title: "Budget",
    link: "/budget",
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
