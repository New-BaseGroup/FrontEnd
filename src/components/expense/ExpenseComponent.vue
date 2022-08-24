<template>
  <base-card>
    <!-- @submit.prevent="submitExpense" -->
    <form>
      <label for="expense-category">Expense category</label>
      <select
        name="expense-category"
        id="expense-category"
        v-model="selectedExpCat"
      >
        <!-- Later when fetching -->
        <!-- <option v-for="exCat in category" :key="exCat.id" value="">
      {{ exCat.name }}
    </option> -->
        <option value="food">Food</option>
        <option value="car">Car</option>
        <option value="other">Other</option>
      </select>

      <button>Add new</button>

      <p v-if="selectedExCat === ''">{{ validationMsg }}</p>

      <label>Expense name:</label>
      <!-- <input type="text" name="expense-name" v-model="expenseName" /> -->
      <ExpenseNameField @expense-name="getExpenseNameBack"></ExpenseNameField>
      <!-- <div v-for="expense in expenseList" :key="expense">
        <ExpenseNameField @expense-name="getExpenseNameBack"></ExpenseNameField>
      </div> -->
      <button @click="addExpense">Add new</button>
      <!-- ------------------------ -->
      <!-- ------------------------ -->
      <!-- ------------------------ -->
      <!-- ------------------------ -->
      <!-- ------------------------ -->
      <!-- ------------------------ -->
      <!-- ------------------------ -->
      <label for="expense-amount">Balance:</label>
      <input type="number" name="expense-amount" v-model="expenseAmount" />

      <p v-if="expenseAmount === 0">{{ validationMsg }}</p>

      <label for="date">Expense Date & Time</label>
      <input type="date" id="date" name="date" v-model="dateTime" required />
      <p v-if="dateTime === ' '">{{ validationMsg }}</p>

      <label for="description">Describe the expense details</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="3"
        placeholder="Optional"
        v-model="description"
      ></textarea>
      <button @click="addExpense">submit</button>
      <p v-if="error !== ''">{{ error }} {{ resetRequestError }}</p>
    </form>
  </base-card>
</template>

<script>
import axios from "axios";
import ExpenseNameField from "./ExpenseNameField.vue";
export default {
  components: {
    ExpenseNameField,
  },
  data() {
    return {
      selectedExpCat: "food",
      expenseName: "",
      expenseList: [],

      expenseAmount: "0",
      dateTime: "",
      description: "",
      error: "",
      validationMsg: "input field required",
    };
  },

  computed: {
    resetRequestError() {
      setTimeout(() => {
        this.error = "";
      }, 3000);
    },
    getExpenseNameBack(userInput) {
      this.expenseList.push(userInput);
    },
  },
  methods: {
    submitExpense() {
      axios
        .post("api", {
          // keys must match DTO
          selectedExpCat:
            this.selectedExpCat == ""
              ? this.validationMsg
              : this.selectedExpCat,
          expenseAmount:
            this.expenseAmount == 0 ? this.validationMsg : this.expenseAmount,
          dateTime: this.dateTime == "" ? this.validationMsg : this.dateTime,
          description:
            this.description == "" ? this.validationMsg : this.description,
        })
        .then((res) => console.log(res))
        .catch((error) => (this.error = error.message));
    },
    addExpense() {
      console.log(this.expenseList);
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10%;
}
</style>
