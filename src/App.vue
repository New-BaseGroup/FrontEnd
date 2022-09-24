<template>
  <div
    @theme="HandleEmits"
    class="body-color content-wrapper"
    :class="ToggleTheme"
  >
    <div class="container flex space-x-2 h-screen w-full">
      <div class="bg-background-primary content-wrapper">
        <SideBar @theme="HandleEmits" />
      </div>

      <div class="item w-screen h-auto bg-background-secondary content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import SideBar from "./components/UI/SideBar.vue";

const ToggleTheme = ref("theme-light");

function HandleEmits(data) {
  ToggleTheme.value = data;
  console.log("app: " + ToggleTheme.value);
}
</script>
