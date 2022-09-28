<template>
    <div v-if="!siteStore.loading">
        <table>
            <tr class="table-row">
                <th
                    class="table-header"
                    v-for=" (value,key) in props.data[0]"
                    :key="key"
                    v-show="!Array.isArray(value)"
                > {{key}}</th>
            </tr>
            <tr
                class="table-row"
                v-for="object in Object.values(props.data)"
                :key="object"
            >
                <td
                    class="table-data"
                    v-for="data in object"
                    :key="data"
                    v-show="!Array.isArray(data)"
                >{{data}}</td>
                    </tr>
        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useSiteStore } from '../../stores/site';

const siteStore = useSiteStore();

const props = defineProps({
    data: Array,
});
</script>
<style>
</style>