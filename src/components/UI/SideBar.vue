<template>
  <!-- :class="`${
        expandSideBar
          ? sideBarWidth + 'duration-500 '
          : sideBarWidth + 'duration-500 '
      }`" -->

  <side :class="` col-span-1 ${sideBarWidth}`">
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
        :class="`absolute top-12 right-0 w-5 h-12 bg-[#76C6D1] cursor-pointer rounded-tl-[60%] rounded-bl-[60%]  `"
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
          class="relative w-full text-white hover:bg-[#FAFAFA] hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
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
          class="relative w-full text-white hover:bg-[#FAFAFA] hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
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
          class="relative w-full text-white hover:bg-[#FAFAFA] hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
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
          class="relative w-full text-white hover:bg-[#FAFAFA] hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
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
          class="relative w-full text-white hover:bg-[#FAFAFA] hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
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
          class="relative w-full text-white hover:bg-[#FAFAFA] hover:text-[#76C6D1] ml-8 p-4 rounded-tl-full rounded-bl-full"
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
      :class="`fixed self-center   bottom-0 px-2 ${!expandSideBar && 'hidden'}`"
    >
      <div class="flex mx-4 gap-x-40">
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
</template>

<script>
export default {
  data() {
    return {
      expandSideBar: true,
      sideBarWidth: "",
      sideBarTransition: "",
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
<style scoped></style>
