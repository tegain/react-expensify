import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import '../locales/fr'
import getVisibleExpenses from '../selectors/expensesSelectors'
import getExpensestotal from '../selectors/expensesTotalSelectors'

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
	const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
	const formattedExpensesTotal = numeral(expensesTotal / 100).format("0,0.[00] $")

	return (
		<div>
			<h4>
				Viewing {expensesCount} {expenseWord} totalling {formattedExpensesTotal}
			</h4>
		</div>
	)
}

const mapStateToProps = (state) => {
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)

	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: getExpensestotal(visibleExpenses)
	}
}

export default connect(mapStateToProps)(ExpensesSummary)