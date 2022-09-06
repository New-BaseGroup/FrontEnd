<template>
  <div class="flex items-center justify-between mt-16">
    <div class="ml-[25rem]">
      <font-awesome-icon
        class="absolute text-xl text-[#ADAFAF] top-[85px] left-[730px]"
        :icon="['fas', 'magnifying-glass']"
      />
      <input
        type="text"
        name="search"
        id="search"
        class="bg-[#F6F6F6] border-2 rounded-2xl h-8 indent-8 outline-0 focus:border-[#ADAFAF]"
        size="60"
        placeholder="Search"
      />
    </div>
    <div>
      <button
        class="bg-[#76C6D1] text-white text-xl font-bold p-4 rounded-full"
      >
        AA
      </button>
    </div>
  </div>

  <div class="flex mx-[20%] mt-5">
    <!-- to be seperate component later -->

    <base-card>
      <div class="leading-3 px-5 py-1">
        <h3 class="text-[#76C6D1] text-xl">15000</h3>
        <p class="text-[#8D8D8D]">Total budget</p>
      </div>
    </base-card>

    <base-card>
      <div class="leading-3 px-5 py-1">
        <h3 class="text-[#76C6D1] text-xl">17500</h3>
        <p class="text-[#8D8D8D]">Total income</p>
      </div>
    </base-card>

    <base-card>
      <div class="leading-3 px-5 py-1">
        <h3 class="text-[#76C6D1] text-xl">4500</h3>
        <p class="text-[#8D8D8D]">Total expense</p>
      </div>
    </base-card>
  </div>

  <div class="">
    <base-card class="flex flex-col">
      <div class="flex justify-between">
        <p class="ml-5 text-xl text-[#76C6D1]">Transactions</p>
        <button
          class="mr-5 bg-[#76C6D1] text-white px-4 py-1 rounded-xl hover:bg-[#9ccad0]"
        >
          View All
        </button>
      </div>
      <table class="flex flex-col gap-6 my-8">
        <thead class="">
          <tr class="flex justify-between mx-5 text-[#3a3a3a]">
            <th class="">Date</th>
            <th class="">Type</th>
            <th class="">Payee</th>
            <th class="">Amount</th>
            <th class="">Status</th>
          </tr>
        </thead>
        <tbody class="flex flex-col gap-4">
          <!-- here will be transaction loop -->

          <tr class="flex mx-5 border-b text-[#5C5B5B]">
            <td class="mb-2">
              <p class="">07/07/2022</p>
            </td>
            <td class="ml-[3.6rem]">
              <p>Income</p>
            </td>
            <td class="ml-[5.5rem]">
              <p>Salary</p>
            </td>
            <td class="ml-[6.6rem]">
              <p>36000</p>
            </td>
            <td class="ml-[9.5rem]">
              <span>
                <font-awesome-icon :icon="['far', 'circle-check']"
              /></span>
            </td>
          </tr>
          <tr class="flex mx-5 border-b text-[#5C5B5B]">
            <td class="mb-2">
              <p class="">07/07/2022</p>
            </td>
            <td class="ml-[3.6rem]">
              <p>Income</p>
            </td>
            <td class="ml-[5.5rem]">
              <p>Salary</p>
            </td>
            <td class="ml-[6.6rem]">
              <p>36000</p>
            </td>
            <td class="ml-[9.5rem]">
              <span>
                <font-awesome-icon :icon="['far', 'circle-check']"
              /></span>
            </td>
          </tr>
          <tr class="flex mx-5 border-b text-[#5C5B5B]">
            <td class="mb-2">
              <p class="">07/07/2022</p>
            </td>
            <td class="ml-[3.6rem]">
              <p>Income</p>
            </td>
            <td class="ml-[5.5rem]">
              <p>Salary</p>
            </td>
            <td class="ml-[6.6rem]">
              <p>36000</p>
            </td>
            <td class="ml-[9.5rem]">
              <span>
                <font-awesome-icon :icon="['far', 'circle-check']"
              /></span>
            </td>
          </tr>
          <tr class="flex mx-5 border-b text-[#5C5B5B]">
            <td class="mb-2">
              <p class="">07/07/2022</p>
            </td>
            <td class="ml-[3.6rem]">
              <p>Income</p>
            </td>
            <td class="ml-[5.5rem]">
              <p>Salary</p>
            </td>
            <td class="ml-[6.6rem]">
              <p>36000</p>
            </td>
            <td class="ml-[9.5rem]">
              <span>
                <font-awesome-icon :icon="['far', 'circle-check']"
              /></span>
            </td>
          </tr>
          <tr class="flex mx-5 border-b text-[#5C5B5B]">
            <td class="mb-2">
              <p class="">07/07/2022</p>
            </td>
            <td class="ml-[3.6rem]">
              <p>Income</p>
            </td>
            <td class="ml-[5.5rem]">
              <p>Salary</p>
            </td>
            <td class="ml-[6.6rem]">
              <p>36000</p>
            </td>
            <td class="ml-[9.5rem]">
              <span>
                <font-awesome-icon :icon="['far', 'circle-check']"
              /></span>
            </td>
          </tr>
          <tr class="flex mx-5 border-b text-[#5C5B5B]">
            <td class="mb-2">
              <p class="">07/07/2022</p>
            </td>
            <td class="ml-[3.6rem]">
              <p>Income</p>
            </td>
            <td class="ml-[5.5rem]">
              <p>Salary</p>
            </td>
            <td class="ml-[6.6rem]">
              <p>36000</p>
            </td>
            <td class="ml-[9.5rem]">
              <span>
                <font-awesome-icon :icon="['far', 'circle-check']"
              /></span>
            </td>
          </tr>
          <tr class="flex mx-5 border-b text-[#5C5B5B]">
            <td class="mb-2">
              <p class="">07/07/2022</p>
            </td>
            <td class="ml-[3.6rem]">
              <p>Income</p>
            </td>
            <td class="ml-[5.5rem]">
              <p>Salary</p>
            </td>
            <td class="ml-[6.6rem]">
              <p>36000</p>
            </td>
            <td class="ml-[9.5rem]">
              <span>
                <font-awesome-icon :icon="['far', 'circle-check']"
              /></span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex self-center gap-4">
        <p class="bg-[#bebebe] px-2 rounded text-white cursor-pointer">1</p>
        <p class="cursor-pointer">2</p>
        <p class="cursor-pointer">3</p>
        <p class="cursor-pointer">4</p>
        <span
          ><font-awesome-icon
            class="cursor-pointer"
            :icon="['fas', 'caret-right']"
        /></span>
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from "../components/UI/BaseCard.vue";
export default {
  components: { BaseCard },
};
</script>
