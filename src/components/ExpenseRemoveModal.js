import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import {startRemoveExpense} from "../actions/expensesActions";

export class ExpenseRemoveModal extends React.Component {
	onRemoveExpense = () => {
		this.props.startRemoveExpense({ id: this.props.removeExpenseId })
		this.props.history.push('/')
	}

	render () {
		return (
			<Modal
				appElement={document.getElementById('root')}
				isOpen={!!this.props.removeExpenseId}
				onRequestClose={this.props.onClearRemoveExpense}
				contentLabel="Remove expense"
				closeTimeoutMS={200}
				className="modal"
			>
				<h3 className="ReactModal__title">Remove an expense</h3>
				<div className="ReactModal__inner">
					<p>Remove expense <strong>{this.props.removeExpenseDesc}</strong> ?</p>
					<div className="ReactModal__actions">
						<button
							className="button button--blue"
							onClick={this.onRemoveExpense}
						>
							Remove
						</button>

						<button
							className="button button--transparent"
							onClick={this.props.onClearRemoveExpense}
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(undefined, mapDispatchToProps)(ExpenseRemoveModal)