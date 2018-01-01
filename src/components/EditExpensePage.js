import React from 'react'
import { connect } from 'react-redux'
import {startEditExpense, startRemoveExpense} from '../actions/expensesActions'
import ExpenseForm from './ExpenseForm'

export class EditExpensePage extends React.Component {
	onSubmit = (expense) => {
		this.props.startEditExpense(this.props.expense.id, expense)
		this.props.history.push('/')
	}

	onRemove = () => {
		this.props.startRemoveExpense({ id: this.props.expense.id })
		this.props.history.push('/')
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
			</div>
		)
	}
}

const mapStateToProps = (state, props) => ({
	expense: state.expenses.find((expense) => expense.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch, props) => ({
	startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
	startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)