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
			<option value="" disabled hidden>Select Category</option> <!-- This is coz our default value is an empty string so this will shot up by default.-->
			<option value="1">Food</option>
			<option value="2">Car</option>
			<option value="3">Other</option>
		</select>

	

		<input type="text" name="title" v-model="v$.balanceChangeDTO.title.$model" placeholder="Expense name:" />

    <!-- v$ is so we use the validator component. same with $model.-->
		<!-- this 2 rows are copy pasted from the validation @vuelidate/validators and will show error message if the validation rules are broken and will only show error if 
    user has inputed something in the field aka it togles it to dirty first after user inputs.-->

		<div class="input-errors" v-for="(error, index) of v$.balanceChangeDTO.title.$errors" :key="index">
			<div class="error-msg">{{ error.$message }}</div>
		</div>

	
		<input type="number" name="expense-amount" v-model="v$.balanceChangeDTO.amount.$model" placeholder="Amount:" /> 
    <div class="input-errors" v-for="(error, index) of v$.balanceChangeDTO.amount.$errors" :key="index">
			<div class="error-msg">{{ error.$message }}</div>
		</div>
     
     <!-- old validation method  
		<p v-if="balanceChangeDTO.amount === 0">{{ validationMsg }}</p>
    -->

		<label for="balanceDate">Expense Date & Time</label>
		<input type="date" name="balanceDate" v-model="v$.balanceChangeDTO.date.$model" />
		<div class="input-errors" v-for="(error, index) of v$.balanceChangeDTO.date.$errors" :key="index">
			<div class="error-msg">{{ error.$message }}</div>
		</div>

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
		return { v$: useVuelidate() }; //this on is to use the validator funktion
	},
	components: {
		ExpenseNameField,
	},
	data() {
		return {
			balanceChangeDTO: { //now we can send balanceChangeDTO directly to endpoint as its formated same as the backend wants it.
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
			balanceChangeDTO: {
				// here we can add validation rules.
				budgetCategoryID: { required }, // matches this.balanceChangeDTO.budgetCategoryID
				title: { required }, // matches this.balanceChangeDTO.title
				amount: { required },
				date: { required },
			},
		};
	},

	computed: {
		resetRequestError() { //legazy code as validation is now used by an other function
			setTimeout(() => {
				this.error = '';
			}, 3000);
		},
	},
	methods: {
		submitExpense() {
			axios
				.post('api', { // adam: have not done anything here realy. 
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
