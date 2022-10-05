<template>
    <div class="widget">
        <h3>{{props.header}}</h3>
        <span>{{props.data}}</span>
    </div>
</template>
<script setup>
import { defineProps } from "vue";
import { useSiteStore } from "../../stores/site";

const siteStore = useSiteStore();
const props = defineProps({
    header: String,
    data: String,
});
</script>