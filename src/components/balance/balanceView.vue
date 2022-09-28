<template>
    <div v-if="!siteStore.loading">
        <div
            v-for="budget in budgetStore.getBudget"
            :key="budget"
        >
            <h4>Balance changes in {{budget.name}}</h4>
            <browserTable
                :data="budgetStore.getBalance"
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