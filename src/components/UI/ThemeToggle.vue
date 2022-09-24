<template>
  <button @click="ToggleTheme">
    <font-awesome-icon
      v-if="theme === 'theme-light'"
      icon="moon"
      class="text-[#2c2c2c] text-4xl"
    />
    <font-awesome-icon v-else icon="sun" class="text-[#f1ed0b] text-4xl" />
  </button>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const theme = ref("theme-light");

localStorage.setItem("theme", theme.value);

const emitThemeClass = defineEmits(["theme"]);

theme.value = localStorage.getItem("theme") || "theme-light";

const ToggleTheme = () => {
  theme.value = theme.value == "theme-light" ? "theme-dark" : "theme-light";
  localStorage.setItem("theme", theme.value);
  emitThemeClass("theme", theme.value);
  console.log("toggle comp", theme.value);
};
</script>
