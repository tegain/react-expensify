import React from 'react'
import { connect } from 'react-redux'
import ExpensesListItem from './ExpensesListItem'
import selectExpenses from '../selectors/expensesSelectors'

// Takes props from the Connected Component
export const ExpensesList = (props) => (
	<div className="expenses">
		<div className="expenses-header">
			<span className="expenses-header__expense">Expense</span>
			<span className="expenses-header__amount">Amount</span>
		</div>

		<div className="expenses-list">
			{
				props.expenses.length === 0 ? (
					<p className="expenses-list__empty">No expenses</p>
				) : (
					props.expenses.map((expense) => (
						<ExpensesListItem key={expense.id} {...expense} /> // Deconstruct expenses properties
					))
				)
			}
		</div>
	</div>
)

/**
 * This is a function that wraps your component in another component,
 * which subscribes to changes in the Redux store and renders itself and
 * consequently its descendants whenever an update occurs.
 *
 * connect(what_we_want_to_connect)(which_component_we_want_to_connect)
 */
// const ConnectedExpensesList = connect((state) => {
// 	return {
// 		expenses: state.expenses // We only want to connect state.expenses (not all the state)
// 	}
// })(ExpensesList)
//
// export default ConnectedExpensesList

// REFACTOR -->

const mapStateToProps = (state) => {
	return {
		expenses: selectExpenses(state.expenses, state.filters) // We only want to connect the filtered state.expenses (not all the state)
	}
}

export default connect(mapStateToProps)(ExpensesList)

