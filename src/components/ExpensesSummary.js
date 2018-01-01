import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import numeral from 'numeral'
import '../locales/fr'
import getVisibleExpenses from '../selectors/expensesSelectors'
import getExpensestotal from '../selectors/expensesTotalSelectors'

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
	const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
	const formattedExpensesTotal = numeral(expensesTotal / 100).format("0,0.[00] $")

	return (
		<div className="content-header">
			<div className="content-header__container container">
				<h2 className="content-header__heading">
					Viewing <strong>{expensesCount} {expenseWord}</strong> totalling <strong>{formattedExpensesTotal}</strong>
				</h2>

				<div className="content-header__actions">
					<Link
						to="/create"
						className="content-header__btn button button--blue"
					>
						Add expense
					</Link>
				</div>
			</div>
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