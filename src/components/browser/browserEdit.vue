<template>
    <font-awesome-icon
        v-if="props.editData === props.backupData"
        icon="fa-check"
        @click="$emit('updateRow', props.editData)" />
    <font-awesome-icon
        v-else
        icon="fa-edit"
        @click="props.editData = props.backupData" />
    <font-awesome-icon
        v-if="props.editData === props.backupData"
        @click="props.editData = null"
        icon="fa-xmark" />
    <font-awesome-icon
        v-else
        icon="fa-trash"
        @click="$emit('deleteRow', props.value)" />
</template>

<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({
    value: Object,
    editData: Array,
    backupData: Object,
    mobile: Boolean,
});
</script>
