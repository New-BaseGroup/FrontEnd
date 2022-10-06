<template>
    <div class="base-card">
        <div class="base-card-Container">
            <div v-for="widget in siteStore.getWidgets" :key="widget.id">
                <Widget
                    :header="widget.header"
                    :data="widget.data"
                    :key="widget.id">
                </Widget>
                <font-awesome-icon
                    icon="fa-gear"
                    class="text-xl text-[#fff] hover:text-[#2b2b2b]"
                    @click="setOpenSetting(widget.id)" />
                <li
                    v-if="openSetting == widget.id"
                    v-for="option in settings"
                    :key="option">
                    <ul @click="changeWidget(widget.id, option)">
                        {{
                            option.title
                        }}
                    </ul>
                </li>
            </div>
        </div>
    </div>
</template>

<script setup>
import Widget from "../components/UI/Widget.vue";
import { useSiteStore } from "../stores/site";
import { useBudgetStore } from "../stores/budget";
import { ref } from "vue";
const siteStore = useSiteStore();
const budgetStore = useBudgetStore();

const openSetting = ref(null);
const settings = ref([
    {
        title: "Latest Transaction",
        getter: budgetStore.getLatestTransactions,
    },
    {
        title: "Budget Info",
        getter: budgetStore.getBudgetInfo,
    },
    {
        title: "Budget amount used / total amount",
        getter: `${budgetStore.getAmountUsed} / ${budgetStore.getTotalAmount}`,
    },
    {
        title: "Category usage",
        getter: budgetStore.getCategoryInfo,
    },
]);
function setOpenSetting(id) {
    this.openSetting == id
        ? (this.openSetting = null)
        : (this.openSetting = id);
}
function changeWidget(id, option) {
    const widget = siteStore.getWidgets.find((widget) => widget.id == id);
    widget.data = option.getter;
    widget.header = option.title;
}
</script>
