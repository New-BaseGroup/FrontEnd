<template>
    <div class="widget">
        <font-awesome-icon
            v-if="siteStore.getEditState"
            icon="fa-gear"
            class="float-left text-xl text-black hover:text-[#2b2b2b]"
            @click="openSetting = !openSetting" />
        <ul
            v-if="openSetting"
            class="absolute top-10 -left-10 bg-white rounded-lg border border-gray-200 w-2/3 text-gray-900">
            <li
                v-for="option in settings"
                :key="option"
                @click="
                    $emit('changeWidget', props.position, option);
                    openSetting = false;
                    siteStore.setChangesMade(true);
                "
                class="px-6 py-2 border-b border-gray-200 w-full">
                {{ option.title }}
            </li>
        </ul>
        <font-awesome-icon
            v-if="siteStore.getEditState"
            icon="fa-xmark"
            class="float-right text-xl text-[#000] hover:text-[#2b2b2b]"
            @click="siteStore.removeWidget(props.position)" />
        <h3 class="mt-2 text-3xl font-semibold text-black">
            {{ props.header }}
        </h3>
        <span v-if="!Array.isArray(budgetStore[props.data])">{{
            budgetStore[props.data]
        }}</span>
        <p v-else v-for="x in budgetStore[props.data]">{{ x }}</p>
    </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import { useSiteStore } from "../../stores/site";
import { useBudgetStore } from "../../stores/budget";
const budgetStore = useBudgetStore();
const openSetting = ref(false);
const siteStore = useSiteStore();
const props = defineProps({
    id: Number,
    header: String,
    data: String,
    position: Number,
});
const settings = ref([
    {
        title: "Latest Transaction",
        getter: "getLatestTransactions",
    },
    {
        title: "Budget Info",
        getter: "getBudgetInfo",
    },
    {
        title: "Budget usage",
        getter: `getUsedAndTotal`,
    },
    {
        title: "Category usage",
        getter: "getCategoryInfo",
    },
]);
</script>
