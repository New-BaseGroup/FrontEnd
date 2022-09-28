<template>
	<div class="base-card">
		<div class="base-card-Container">
			<div class="flex items-center justify-center text-4xl font-black text-background-text m-3">
				<h1 class="tracking-wide">SkyBudget<span class="font-mono">™</span></h1>
			</div>
			<h3 class="text-2xl my-4 text-center">Add a new budget</h3>
			<div>
				<form @submit.prevent="submitBudget">
					<label for="budget-budgetName">Budget Name:</label>
					<input
						type="text"
						name="budget-budgetName"
						v-model="state.budgetDTO.budgetName"
						required
						@blur="v$.budgetDTO.budgetAmount.$touch()"
					/>

					<label for="budget-amount">Amount:</label>
					<input
						type="text"
						name="budget-amount"
						required
						v-model="state.budgetDTO.budgetAmount"
						@blur="v$.budgetDTO.budgetAmount.$touch()"
					/>

					<label for="start-date">Start date</label>
					<input
						type="date"
						id="start-date"
						name="start-date"
						required
						v-model="state.budgetDTO.startDate"
						@blur="v$.budgetDTO.startDate.$touch()"
					/>

					<label for="end-date">End date</label>
					<input
						type="date"
						id="end-date"
						name="end-date"
						required
						v-model="state.budgetDTO.endDate"
						@blur="v$.budgetDTO.endDate.$touch()"
					/>

					<label for="description">Describe the budget details</label>
					<textarea
						name="description"
						id="description"
						cols="30"
						rows="3"
						placeholder="Optional"
						v-model="state.budgetDTO.description"
					></textarea>

					<label for="date">Budget category</label>
					<select
						name="budget-category"
						id="budget-category"
						required
						v-model="state.budgetDTO.selectedBudgetCat"
						@blur="v$.budgetDTO.selectedBudgetCat.$touch()"
					>
						<option value="" hidden>Select budget category</option>
						<option value="1">Budget 1</option>
						<option value="2">Budget 2</option>
						<option value="3">Budget 3</option>
					</select>

					<button @click="addBudget">submit</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import useValidate from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
export default {
	setup() {
		const state = reactive({
			budgetDTO: {
				budgetName: '',
				budgetAmount: '',
				startDate: new Date().toJSON().slice(0, 10),
				endDate: new Date().toJSON().slice(0, 10),
				description: '',
				selectedBudgetCat: '',
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
