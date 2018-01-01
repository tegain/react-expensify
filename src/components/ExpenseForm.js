import React from 'react'
import moment from 'moment'
import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'

export default class ExpenseForm extends React.Component {

	constructor (props) {
		super (props)

		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() :'',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: undefined
		}
	}

	onDescriptionChange = (e) => {
		const description = e.target.value
		this.setState(() => ({ description }))
	}

	onNoteChange = (e) => {
		const note = e.target.value
		this.setState(() => ({ note }))
	}

	onAmountChange = (e) => {
		const amount = e.target.value

		/**
		 * Starts (^) with digit no matter how long (but at least one, to infinity): \d{1,}
		 * Then takes optional group ()?, allowing 0 or 1 point, followed by 0 to 2 digits: (\.\d{0,2})?
		 * then finishes the expression: $
		 * @type {RegExp}
		 */
		const regex = /^\d{1,}(\.\d{0,2})?$/
		if (!amount || amount.match(regex)) { // '!amount' allows empty value, so the user can delete the amount
			this.setState(() => ({ amount }))
		}
	}

	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({ createdAt }))
		}
	}

	onFocusChange = ({ focused }) => {
		console.log({focused})
		this.setState(() => ({ calendarFocused: focused }))
	}

	onSubmit = (e) => {
		e.preventDefault()

		if (!this.state.description || !this.state.amount) {
			// Set error
			this.setState(() => ({ error: 'Please provide description and amount' }))
		} else {
			// Clear error
			this.setState(() => ({ error: undefined }))

			/**
			 * Dispatch to prop method, so the Redux action actually happens on the AddExpensePage,
			 * and not on this form (which is supposed to be reusable for AddExpense and EditExpense)
			 */
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount) * 100,
				createdAt: this.state.createdAt.valueOf(), // Get timestamps from moment.js method
				note: this.state.note
			})
		}
	}

	render () {
		return (
			<div className="input-group">
				{this.state.error && <p>{this.state.error}</p>}

				<form onSubmit={this.onSubmit} className="expenses-form">
					<div className="input-group__item">
						<input
							type="text"
							className="text-input"
							placeholder="Description"
							autoFocus
							value={this.state.description}
							onChange={this.onDescriptionChange}
						/>
					</div>

					<div className="input-group__item">
						<input
							type="text"
							className="text-input"
							placeholder="Amount"
							value={this.state.amount}
							onChange={this.onAmountChange}
						/>
					</div>

					<div className="input-group__item">
						<SingleDatePicker
							date={this.state.createdAt}
							onDateChange={this.onDateChange}
							focused={this.state.calendarFocused}
							onFocusChange={this.onFocusChange}
							numberOfMonths={1}
							isOutsideRange={(day) => false} // Enables to select dates in the past
						/>
					</div>

					<div>
						<textarea
							placeholder="Add a note for your expense (optional)"
							value={this.state.note}
							onChange={this.onNoteChange}
						>
						</textarea>
					</div>

					<div>
						<button
							type="submit"
							className="button button--blue"
						>
							Save Expense
						</button>
					</div>
				</form>
			</div>
		)
	}

}