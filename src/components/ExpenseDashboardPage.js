import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import ExpensesListFilters from './ExpensesListFilters'

const ExpenseDashboardPage = () => (
	<div>
		<ExpensesSummary />
		<div className="container">
			<ExpensesListFilters />
			<ExpensesList />
		</div>
	</div>
)

export default ExpenseDashboardPage