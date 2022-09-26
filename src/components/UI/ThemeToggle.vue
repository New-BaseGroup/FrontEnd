<template>
 
    <button @click="ToggleTheme">
      <font-awesome-icon
      v-if="theme === 'theme-light'"
      icon="moon"
      class="text-xl text-[#fff] hover:text-[#2b2b2b] "
      />
      <font-awesome-icon v-else icon="sun" class=" text-xl" />
    </button>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const theme = ref("theme-light");

localStorage.setItem("theme", theme.value);

const emitThemeClass = defineEmits(["theme"]);

theme.value = localStorage.getItem("theme");

const ToggleTheme = () => {
  theme.value = theme.value == "theme-light" ? "theme-dark" : "theme-light";
  localStorage.setItem("theme", theme.value);
  emitThemeClass("theme", theme.value);
  console.log("toggle comp", theme.value);
};
</script>
