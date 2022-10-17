<template>
    <div
        class="base-card-wide"
        v-if="!siteStore.loading"
    >
        <div class="base-card-widgets">
            <div
                v-for="widget in siteStore.getWidgets"
                :key="widget.id"
            >
                <Widget
                    :id="widget.id"
                    :header="widget.header"
                    :data="widget.data"
                    :key="widget.id"
                    @changeWidget="(id, option) => changeWidget(id, option)"
                >
                    </Widget>
        </div>
        <div
            v-for="empty in siteStore.getWidgetLimit - siteStore.getWidgets.length"
            :key="empty"
            class="justify-self-center self-center"
        >
            <button
                @click="siteStore.addWidget"
                class="m-5"
            >Add Widget</button>
                </div>
                </div>
                </div>
</template>

<script setup>
import Widget from "../components/UI/Widget.vue";
import { useSiteStore } from "../stores/site";
import { useBudgetStore } from "../stores/budget.js";
import { ref } from "vue";
const siteStore = useSiteStore();
const budgetStore = useBudgetStore();
function changeWidget(id, option) {
    const widget = siteStore.getWidgets.find((widget) => widget.id == id);
    widget.data = option.getter;
    widget.header = option.title;
}
async function getData() {
    if (!budgetStore.getBudget) {
        await budgetStore.fetchBudget();
        console.log(budgetStore.getAmountUsed);
    }
}
getData();
</script>
