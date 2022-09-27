<template>
  <button @click="ToggleTheme">
    <font-awesome-icon
      v-if="theme === 'light-theme'"
      icon="moon"
      class="text-xl text-[#fff] hover:text-[#2b2b2b]"
    />
    <font-awesome-icon v-else icon="sun" class="text-xl text-[#ccf807]" />
  </button>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const theme = ref("light-theme");

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light-theme");
} else {
  theme.value = localStorage.getItem("theme");
}

const ToggleTheme = () => {
  theme.value = theme.value == "light-theme" ? "dark-theme" : "light-theme";
  localStorage.setItem("theme", theme.value);
  store.commit("setTheme", theme.value);
};
</script>
