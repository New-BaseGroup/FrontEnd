<template>
    <div
        class="base-card-widgets-container relative justify-evenly"
        v-if="!siteStore.loading && budgetStore.getBudget">
        <div class="absolute flex flex-row mx-5 top-5 right-0">
            <button
                v-show="siteStore.changesMade"
                @click="siteStore.saveWidgets()"
                class="m-auto">
                Save
            </button>
            <button class="m-auto" @click="siteStore.SetwidgetEdit()">
                Edit
            </button>
        </div>
        <div class="base-card-widgets justify-items-center">
            <template
                v-for="widget in sortByPosition(siteStore.getWidgets)"
                :key="widget.id">
                <Widget
                    v-if="isLoading != widget"
                    :id="widget.id"
                    :header="widget.header"
                    :data="widget.data"
                    :position="widget.position"
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
    console.log(id);
    const widget = siteStore.getWidgets?.find(
        (widget) => widget.position == id
    );
    isLoading.value = widget;
    widget.data = option.getter;
    widget.header = option.title;
    setTimeout(function () {
        isLoading.value = false;
    }, 1000);
}
async function getData() {
    isLoading.value = true;
    if (!budgetStore.getBudget) await budgetStore.fetchBudgetList();
    if (!siteStore.getWidgets?.length > 0) await siteStore.loadWidgets();
    setTimeout(function () {
        isLoading.value = false;
    }, 2000);
}
function sortByPosition(array) {
    array.sort((a, b) => a.position - b.position);
    let newPosition = 0;
    array.forEach((element) => {
        element.position = newPosition;
        newPosition++;
    });
    return array;
}
getData();
</script>
