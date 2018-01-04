import React from 'react'
import { connect } from 'react-redux'
import {startEditExpense, startRemoveExpense} from '../actions/expensesActions'
import ExpenseForm from './ExpenseForm'
import ExpenseRemoveModal from './ExpenseRemoveModal'

export class EditExpensePage extends React.Component {
	state = {
		expenseToRemove: {
			id: undefined,
			description: undefined
		}
	}

	onSubmit = (expense) => {
		this.props.startEditExpense(this.props.expense.id, expense)
		this.props.history.push('/')
	}

	onRemove = () => {
		const id = this.props.expense.id
		const description = this.props.expense.description

		this.setState(() => ({
			expenseToRemove: {
				id,
				description
			}
		}))
	}

	onClearRemoveExpense = () => {
		this.setState(() => ({
			expenseToRemove: {
				id: undefined,
				description: undefined
			}
		}))
	}

	render () {
		return (
			<div>
				<div className="content-header">
					<div className="content-header__container container">
						<h2 className="content-header__heading">Edit expense</h2>
					</div>
				</div>

				<div className="content-body">
					<div className="content-body__container container">
						<ExpenseForm
							expense={this.props.expense}
							onSubmit={this.onSubmit}
						/>
						<button
							onClick={this.onRemove}
							className="button button--ghost"
						>
							Remove expense
						</button>
					</div>
				</div>

				<ExpenseRemoveModal
					history={this.props.history}
					removeExpenseId={this.state.expenseToRemove.id}
					removeExpenseDesc={this.state.expenseToRemove.description}
					onClearRemoveExpense={this.onClearRemoveExpense}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
	startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)