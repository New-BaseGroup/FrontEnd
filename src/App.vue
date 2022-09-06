<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="grid grid-cols-6 bg-[#FAFAFA]">
    <SideBar />
    <main :class="`h-screen  col-start-2 col-end-6 bg-[#FAFAFA] `">
      <div>
        <router-view />
      </div>
    </main>
  </div>
</template>
<script>
import SideBar from "./components/UI/SideBar.vue";
export default {
  components: { SideBar },
  data() {
    return {
      expandSideBar: true,
      sideBarWidth: "",
      rotateIcon: "",
    };
  },
  methods: {
    btoggle() {
      this.expandSideBar = !this.expandSideBar;
      if (this.expandSideBar) {
        this.sideBarWidth = "";
        this.rotateIcon = "";
      } else {
        this.sideBarWidth = "w-[80px]";
        this.rotateIcon = "rotate-180";
      }
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
