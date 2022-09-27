<template>
  <div class="body-color content-wrapper flex space-x-2 min-h-screen w-max" :class="store.state.toggle">

      <div class="content-wrapper">
        <SideBar />
      </div>

      <div class="item w-screen h-auto text-textcolor-content content-wrapper">
        <router-view />
      </div>

  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import SideBar from "./components/UI/SideBar.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
