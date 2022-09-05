<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- :class="`${
    #76C6D1
        expandSideBar
          ? sideBarWidth + 'duration-500 '
          : sideBarWidth + 'duration-500 '
      }`" -->
  <div class="grid grid-cols-6">
    <side :class="` col-span-1  `">
      <span
        class="relative top-0 left-0 flex flex-col bg-[#76C6D1] h-screen overflow-hidden"
      >
        <span
          :class="` self-center ${
            expandSideBar ? 'text-[44px]' : 'text-[20px]'
          }  text-white font-bold`"
          >Logo</span
        >
        <button
          class="absolute top-12 right-0 w-5 h-12 bg-[#76C6D1] cursor-pointer rounded-tl-[60%] rounded-bl-[60%]"
          style="box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.24)"
          @click="
            {
              btoggle();
            }
          "
        >
          <span class="flex justify-center items-center">
            <font-awesome-icon
              :class="`text-[#F8F8F8]    ${rotateIcon} `"
              :icon="['fas', 'caret-left']"
            />
          </span>
        </button>
        <ul
          :class="`absolute overflow-hidden w-full  mt-20  pt-10 flex flex-col items-center gap-8 text-lg`"
        >
          <li
            class="relative w-full text-white hover:bg-[#F8F8F8] hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
          >
            <RouterLink
              class="relative hover:text-[#76C6D1] flex items-center justify-left gap-2"
              to="/dashboard"
            >
              <font-awesome-icon :icon="['fas', 'home']" />
              <h1 class="">
                {{ expandSideBar ? "Dashboard" : "" }}
              </h1>
            </RouterLink>
          </li>

          <li
            class="relative w-full text-white hover:bg-white hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
          >
            <RouterLink
              class="relative w-full hover:text-[#76C6D1] flex items-center justify-left gap-2"
              to="/income"
            >
              <font-awesome-icon :icon="['fas', 'building-columns']" />
              <h1 class="">{{ expandSideBar ? "Income" : "" }}</h1>
            </RouterLink>
          </li>

          <li
            class="relative w-full text-white hover:bg-white hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
          >
            <RouterLink
              class="relative w-full hover:text-[#76C6D1] flex items-center justify-left gap-2"
              to="/expense"
            >
              <font-awesome-icon :icon="['fas', 'notes-medical']" />
              <h1 class="">{{ expandSideBar ? "Transaction" : "" }}</h1>
            </RouterLink>
          </li>
          <li
            class="relative w-full text-white hover:bg-black hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
          >
            <RouterLink
              class="relative w-full hover:text-[#76C6D1] flex items-center justify-left gap-2"
              to="/budget"
            >
              <font-awesome-icon :icon="['fas', 'wallet']" />
              <h1 class="">{{ expandSideBar ? "Budget" : "" }}</h1>
            </RouterLink>
          </li>
          <li
            class="relative w-full text-white hover:bg-white hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
          >
            <RouterLink
              class="relative w-full hover:text-[#76C6D1] flex items-center justify-left gap-2"
              to="/register"
            >
              <font-awesome-icon :icon="['fas', 'id-card']" />
              <h1 class="">{{ expandSideBar ? "Register" : "" }}</h1>
            </RouterLink>
          </li>

          <li
            class="relative w-full text-white hover:bg-white hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
          >
            <RouterLink
              class="relative w-full hover:text-[#76C6D1] flex items-center justify-left gap-2"
              to="/login"
            >
              <font-awesome-icon :icon="['far', 'eye']" />
              <h1 class="">{{ expandSideBar ? "Login" : "" }}</h1>
            </RouterLink>
          </li>
        </ul>
      </span>

      <div
        :class="`fixed self-center   bottom-0 px-2 ${
          !expandSideBar && 'hidden'
        }`"
      >
        <div class="flex gap-x-28">
          <div class="self-start">
            <button>
              <span class="text-white text-[35px]"
                ><font-awesome-icon
                  class="hover:text-[#e7e7e7]"
                  :icon="['fas', 'palette']"
              /></span>
            </button>
          </div>
          <div class="flex gap-3">
            <button>
              <span class="text-white text-[35px]"
                ><font-awesome-icon
                  class="hover:text-[#e7e7e7]"
                  :icon="['fab', 'facebook']"
              /></span>
            </button>
            <button>
              <span class="text-white text-[35px]"
                ><font-awesome-icon
                  class="hover:text-[#e7e7e7]"
                  :icon="['fab', 'twitter']"
              /></span>
            </button>
          </div>
        </div>
      </div>
      <div :class="`fixed bottom-4 px-6   ${expandSideBar && 'hidden'}`">
        <button>
          <span class="text-white text-[35px]"
            ><font-awesome-icon
              class="hover:text-[#e7e7e7]"
              :icon="['fas', 'gear']"
          /></span>
        </button>
      </div>
    </side>
    <main :class="`h-screen  col-start-2 col-end-6  `">
      <div>
        <router-view />
      </div>
    </main>
  </div>
</template>
<script>
export default {
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
        this.sideBarWidth = "w-[320px]";
        this.rotateIcon = "";
      } else {
        this.sideBarWidth = "w-20";
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
.test:hover {
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  } */

/* nav ul li::before {
    content: "";
    position: absolute;
    background: transparent;
  } */
/* } */
</style>
