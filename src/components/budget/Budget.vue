<template>
  <div class="base-card">
    <form @submit.prevent="submitBudget">
      <div>
        <label for="budget-budgetName">Budget Name:</label>
        <input
          type="text"
          name="budget-budgetName"
          v-model="state.budgetDTO.budgetName"
          @blur="v$.budgetDTO.budgetAmount.$touch()"
        />
        <!-- <div
          class="input-errors"
          v-for="error of this.v$.budgetDTO.budgetName.$error"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div> -->
        <div v-if="this.v$.budgetDTO.budgetName.$error">
          {{ this.v$.budgetDTO.budgetName.$errors[0].$message }}
        </div>
      </div>

      <div>
        <label for="budget-amount">Amount:</label>
        <input
          type="text"
          name="budget-amount"
          v-model="state.budgetDTO.budgetAmount"
          @blur="v$.budgetDTO.budgetAmount.$touch()"
        />
        <div v-if="this.v$.budgetDTO.budgetAmount.$error">
          {{ this.v$.budgetDTO.budgetAmount.$errors[0].$message }}
        </div>
      </div>

      <div>
        <label for="start-date">Start date</label>
        <input
          type="date"
          id="start-date"
          name="start-date"
          v-model="state.budgetDTO.startDate"
          @blur="v$.budgetDTO.startDate.$touch()"
        />
        <div v-if="this.v$.budgetDTO.startDate.$error">
          {{ this.v$.budgetDTO.startDate.$errors[0].$message }}
        </div>
      </div>

      <div>
        <label for="end-date">End date</label>
        <input
          type="date"
          id="end-date"
          name="end-date"
          v-model="state.budgetDTO.endDate"
          @blur="v$.budgetDTO.endDate.$touch()"
        />
        <div v-if="this.v$.budgetDTO.endDate.$error">
          {{ this.v$.budgetDTO.endDate.$errors[0].$message }}
        </div>
      </div>

      <div>
        <label for="description">Describe the budget details</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="3"
          placeholder="Optional"
          v-model="state.budgetDTO.description"
        ></textarea>
      </div>

      <div>
        <label for="date">Budget category</label>
        <select
          name="budget-category"
          id="budget-category"
          v-model="state.budgetDTO.selectedBudgetCat"
          @blur="v$.budgetDTO.selectedBudgetCat.$touch()"
        >
          <!-- Later when fetching -->
          <!-- <option v-for="inCat in category" :key="inCat.id" value="">
      {{ inCat.budgetName }}
    </option> 
    !!!! Changed value to numbers as thats how the categeories are saved in the db.
     @blur="v$.budgetDTO.selectedIncomeCat.$touch() is so that we validate after u highlight the field.
    -->
          <option value="" hidden>Select budget category</option>
          <option value="1">Budget 1</option>
          <option value="2">Budget 2</option>
          <option value="3">Budget 3</option>
        </select>

        <div v-if="this.v$.budgetDTO.selectedBudgetCat.$error">
          You need to pick a category.
        </div>
      </div>

      <button :disabled="this.v$.budgetDTO.$invalid" @click="addBudget">
        submit
      </button>
    </form>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      budgetDTO: {
        budgetName: "",
        budgetAmount: "",
        startDate: new Date().toJSON().slice(0, 10),
        endDate: new Date().toJSON().slice(0, 10),
        description: "",
        selectedBudgetCat: "",
      },
    });

    const rules = computed(() => {
      return {
        budgetDTO: {
          budgetName: { required },
          budgetAmount: { required, numeric },
          startDate: { required },
          endDate: { required },
          description: {},
          selectedBudgetCat: { required },
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
    submitBudget() {
      // axios
      //   .post("api", {
      //     // keys must match DTO
      //     selectedIncomeCat:
      //       this.selectedIncomeCat == ""
      //         ? this.validationMsg
      //         : this.selectedIncomeCat,
      //     budgetAmount:
      //       this.budgetAmount == 0 ? this.validationMsg : this.budgetAmount,
      //     startDate: this.startDate == "" ? this.validationMsg : this.startDate,
      //     description:
      //       this.description == "" ? this.validationMsg : this.description,
      //   })
      //   .then((res) => console.log(res))
      //   .catch((error) => (this.error = error.message));
      this.v$.$validate();
    },
    addBudget() {
      console.log(this.v$.budgetDTO.budgetAmount.$error);
      console.log(this.state.budgetDTO);
      console.log(this.v$);
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
