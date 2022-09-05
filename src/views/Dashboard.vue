<template>
  <div class="flex justify-center items-center mt-16">
    <div>
      <font-awesome-icon
        class="absolute text-xl text-[#ADAFAF] top-[70px] left-[730px]"
        :icon="['fas', 'magnifying-glass']"
      />
      <input
        @click="insertNewlineAndFocus"
        type="text"
        name="search"
        id="search"
        class="bg-[#F6F6F6] border-2 rounded-2xl h-8 indent-8 outline-0 focus:border-[#ADAFAF]"
        size="60"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>
