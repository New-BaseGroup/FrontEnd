<template>
    <div v-if="!siteStore.loading" class="base-card-table">
        <div class="base-card-Container">
            <browserTable
                :header="'Budget Info'"
                :data="[budgetStore.getBudget]"
                type="Budget"
                primary-key="budgetID"
                :key="browserTable" />
            <browserTable
                :header="'Category Info'"
                :data="budgetStore.getBudgetCategories"
                type="budgetCategories"
                primary-key="categoriID"
                :key="browserTable" />
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
        await budgetStore.fetchBudgetList();
    }
}

getData();
</script>
<style></style>
