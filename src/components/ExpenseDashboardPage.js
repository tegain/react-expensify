import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import ExpensesListFilters from './ExpensesListFilters'

const ExpenseDashboardPage = () => (
	<div>
		<ExpensesSummary />
		<ExpensesListFilters />
		<ExpensesList />
	</div>
)

export default ExpenseDashboardPage