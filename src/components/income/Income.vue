<template>
  <base-card>
    <form @submit.prevent="submitIncome">
      <div>
        <label for="date">Income category</label>
        <select
          name="income-category"
          id="income-category"
          v-model="state.incomeDTO.selectedIncomeCat"
        >
          <!-- Later when fetching -->
          <!-- <option v-for="inCat in category" :key="inCat.id" value="">
      {{ inCat.name }}
    </option> -->
          <option value="" hidden>Select income category</option>
          <option value="salary">Salary</option>
          <option value="loan">loan</option>
          <option value="other">Other</option>
        </select>
        <p v-if="v$.incomeDTO.selectedIncomeCat.$error">
          {{ v$.incomeDTO.selectedIncomeCat.$errors[0].$message }}
        </p>
      </div>
      <div>
        <label for="income-amount">Balance:</label>
        <input
          type="text"
          name="income-amount"
          v-model="state.incomeDTO.incomeAmount"
        />
        <p v-if="v$.incomeDTO.incomeAmount.$error">
          {{ v$.incomeDTO.incomeAmount.$errors[0].$message }}
        </p>
      </div>

      <label for="date">Income Date & Time</label>
      <input
        type="date"
        id="date"
        name="date"
        v-model="state.incomeDTO.dateTime"
      />
      <!-- <p v-if="dateTime === ' '">{{ validationMsg }}</p> -->

      <label for="description">Describe the income details</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="3"
        placeholder="Optional"
        v-model="state.incomeDTO.description"
      ></textarea>
      <button>submit</button>
      <!-- <p v-if="error !== ''">{{ error }} {{ resetRequestError }}</p> -->
    </form>
  </base-card>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      incomeDTO: {
        selectedIncomeCat: "",
        incomeAmount: "",
        dateTime: new Date().toJSON().slice(0, 10),
        description: "",
      },
    });

    const rules = computed(() => {
      return {
        incomeDTO: {
          selectedIncomeCat: { required },
          incomeAmount: { required, numeric },
          dateTime: { required },
        },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
    };
  },
  data() {
    return {};
  },

  methods: {
    submitIncome() {
      // axios
      //   .post("api", {
      //     // keys must match DTO
      //     selectedIncomeCat:
      //       this.selectedIncomeCat == ""
      //         ? this.validationMsg
      //         : this.selectedIncomeCat,
      //     incomeAmount:
      //       this.incomeAmount == 0 ? this.validationMsg : this.incomeAmount,
      //     dateTime: this.dateTime == "" ? this.validationMsg : this.dateTime,
      //     description:
      //       this.description == "" ? this.validationMsg : this.description,
      //   })
      //   .then((res) => console.log(res))
      //   .catch((error) => (this.error = error.message));
      this.v$.$validate();
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
