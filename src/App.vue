<template>
<div class="flex h-screen bg-background-secondary"
:class="siteStore.getTheme">
  <div class="flex-1 flex flex-col overflow-hidden">
<Header/>
    <div class="flex h-full">
		<template v-if="$route.name != 'home'">
     <SideBar/>
	</template>
      <main class="flex flex-col w-full overflow-x-hidden overflow-y-auto mb-14" v-if="$route.name != 'home'">
        <div class="flex w-full mx-auto px-6 py-8">
         <div class="flex flex-col w-full h-full">
				<router-view v-slot="{ Component }">
				<component :is="Component" />
			</router-view></div>
       </div>
      </main>
	  <main class="w-full overflow-y-auto" v-if="$route.name === 'home'">
		<router-view v-slot="{ Component }">
				<component :is="Component" />
			</router-view>
	  </main>
      <nav v-if="$route.name != 'home'" class="flex w-72 h-full ">
        <div class="w-full flex mx-auto px-6 py-8">
          <div class="w-full h-full flex items-center justify-center text-gray-900 text-xl "></div>
        </div>
      </nav>
    </div>
  </div>
</div>
</template>
<script setup>
import { RouterView } from "vue-router";
import Header from "./components/UI/Header.vue";
import SideBar from "./components/UI/SideBar.vue";
import { useSiteStore } from "./stores/site";
const siteStore = useSiteStore();

</script>
<style>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(13deg, #7bcfeb 14%, #e685d3 64%);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(13deg, #c7ceff 14%, #f9d4ff 64%);
}
::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: inset 7px 10px 12px #f0f0f0;
}
</style>
