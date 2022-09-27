<template>
  <div class="rootContainer" :class="store.state.toggle">
    <SideBar />

    <div class="mainContainer">
      <transition
        enter-active-class="animate__animated animate__fadeIn animate__slow"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import SideBar from "./components/UI/SideBar.vue";
import "animate.css";
import { useStore } from "vuex";
const store = useStore();
</script>
