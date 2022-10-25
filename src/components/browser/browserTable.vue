<template>
    <div v-if="!siteStore.loading">
        <h3 class="table-title">{{ props.header }}</h3>
        <table class="table">
            <thead>
                <tr class="table-row">
                    <th
                        class="table-header"
                        v-for="(value, key) in backupData[0]"
                        :key="key"
                        v-show="!Array.isArray(value)"
                        @click="sortTable(key)">
                        {{ key }}
                        <!-- <font-awesome-icon
                        v-show="JSON.stringify(currentSort) === JSON.stringify({header: key, sort: 'ASC' })"
                        icon="fa-arrow-up"
                    />
                    <font-awesome-icon
                        v-show="JSON.stringify(currentSort) === JSON.stringify({header: key, sort: 'DESC' })"
                        icon="fa-arrow-down"
                    /> -->
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="table-row"
                    v-for="(value, index) in Object.values(backupData)"
                    :key="value">
                    <td
                        class="table-data"
                        v-for="data in value"
                        :key="data"
                        v-show="!Array.isArray(data)">
                        {{ data }}
                    </td>
                    <td>
                        <font-awesome-icon icon="fa-trash" />
                    </td>
                    <td>
                        <font-awesome-icon
                            icon="fa-edit"
                            @click="openObject(props.data[index])" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div
            v-if="open"
            class="absolute top-0 bg-fuchsia-50 w-4/5 h-auto justify-self-center place-self-center">
            <button @click="open = false">Close</button>
            <balanceVue v-show="theObject != null" :data="theObject" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, reactive } from "vue";
import { useSiteStore } from "../../stores/site";
import balanceVue from "../balance/balance.vue";
const siteStore = useSiteStore();
const props = defineProps({
    header: String,
    data: Array,
});
let currentSort = reactive({
    header: null,
    sort: null,
});
const open = ref(false);
const theObject = ref();
const backupData = ref([...props.data]);
function sortTable(header) {
    if (
        JSON.stringify(currentSort) ===
        JSON.stringify({ header: header, sort: "ASC" })
    ) {
        backupData.value.reverse();
        currentSort = { header: header, sort: "DESC" };
    } else {
        backupData.value = [...props.data];
        backupData.value.sort((a, b) => {
            return a[header] - b[header];
        });
        currentSort = { header: header, sort: "ASC" };
    }
}
function openObject(object) {
    theObject.value = object;
    open.value = true;
}
</script>
<style></style>
