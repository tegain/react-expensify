import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import numeral from 'numeral'
import '../locales/fr'
import getVisibleExpenses from '../selectors/expensesSelectors'
import getExpensestotal from '../selectors/expensesTotalSelectors'

export const ExpensesSummary = ({ expensesCount, expensesTotal, expensesHiddenCount }) => {
	const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
	const expenseHiddenWord = expensesHiddenCount === 1 ? 'expense' : 'expenses'
	const formattedExpensesTotal = numeral(expensesTotal / 100).format("0,0.[00] $")

	return (
		<div className="content-header">
			<div className="content-header__container container">
				<h2 className="content-header__heading">
					Viewing <strong>{expensesCount} {expenseWord}</strong> totalling <strong>{formattedExpensesTotal}</strong>.
					{
						expensesHiddenCount > 0 && (
							<span className="content-header__info">{expensesHiddenCount} {expenseHiddenWord} hidden by filters</span>
						)
					}
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
	const allExpenses = state.expenses
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)

	return {
		expensesHiddenCount: allExpenses.length - visibleExpenses.length,
		expensesCount: visibleExpenses.length,
		expensesTotal: getExpensestotal(visibleExpenses)
	}
}

export default connect(mapStateToProps)(ExpensesSummary)
