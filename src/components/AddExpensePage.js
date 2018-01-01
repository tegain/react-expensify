import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { startAddExpense } from '../actions/expensesActions'

export class AddExpensePage extends React.Component {
	onSubmit = (expense) => {
		this.props.startAddExpense(expense) // Dispatch startAddExpense to the store
		this.props.history.push('/') // Redirects to the dashboard page
	}

	render () {
		return (
			<div>
				<div className="content-header">
					<div className="content-header__container container">
						<h2 className="content-header__heading">Add new expense</h2>
					</div>
				</div>

				<div className="content-body">
					<div className="content-body__container container">
						<ExpenseForm
							onSubmit={this.onSubmit}
						/>
					</div>
				</div>
			</div>
		)
	}
}

// Use mapDispatchToProps to make the dispatch action independant from the comonent itself
// It makes the component easier to test, because there is only one linked method to test
const mapDispatchToProps = (dispatch) => ({
	startAddExpense: (expense) => dispatch(startAddExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage)