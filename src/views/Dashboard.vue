<template>
    <div
        class="base-card-wide"
        v-if="!siteStore.loading && budgetStore.getBudget">
        <div class="base-card-widgets">
            <div v-for="widget in siteStore.getWidgets" :key="widget.id">
                <Widget
                    v-if="!isLoading"
                    :id="widget.id"
                    :header="widget.header"
                    :data="widget.data"
                    :key="widget.id"
                    @changeWidget="(id, option) => changeWidget(id, option)">
                </Widget>
                <orbit-spinner v-else :animation-duration="2000" :size="55" />
            </div>
            <div
                v-for="empty in siteStore.getWidgetLimit -
                siteStore.getWidgets.length"
                :key="empty"
                class="justify-self-center self-center">
                <button @click="siteStore.addWidget" class="m-5">
                    Add Widget
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Widget from "../components/UI/Widget.vue";
import { useSiteStore } from "../stores/site";
import { OrbitSpinner } from "epic-spinners";
import { useBudgetStore } from "../stores/budget.js";
import { ref } from "vue";
const isLoading = ref(false);
const siteStore = useSiteStore();
const budgetStore = useBudgetStore();
function changeWidget(id, option) {
    isLoading.value = true;
    const widget = siteStore.getWidgets.find((widget) => widget.id == id);
    widget.data = option.getter;
    widget.header = option.title;
    setTimeout(function () {
        isLoading.value = false;
    }, 1000);
}
async function getData() {
    isLoading.value = true;
    if (!budgetStore.getBudget) await budgetStore.fetchBudget();
    setTimeout(function () {
        isLoading.value = false;
    }, 2000);
}
getData();
</script>
