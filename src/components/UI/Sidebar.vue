<script setup>
// variable
import { ref } from 'vue';


const triggerSidebar = ref(true);
// functions
</script>

<template>
  <Transition  name="slide-fade">
<button v-if="triggerSidebar"
          class="absolute ml-64 mt-7 w-5 h-12 bg-[#76C6D1] cursor-pointer rounded-tr-[60%] rounded-br-[60%]"

          @click="triggerSidebar = !triggerSidebar"
        >
          <span class="flex justify-center items-center">
            <font-awesome-icon
              :class="`text-[#F8F8F8] `"
              :icon="['fas', 'caret-left']"
            />
          </span>
        </button>
  </Transition>
  
  <button v-if="!triggerSidebar"
          class="absolute  mt-7 w-5 h-12 bg-[#76C6D1] cursor-pointer rounded-tr-[60%] rounded-br-[60%]"

          @click="triggerSidebar = !triggerSidebar"
        >
          <span class="flex justify-center items-center">
            <font-awesome-icon
              :class="`text-[#F8F8F8] rotate-180`"
              :icon="['fas', 'caret-left']"
            />
          </span>
        </button>
       
        <Transition  name="slide-fade">
		<div v-if="triggerSidebar" class="flex h-screen w-64 flex-col justify-between bg-[#76C6D1] text-white">
			<div class="py-4 pl-5">
				<!--  navigation items-->
				<div class="flex w-full items-center justify-between mb-14">
					<div class="logo-main">Logo</div>
				</div>
        
				<div class="mb-4">
					<div class="flex w-full items-center justify-between">
						<a class="sideBardNavigation">
							<font-awesome-icon :icon="['fas', 'home']" />
							<h1 class="ml-2 text-xl">Dashboard</h1>
						</a>
					</div>
				</div>
				<div class="mb-4">
					<div class="flex w-full items-center justify-between">
						<a class="sideBardNavigation">
							<font-awesome-icon :icon="['fas', 'building-columns']" />
							<h1 class="ml-2 text-xl">Income</h1>
						</a>
					</div>
				</div>
				<div class="mb-4">
					<div class="flex w-full items-center justify-between">
						<a class="sideBardNavigation">
							<font-awesome-icon :icon="['fas', 'notes-medical']" />
							<h1 class="ml-2 text-xl">Transaction</h1>
						</a>
					</div>
				</div>
				<div class="mb-4">
					<div class="flex w-full items-center justify-between">
						<a class="sideBardNavigation">
							<font-awesome-icon :icon="['fas', 'wallet']" />
							<h1 class="ml-2 text-xl">Budget</h1>
						</a>
					</div>
				</div>
				<div class="mb-4">
					<div class="flex w-full items-center justify-between">
						<a class="sideBardNavigation">
							<font-awesome-icon :icon="['fas', 'id-card']" />
							<h1 class="ml-2 text-xl">Register</h1>
						</a>
					</div>
				</div>
				<div class="mb-4">
					<div class="flex w-full items-center justify-between">
						<a class="sideBardNavigation">
							<font-awesome-icon :icon="['far', 'eye']" />
							<h1 class="ml-2 text-xl">Login</h1>
						</a>
					</div>
				</div>
			</div>
		</div>
    
  </Transition>

</template>

<style scoped>

.slide-fade-enter-active {
	transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(-300px);
	opacity: 0;
}
</style>
