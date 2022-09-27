<template>
    <div v-if="!siteStore.loading">
        <table>
        <tr>
            <th v-for="header in Object.keys(props.data)" :key="header"> {{header}}</th>
        </tr>
        <tr>
            <td v-for="data in Object.values(props.data)" :key="data">{{data}}</td>
        </tr>
        </table>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    import { useSiteStore } from '../../stores/site';

    const siteStore = useSiteStore();

    const props = defineProps({
        data: Object,
    })
</script>
<style>

</style>