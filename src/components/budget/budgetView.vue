<template>
  <div
    v-if="!siteStore.loading"
    class="base-card-table"
  >
    <div class="base-card-Container">
      <div class="flex items-center justify-center text-4xl font-black text-background-text m-3">
        <h1 class="tracking-wide">SkyBudget
          <span class="font-mono">™</span>
        </h1>
      </div>
      <browserTable
        :header="'Budget Info'"
        :data="budgetStore.getBudget"
        :key="table"
      />
      <browserTable
        :header="'Category Info'"
        :data="budgetStore.getBudgetCategories"
        :key="table"
      />
    </div>
    </div>
</template>
<script setup>
import { useBudgetStore } from "../../stores/budget.js";
import browserTable from "../browser/browserTable.vue";
import { useSiteStore } from "../../stores/site.js";
const budgetStore = useBudgetStore();
const siteStore = useSiteStore();

async function getData() {
    if (!budgetStore.getBudget) {
        await budgetStore.fetchBudget();
    }
}

getData();
</script>
<style>
</style>