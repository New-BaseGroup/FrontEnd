<template>
	<div class="base-card">
		<form @submit.prevent="submitExpense">
			<div>
				<label for="date">Expense category</label>
				<select
					name="expense-category"
					id="expense-category"
					v-model="state.balanceChangeDTO.budgetCategoryID"
					@blur="v$.balanceChangeDTO.budgetCategoryID.$touch()"
				>
					<!-- Later when fetching -->
					<!-- <option v-for="inCat in category" :key="inCat.id" value="">
      {{ inCat.name }}
    </option> 
    !!!! Changed value to numbers as thats how the categeories are saved in the db.
     @blur="v$.balanceChangeDTO.budgetCategoryID.$touch() is so that we validate after u highlight the field.
    -->
					<option value="" hidden>Select income category</option>
					<option value="1">Food</option>
					<option value="2">Car</option>
					<option value="3">Other</option>
				</select>

				<div v-if="this.v$.balanceChangeDTO.budgetCategoryID.$error">You need to pick a category.</div>
			</div>
      <input type="text" name="title" v-model="state.balanceChangeDTO.title" @blur="v$.balanceChangeDTO.title.$touch()" placeholder="Expense name:" />
			<div>
				<label for="income-amount">Balance:</label>
				<input type="text" name="income-amount" v-model="state.balanceChangeDTO.amount" @blur="v$.balanceChangeDTO.amount.$touch()" />
				<div class="input-errors" v-for="error of this.v$.balanceChangeDTO.amount.$error" :key="error.$uid">
					<div class="error-msg">{{ error.$message }}</div>
				</div>
				<div v-if="this.v$.balanceChangeDTO.amount.$error">
					{{ this.v$.balanceChangeDTO.amount.$errors[0].$message }}
				</div>
			</div>

			<label for="date">Income Date & Time</label>
			<input type="date" id="date" name="date" v-model="state.balanceChangeDTO.date" @blur="v$.balanceChangeDTO.date.$touch()" />
			<div class="input-errors" v-for="error of v$.balanceChangeDTO.date.$error" :key="error.$uid">
				<div class="error-msg">{{ error.$message }}</div>
			</div>

			<!-- <p v-if="date === ' '">{{ validationMsg }}</p> -->

			<label for="description">Describe the expense details</label>
			<textarea
				name="description"
				id="description"
				cols="30"
				rows="3"
				placeholder="Optional"
				v-model="state.balanceChangeDTO.description"
			></textarea>
			<button :disabled="this.v$.balanceChangeDTO.$invalid" @click="addIncome">submit</button>
			<!-- <p v-if="error !== ''">{{ error }} {{ resetRequestError }}</p> -->
		</form>
	</div>
</template>

<script>
import useValidate from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import axios from 'axios';
export default {
	setup() {
		const state = reactive({
			balanceChangeDTO: {
				budgetCategoryID: '',
				amount: '',
        title: '',
				date: new Date().toJSON().slice(0, 10),
				description: '',
			},
		});
		const rules = computed(() => {
			return {
				balanceChangeDTO: {
					budgetCategoryID: { required },
					amount: { required, numeric },
          title: {required},
					date: { required },
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
			//     budgetCategoryID:
			//       this.budgetCategoryID == ""
			//         ? this.validationMsg
			//         : this.budgetCategoryID,
			//     amount:
			//       this.amount == 0 ? this.validationMsg : this.amount,
			//     date: this.date == "" ? this.validationMsg : this.date,
			//     description:
			//       this.description == "" ? this.validationMsg : this.description,
			//   })
			//   .then((res) => console.log(res))
			//   .catch((error) => (this.error = error.message));
			this.v$.$validate();
		},
		addIncome() {
			console.log(this.v$.balanceChangeDTO.amount.$error);
			console.log(this.state.balanceChangeDTO);
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


