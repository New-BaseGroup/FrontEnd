<template>
    <div
        v-if="!siteStore.loading"
        class="base-card-table">
        <div class="base-card-Container">
            <browserTable
                :header="'Balance changes in ' + budgetStore.getBudget.name"
                :data="budgetStore.getBalance"
                type="Balance"
                primary-key="changeID"
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
    if (budgetStore.getBudget?.length === 0) {
        await budgetStore.fetchBudgetList();
    }
}

getData();
</script>
<style></style>
