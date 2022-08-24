<template>
	<!-- @submit.prevent="submitExpense" -->
	<form @submit.prevent="addExpense">
		<span>Add a new expense</span>
		<!--<label for="expense-category">Expense category</label>-->
		<select v-model="v$.balanceChangeDTO.budgetCategoryID.$model" name="expense-category" id="expense-category">
			<!-- Later when fetching -->
			<!-- <option v-for="exCat in category" :key="exCat.id" value="">
      {{ exCat.name }}
    </option> -->
			<option value="" disabled hidden>Select Category</option>
			<option value="1">Food</option>
			<option value="2">Car</option>
			<option value="3">Other</option>
		</select>

		<p v-if="balanceChangeDTO.budgetCategoryID > 3">{{ validationMsg }}</p>

		<!-- <label for="title">Expense name:</label>-->
		<!-- <input type="text" name="expense-name" v-model="expenseName" /> -->

		<input type="text" name="title" v-model="v$.balanceChangeDTO.title.$model" placeholder="Expense name:" />
		<div class="input-errors" v-for="(error, index) of v$.balanceChangeDTO.title.$errors" :key="index">
			<div class="error-msg">{{ error.$message }}</div>
		</div>

		<!-- <div v-for="expense in expenseList" :key="expense">
        <ExpenseNameField @expense-name="getExpenseNameBack"></ExpenseNameField>
      </div> -->

		<!-- ------------------------ -->
		<!-- ------------------------ -->
		<!-- ------------------------ -->
		<!-- ------------------------ -->
		<!-- ------------------------ -->
		<!-- ------------------------ -->
		<!-- ------------------------ -->
		<!--<label for="expense-amount">Balance:</label>-->
		<input type="number" name="expense-amount" v-model="v$.balanceChangeDTO.amount.$model" placeholder="Amount:" />
		<div class="input-errors" v-for="(error, index) of v$.balanceChangeDTO.amount.$errors" :key="index">
			<div class="error-msg">{{ error.$message }}</div>
		</div>
		<p v-if="balanceChangeDTO.amount === 0">{{ validationMsg }}</p>

		<label for="balanceDate">Expense Date & Time</label>
		<input type="date" name="balanceDate" v-model="v$.balanceChangeDTO.date.$model" />
		<p v-if="balanceChangeDTO.date === ''">{{ validationMsg }}</p>

		<label for="description">Description</label>
		<textarea
			name="description"
			id="description"
			cols="30"
			rows="3"
			placeholder="Optional"
			v-model.lazy="balanceChangeDTO.description"
		></textarea>
		<button :disabled="v$.balanceChangeDTO.$invalid" @click="addExpense">submit</button>
		<p v-if="error !== ''">{{ error }} {{ resetRequestError }}</p>
	</form>
</template>

<script>
import axios from 'axios';
import ExpenseNameField from './ExpenseNameField.vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
export default {
	setup() {
		return { v$: useVuelidate() };
	},
	components: {
		ExpenseNameField,
	},
	data() {
		return {
			balanceChangeDTO: {
				budgetCategoryID: '',
				title: '',
				amount: '',
				date: new Date().toJSON().slice(0, 10), //added todays date as the default date.
				description: '',
			},
			error: '',
			validationMsg: 'input field required',
		};
	},
	validations() {
		return {
			balanceChangeDTO: { // here we can add validation rules.
				budgetCategoryID: { required }, // matches this.balanceChangeDTO.budgetCategoryID
				title: { required }, // matches this.balanceChangeDTO.title
				amount: { required },
				date: { required },
			},
		};
	},

	computed: {
		resetRequestError() {
			setTimeout(() => {
				this.error = '';
			}, 3000);
		},
	},
	methods: {
		submitExpense() {
			axios
				.post('api', {
					// keys must match DTO
					budgetCategoryID: this.budgetCategoryID == '' ? this.validationMsg : this.budgetCategoryID,
					amount: this.amount == 0 ? this.validationMsg : this.amount,
					dateTime: this.dateTime == '' ? this.validationMsg : this.dateTime,
					description: this.description == '' ? this.validationMsg : this.description,
				})
				.then((res) => console.log(res))
				.catch((error) => (this.error = error.message));
		},
		addExpense() {
			console.log(this.balanceChangeDTO);
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
