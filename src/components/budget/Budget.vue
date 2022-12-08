<template>
    <div class="base-card">
        <div>
            
            <newBudget />
        </div>
    </div>
</template>

<script setup>
import useValidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import newBudget from "./NewBudget.vue";
</script>
