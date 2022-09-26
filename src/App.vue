<template>
  <div class="body-color content-wrapper" :class="store.state.toggle">
    <div class="container flex space-x-2 h-screen w-max">
      <div class="content-wrapper">
        <SideBar />
      </div>

      <div class="item w-screen h-auto text-textcolor-content content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import SideBar from "./components/UI/SideBar.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
