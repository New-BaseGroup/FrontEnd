<template>
    <div class="base-card">
        <div class="base-card-Container">
            <div class="flex items-center justify-center text-4xl font-black text-background-text m-3">
                <h1 class="tracking-wide">
                    SkyBudget
                    <span class="font-mono">™</span>
                </h1>
            </div>
            <h3 class="text-2xl my-4 text-center">{{header}}</h3>
            <form @submit.prevent="submitbalance">
                <div>
                    <label for="date">Balance category</label>
                    <select
                        required
                        name="balance-category"
                        id="balance-category"
                        v-model="state.balanceChangeDTO.budgetCategoryID"
                        @blur="v$.balanceChangeDTO.budgetCategoryID.$touch()"
                    >
                        <option
                            value=""
                            hidden
                        >Select Balance category</option>
                            <option value="1">Food</option>
                            <option value="2">Car</option>
                            <option value="3">Other</option>
                            </select>
                            <label for="title">Balance name:</label>
                            <input
                                required
                                type="text"
                                name="title"
                                v-model="state.balanceChangeDTO.title"
                                @blur="v$.balanceChangeDTO.title.$touch()"
                            />

                            <label for="balance-amount">Balance:</label>
                            <input
                                required
                                type="text"
                                name="balance-amount"
                                v-model="state.balanceChangeDTO.amount"
                                @blur="v$.balanceChangeDTO.amount.$touch()"
                            />

                            <label for="date">Balance Date & Time</label>
                            <input
                                required
                                type="date"
                                id="date"
                                name="date"
                                v-model="state.balanceChangeDTO.date"
                                @blur="v$.balanceChangeDTO.date.$touch()"
                            />

                            <label for="description">Describe the Balance details</label>
                            <textarea
                                name="description"
                                id="description"
                                cols="30"
                                rows="3"
                                placeholder="Optional"
                                v-model="state.balanceChangeDTO.description"
                            ></textarea>
                </div>
                <button @click="addBalance">{{buttonText}}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import useValidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { reactive, computed, defineProps, ref } from "vue";

const header = ref("Add a new balance change");
const buttonText = ref("Create");

const props = defineProps({
    data: Object,
});

let state = reactive({
    balanceChangeDTO: {
        budgetCategoryID: "",
        amount: "",
        title: "",
        date: new Date().toJSON().slice(0, 10),
        description: "",
    },
});

const rules = computed(() => {
    return {
        balanceChangeDTO: {
            budgetCategoryID: { required },
            amount: { required, numeric },
            title: { required },
            date: { required },
            description: {},
        },
    };
});

const v$ = useValidate(rules, state);

if (props) {
    console.log("test");
    header.value = "Update a balance change";
    buttonText.value = "Update";
    Object.assign(props.data, state.balanceChangeDTO);
}

function submitBalance() {
    this.v$.$validate();
}

function addBalance() {
    console.log(this.v$.balanceChangeDTO.amount.$error);
    console.log(this.state.balanceChangeDTO);
}
</script>

<style scoped></style>
