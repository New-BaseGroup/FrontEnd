<template>
    <form @submit.prevent="submitBudget" class="max-w-md mx-auto">
        <div class="transition-all" v-if="stateCounter === 1">
            <h3 class="text-2xl my-4 text-center">Create a new budget</h3>
            <div class="max-w-md mx-auto">
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="BudgetName"
                        placeholder=" "
                        type="text"
                        name="BudgetName"
                        v-model="budgetDTO.budgetName"
                        required />
                    <label
                        class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        for="BudgetName"
                        >Budget Name:</label
                    >
                </div>
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="date"
                        id="start-date"
                        name="start-date"
                        placeholder=" "
                        required
                        v-model="budgetDTO.startDate" />
                    <label
                        class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        for="start-date"
                        >Start date:</label
                    >
                </div>
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        type="date"
                        id="end-date"
                        name="end-date"
                        placeholder=" "
                        required
                        v-model="budgetDTO.endDate" />
                    <label
                        class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        for="end-date"
                        >Start date:</label
                    >
                </div>
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="BudgetDescription"
                        type="text"
                        id="BudgetDescription"
                        placeholder=" "
                        v-model="budgetDTO.description" />
                    <label
                        class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        for="BudgetDescription"
                        >Description:</label
                    >
                </div>
            </div>
        </div>
        <div class="transition-all" v-if="stateCounter === 2">
            <h3 class="text-2xl my-4 text-center">
                Add budget amounts and categories
            </h3>
            <div   class="max-w-md mx-auto">
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="budgetAmount"
                        placeholder=" "
                        type="number"
                        name="budgetAmount"
                        v-model="budgetDTO.budgetAmount"
                        required />
                    <label
                        class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        for="budgetAmount"
                        >Total budget amount:</label
                    >
                </div>
            
            <div
                v-for="object in categories"
                class="my-8 border-neutral-700 border-b-2">
                <label
                    class="block my-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    for="selectedBudgetCat"
                    >Select Budget category:</label
                >
                <select
                    required
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="selectedBudgetCat"
                    id="selectedBudgetCat"
                    v-model="object.CatergoriID">
                    <option value="" hidden>
                        Pick a category
                    </option>
                    <option
                        v-for="item in budgetStore.getBalanceCategories"
                        :value="item.categoryID">
                        {{ item.name }}
                    </option>
                </select>
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="CustomName"
                        placeholder=" "
                        type="text"
                        name="CustomName"
                        v-model="object.CustomName" />
                    <label
                        class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        for="CustomName"
                        >Custom name:</label
                    >
                </div>
                <div class="relative z-0 mb-6 w-full group">
                    <input
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="MaxAmount"
                        placeholder=" "
                        type="number"
                        name="MaxAmount"
                        v-model="object.MaxAmount"
                        required />
                    <label
                        class="peer-focus:font-medium absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        for="MaxAmount"
                        >Max Amount:</label
                    >
                </div>

                <button
                type="button"
                    class="mb-8 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-900 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    @click="removeCategory(object)">
                    Remove category
            </button>
                
            </div>
            <button
            type="button"
                class="mb-8 first-letter:text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="addCategory">
                Add new Category
            </button>
        </div>
        <p class="my-2 text-gray-200 dark:text-gray-400 transition-transform">Amount left to assign to categories:  <span>{{calculateUsedAmount.toFixed(0)}}</span></p>
        </div>

        <div class="mt-2">
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Next Step
            </button>
            
        </div>
    </form>
</template>

<script setup>
import gsap from 'gsap'
import { ref, watch, watchEffect,computed} from "vue";
import { useBudgetStore } from "../../stores/budget";
const budgetStore = useBudgetStore();
async function GetCategetories() {
    if (!budgetStore.getBalanceCategories) {
        await budgetStore.fetchCategories();
    }
}
GetCategetories();
const categories = ref([{
        CatergoriID: "",
        CustomName: "",
        MaxAmount: 0,
    }]);
const budgetDTO = ref({
    budgetName: "",
    budgetAmount: 0,
    startDate: new Date().toJSON().slice(0, 10),
    endDate: new Date().toJSON().slice(0, 10),
    description: "",
    selectedBudgetCat: "",
});
const totalSum = ref(0);



 const calculateUsedAmount = computed(() => {
     let leftAmount = budgetDTO.value.budgetAmount;
     categories.value.forEach(item => {
         leftAmount -= item.MaxAmount;
     })
     return leftAmount;
});
const stateCounter = ref(1);
function submitBudget(submitEvent) {
    nextPage();
}
function addCategory() {
    categories.value.push({
        CatergoriID: "",
        CustomName: "",
        MaxAmount: 0,
    });
}
function removeCategory(obj) {
    if (categories.value.includes(obj)) {
        categories.value = categories.value.filter((c) => c !== obj);
    }
 
}

function nextPage() {
    if (stateCounter.value < 2) stateCounter.value = stateCounter.value + 1;
}

function addBudget() {}
</script>

