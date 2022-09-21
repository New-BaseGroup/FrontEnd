<template>
  <div class="base-card">
    <form @submit.prevent="submitIncome">
      <div>
        <label for="date">Income category</label>
        <select
          name="income-category"
          id="income-category"
          v-model="state.incomeDTO.selectedIncomeCat"
           @blur="v$.incomeDTO.selectedIncomeCat.$touch()"
        >
          <!-- Later when fetching -->
          <!-- <option v-for="inCat in category" :key="inCat.id" value="">
      {{ inCat.name }}
    </option> 
    !!!! Changed value to numbers as thats how the categeories are saved in the db.
     @blur="v$.incomeDTO.selectedIncomeCat.$touch() is so that we validate after u highlight the field.
    -->
          <option value="" hidden>Select income category</option>
          <option value="1">Salary</option>
          <option value="2">loan</option>
          <option value="3">Other</option>
        </select>

        <div v-if="this.v$.incomeDTO.selectedIncomeCat.$error">
        You need to pick a category.
        </div>
      </div>
      <div>
        <label for="income-amount">Balance:</label>
        <input
          type="text"
          name="income-amount"
          v-model="state.incomeDTO.incomeAmount"
          @blur="v$.incomeDTO.incomeAmount.$touch()"
        />
         <div class="input-errors" v-for="error of this.v$.incomeDTO.incomeAmount.$error" :key="error.$uid">
    <div class="error-msg">{{ error.$message }}</div>
  </div>
        <div v-if="this.v$.incomeDTO.incomeAmount.$error">
          {{ this.v$.incomeDTO.incomeAmount.$errors[0].$message }}
        </div>
      </div>

      <label for="date">Income Date & Time</label>
      <input
        type="date"
        id="date"
        name="date"
        v-model="state.incomeDTO.dateTime"
        @blur="v$.incomeDTO.dateTime.$touch()"
      />
       <div class="input-errors" v-for="error of v$.incomeDTO.dateTime.$error" :key="error.$uid">
    <div class="error-msg">{{ error.$message }}</div>
  </div>
 
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
      <button :disabled="this.v$.incomeDTO.$invalid" @click="addIncome">submit</button>
      <!-- <p v-if="error !== ''">{{ error }} {{ resetRequestError }}</p> -->
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
          description: {},
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
   addIncome() {
    console.log(this.v$.incomeDTO.incomeAmount.$error);
    console.log(this.state.incomeDTO);
   }
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