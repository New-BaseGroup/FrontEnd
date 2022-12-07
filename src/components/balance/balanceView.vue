<template>
    <div v-if="!siteStore.loading" class="base-card-table">
        <div class="base-card-Container">
            <div v-for="budget in budgetStore.getBudget" :key="budget">
                <browserTable
                    :header="'Balance changes in ' + budget.name"
                    :data="budgetStore.getBalance"
                    type="Balance"
                    primary-key="changeID"
                    :key="browserTable" />
            </div>
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
        console.log("b2");
        await budgetStore.fetchBudgetList();
    }
}

getData();
</script>
<style></style>
