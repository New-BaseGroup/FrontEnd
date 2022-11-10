<template>
    <div v-if="!siteStore.loading">
        <h3 class="table-title">{{ props.header }}</h3>
        <table class="table">
            <thead>
                <tr>
                    <th
                        class="table-header"
                        v-for="(value, key) in backupData[0]"
                        :key="key"
                        v-show="!Array.isArray(value)"
                        @click="sortTable(key)"
                    >
                        {{ key }}
                        <font-awesome-icon
                            v-show="JSON.stringify(currentSort) === JSON.stringify({header: key, sort: 'ASC' })"
                            icon="fa-arrow-up"
                        />
                        <font-awesome-icon
                            v-show="JSON.stringify(currentSort) === JSON.stringify({header: key, sort: 'DESC' })"
                            icon="fa-arrow-down"
                        />
                        </th>
                </tr>
            </thead>
            <tbody
                v-for="(value, index) in Object.values(backupData)"
                :key="value"
            >
                <tr
                    class="table-row bg-[#adadad80]"
                    v-if="edittingRow.data === backupData[index]"
                >
                    <td
                        class="table-data"
                        v-for="(data, key) in value"
                        :key="data"
                        v-show="!Array.isArray(data)"
                    >
                        <input
                            v-model="edittingRow.data[key]"
                            v-if="!key.includes('ID')"
                        />
                        <span v-else>{{data}}</span>
                        </td>
                        <td class="table-data">
                            <font-awesome-icon
                                icon="fa-check"
                                @click="updateRow(edittingRow.data)"
                            />
                        </td>
                        <td class="table-data">
                            <font-awesome-icon
                                icon="fa-trash"
                                @click="deleteRow(value)"
                            />
                        </td>
                        </tr>
                        <tr
                            class="table-row"
                            :class="{'bg-[#8df5b080]': (props.type === 'Balance' && value['amount'] >= 0), 'bg-[#f58a8a77]': (props.type === 'Balance' && value['amount'] < 0)}"
                            v-else
                        >
                            <td
                                class="table-data"
                                v-for="data in value"
                                :key="data"
                                v-show="!Array.isArray(data)"
                            >
                                <span>{{data}}</span>
                                </td>
                                <td class="table-data">
                                    <font-awesome-icon
                                        icon="fa-edit"
                                        @click="edittingRow.data = backupData[index]"
                                    />
                                </td>
                                <td class="table-data">
                                </td>
                                </tr>
                                </tbody>
        </table>
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
});

let currentSort = ref({
    header: null,
    sort: null,
});

const edittingRow = ref({
    data: null,
});

let backupData = ref([...props.data]);

function sortTable(header) {
    if (
        JSON.stringify(currentSort.value) ===
        JSON.stringify({ header: header, sort: "ASC" })
    ) {
        backupData.value.reverse();
        currentSort.value = { header: header, sort: "DESC" };
    } else if (
        JSON.stringify(currentSort.value) ===
        JSON.stringify({ header: header, sort: "DESC" })
    ) {
        updateTable();
        currentSort.value = { header: null, sort: null };
    } else {
        backupData.value.sort((a, b) => {
            return a[header] - b[header];
        });
        currentSort.value = { header: header, sort: "ASC" };
    }
}

function updateRow(object) {
    const tempObject = { ...object };
    let type = props.type.toLocaleLowerCase();
    type === "balance" ? (type = "change") : "";
    tempObject["id"] = tempObject[type + "ID"];
    delete tempObject[type + "ID"];
    budgetStore.updateObject(props.type, tempObject);
    updateTable();
}

function deleteRow(object) {
    let type = props.type.toLocaleLowerCase();
    type === "balance" ? (type = "change") : "";
    budgetStore.deleteObject(props.type, object, object[type + "ID"]);
    updateTable();
}

function updateTable() {
    edittingRow.value.data = null;
    backupData.value = [...props.data];
}

function checking(item) {
    console.log(item);
}
</script>
<style></style>
