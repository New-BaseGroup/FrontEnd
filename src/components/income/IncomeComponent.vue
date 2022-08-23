<template>
  <form @submit.prevent="submitIncome">
    <label for="date">Income category</label>
    <select
      name="income-category"
      id="income-category"
      v-model="selectedIncomeCat"
    >
      <!-- Later when fetching -->
      <!-- <option v-for="inCat in category" :key="inCat.id" value="">
      {{ inCat.name }}
    </option> -->
      <option value=""></option>
      <option value="salary">Salary</option>
      <option value="loan">loan</option>
      <option value="other">Other</option>
    </select>
    <p v-if="selectedIncomeCat === ''">{{ validationMsg }}</p>

    <label for="income-amount">Balance:</label>
    <input type="number" name="income-amount" v-model="incomeAmount" />

    <p v-if="incomeAmount === 0">{{ validationMsg }}</p>

    <label for="date">Income Date & Time</label>
    <input type="date" id="date" name="date" v-model="dateTime" required />
    <p v-if="dateTime === ' '">{{ validationMsg }}</p>

    <label for="description">Describe the income details</label>
    <textarea
      name="description"
      id="description"
      cols="30"
      rows="3"
      placeholder="Optional"
      v-model="description"
    ></textarea>
    <button>submit</button>
    <p v-if="error !== ''">{{ error }} {{ resetRequestError }}</p>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedIncomeCat: "salary",
      incomeAmount: "0",
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
  },
  methods: {
    submitIncome() {
      axios
        .post("api", {
          // keys must match DTO
          selectedIncomeCat:
            this.selectedIncomeCat == ""
              ? this.validationMsg
              : this.selectedIncomeCat,
          incomeAmount:
            this.incomeAmount == 0 ? this.validationMsg : this.incomeAmount,
          dateTime: this.dateTime == "" ? this.validationMsg : this.dateTime,
          description:
            this.description == "" ? this.validationMsg : this.description,
        })
        .then((res) => console.log(res))
        .catch((error) => (this.error = error.message));
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
