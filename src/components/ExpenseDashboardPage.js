import React from 'react'
import ExpensesList from './ExpensesList'
import ExpensesListFilters from './ExpensesListFilters'

const ExpenseDashboardPage = () => (
	<div>
		<ExpensesListFilters />
		<ExpensesList />
	</div>
)

export default ExpenseDashboardPage