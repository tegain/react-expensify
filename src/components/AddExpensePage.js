import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { addExpense } from '../actions/expensesActions'

export class AddExpensePage extends React.Component {
	onSubmit = (expense) => {
		this.props.addExpense(expense) // Dispatch addExpense to the store
		this.props.history.push('/') // Redirects to the dashboard page
	}

	render () {
		return (
			<div>
				<h1>Add Expense</h1>
				<ExpenseForm
					onSubmit={this.onSubmit}
				/>
			</div>
		)
	}
}

// Use mapDispatchToProps to make the dispatch action independant from the comonent itself
// It makes the component easier to test, because there is only one linked method to test
const mapDispatchToProps = (dispatch) => ({
	addExpense: (expense) => dispatch(addExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage)