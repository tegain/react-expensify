import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import '../locales/fr'
import getVisibleExpenses from '../selectors/expensesSelectors'
import getExpensestotal from '../selectors/expensesTotalSelectors'

export const ExpensesSummary = (props) => (
	<div>
		{
			props.count > 0 && (
				<h4>
					Viewing {props.count}
					{props.count === 1 ? 'expense' : 'expenses'}
					totalling {numeral(props.total / 100).format("0,0.[00] $")}
				</h4>
			)
		}
	</div>
)

const mapStateToProps = (state) => ({
	count: getVisibleExpenses(state.expenses, state.filters).length,
	total: getExpensestotal(getVisibleExpenses(state.expenses, state.filters))
})

export default connect(mapStateToProps)(ExpensesSummary)