<template>
    <div class="base-card">
        <div class="base-card-Container">
            <div
                class="flex items-center justify-center text-4xl font-black text-background-text m-3">
                <h1 class="tracking-wide">
                    SkyBudget
                    <span class="font-mono">™</span>
                </h1>
                </div>
                <newBudget/>
            </div>
        </div>
    
</template>

<script setup>
import useValidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import newBudget from "./NewBudget.vue";

</script>
