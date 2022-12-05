<template>
    <div
        class="base-card-widgets-container "
        v-if="!siteStore.loading && budgetStore.getBudget">
        <div class="base-card-widgets">
            <template v-for="widget in siteStore.getWidgets" :key="widget.id">
                <Widget
                    v-if="isLoading != widget"
                    :id="widget.id"
                    :header="widget.header"
                    :data="widget.data"
                    :key="widget.id"
                    @changeWidget="(id, option) => changeWidget(id, option)">
                </Widget>
                <orbit-spinner
                    class="m-auto"
                    v-else
                    :animation-duration="2000"
                    :size="55" />
            </template>
            <div
                v-for="empty in siteStore.getWidgetLimit -
                siteStore.getWidgets?.length"
                :key="empty"
                class="widget-btn">
                <button @click="siteStore.addWidget" class="m-auto">
                    Add Widget
                </button>
            </div>
           
        </div>
        <button
            v-show="siteStore.changesMade"
            @click="siteStore.saveWidgets()"
            class="m-auto">
            Save Widgets
        </button>
        <button class="m-auto" @click="siteStore.SetwidgetEdit()">
                    Edit Widgets
        </button>
            
    </div>
</template>

<script setup>
import Widget from "../components/UI/Widget.vue";
import { useSiteStore } from "../stores/site";
import { OrbitSpinner } from "epic-spinners";
import { useBudgetStore } from "../stores/budget.js";
import { ref } from "vue";
const isLoading = ref(null);
const siteStore = useSiteStore();
const budgetStore = useBudgetStore();
function changeWidget(id, option) {
    const widget = siteStore.getWidgets?.find((widget) => widget.id == id);
    isLoading.value = widget;
    widget.data = option.getter;
    widget.header = option.title;
    setTimeout(function () {
        isLoading.value = false;
    }, 1000);
}
async function getData() {
    isLoading.value = true;
    if (!budgetStore.getBudget) await budgetStore.fetchBudget(1);
    if (!siteStore.getWidgets) await siteStore.loadWidgets();
    setTimeout(function () {
        isLoading.value = false;
    }, 2000);
}
getData();
</script>
