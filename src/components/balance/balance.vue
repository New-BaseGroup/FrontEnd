<template>
    <div class="base-card">
        <div class="base-card-Container">
            <h3 class="text-2xl my-4 text-center">{{ header }}</h3>
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
                            <option
                                v-for="item in budgetStore.getBalanceCategories"
                                :value="item.categoryID"
                            >{{item.name}}</option>

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
                <button @click="addBalance">{{ buttonText }}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import useValidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { reactive, computed, defineProps, ref } from "vue";
import { useBudgetStore } from "../../stores/budget";
const budgetStore = useBudgetStore();
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
async function GetCategetories() {
    if (!budgetStore.getBalanceCategories) {
        await budgetStore.fetchCategories();
    }
}
GetCategetories();

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

if (props.data) {
    header.value = "Update a balance change";
    buttonText.value = "Update";
    state.balanceChangeDTO = {
        budgetCategoryID: props.data.changeID,
        amount: props.data.amount,
        title: props.data.title,
        date: props.data.date,
        description: props.data.description,
    };
}

// function submitBalance() {
//     this.v$.$validate();
// }
</script>

<style scoped></style>
