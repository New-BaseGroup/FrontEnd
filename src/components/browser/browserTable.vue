<template>
    <div v-if="!siteStore.loading">
        <h3 class="table-title font-semibold">{{ props.header }}</h3>
        <table class="table">
            <thead>
                <tr>
                    <th
                        class="table-header font-semibold"
                        v-for="(value, key) in backupData[page][0]"
                        :key="key"
                        v-show="!Array.isArray(value)"
                        @click="sortTable(key)">
                        {{ key.toUpperCase() }}
                        <font-awesome-icon
                            class="absolute ml-2 mt-1"
                            v-show="
                                currentSort.header === key && currentSort.sort
                            "
                            :icon="
                                currentSort.sort === 'ASC'
                                    ? 'fa-arrow-up'
                                    : 'fa-arrow-down'
                            " />
                    </th>
                </tr>
            </thead>
            <tbody>
                <template
                    v-for="(value, index) in backupData[page]"
                    :key="value">
                    <tr
                        class="table-row"
                        :class="{
                            'bg-[#8df5b065]': value['amount'] >= 0,
                            'bg-[#f58a8a5e]': value['amount'] < 0,
                        }">
                        <template v-for="(data, key) in value" :key="data">
                            <td
                                class="table-data"
                                v-show="!Array.isArray(data)">
                                <input
                                    v-if="
                                        edittingRow.data ===
                                            backupData[page][index] &&
                                        props.primaryKey != key
                                    "
                                    v-model="edittingRow.data[key]" />
                                <span
                                    v-else
                                    class="mb-3 px-2 py-1.5 mt-1 block w-full"
                                    >{{ dateCheckAndFormat(data) }}</span
                                >
                            </td>
                        </template>
                        <td class="table-data">
                            <font-awesome-icon
                                v-if="
                                    edittingRow.data === backupData[page][index]
                                "
                                icon="fa-check"
                                @click="updateRow(edittingRow.data)" />
                            <font-awesome-icon
                                v-else
                                icon="fa-edit"
                                @click="
                                    edittingRow.data = backupData[page][index]
                                " />
                        </td>
                        <td class="table-data">
                            <font-awesome-icon
                                v-if="
                                    edittingRow.data === backupData[page][index]
                                "
                                @click="edittingRow.data = null"
                                icon="fa-xmark" />
                            <font-awesome-icon
                                v-else
                                icon="fa-trash"
                                @click="deleteRow(value)" />
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div class="table-title flex justify-evenly">
            <font-awesome-icon
                icon="fa-arrow-left"
                @click="if (page > 0) page--;" />
            <span
                v-for="int in backupData.length"
                :class="page === int - 1 ? 'font-semibold' : ''"
                @click="page = int - 1"
                >{{ int }}</span
            >
            <font-awesome-icon
                icon="fa-arrow-right"
                @click="if (page + 1 < backupData.length) page++;" />
            <select
                class="w-1/12"
                @change="backupData = [...sliceIntoChunks(props.data)]"
                v-model="rows">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="100">100</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, reactive } from "vue";
import { useSiteStore } from "../../stores/site";
import { useBudgetStore } from "../../stores/budget";
const siteStore = useSiteStore();
const budgetStore = useBudgetStore();
const props = defineProps({
    header: String,
    data: Array,
    type: String,
    primaryKey: String,
});

let currentSort = ref({
    header: null,
    sort: null,
});

const edittingRow = ref({
    data: null,
});
const page = ref(0);
const rows = ref(5);
let backupData = ref([...sliceIntoChunks(props.data)]);
function sortTable(header) {
    console.log(backupData.value.flat());
    currentSort.value.header = header;
    if (currentSort.value.sort === "ASC") {
        backupData.value.flat().reverse();
        updateTable();
        currentSort.value.sort = "DESC";
    } else if (currentSort.value.sort === "DESC") {
        updateTable();
        currentSort.value.sort = null;
    } else {
        backupData.value.flat().sort((a, b) => {
            return a[header] - b[header];
        });
        updateTable();
        currentSort.value.sort = "ASC";
    }
}

function updateRow(object) {
    const tempObject = { ...object };
    tempObject["id"] = tempObject[props.primaryKey];
    delete tempObject[props.primaryKey];
    budgetStore.findObjectAndChange(
        "update",
        props.data,
        tempObject,
        props.primaryKey,
        props.type
    );
    updateTable();
}

function deleteRow(object) {
    var answer = window.confirm(
        `Really want to delete this ${props.primaryKey}: ${
            object[props.primaryKey]
        }?`
    );
    if (answer) {
        budgetStore.findObjectAndChange(
            "delete",
            props.data,
            object,
            props.primaryKey,
            props.type
        );
        updateTable();
    }
}

function updateTable() {
    // edittingRow.value.data = null;
    backupData.value = [...sliceIntoChunks(props.data)];
}

function dateCheckAndFormat(item) {
    if (
        isNaN(item) &&
        new Date(item) !== "Invalid Date" &&
        !isNaN(new Date(item))
    ) {
        return new Date(item).toLocaleDateString();
    } else return item;
}

function sliceIntoChunks(arr) {
    const res = [];
    for (let i = 0; i < arr.length; i += rows.value) {
        const chunk = arr.slice(i, i + rows.value);
        res.push(chunk);
    }
    return res;
}
</script>
<style></style>
