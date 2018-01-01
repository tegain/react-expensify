import React from 'react'
import { connect } from 'react-redux'
import { DateRangePicker } from 'react-dates'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filtersActions'

/**
 * Connected component has access to dispatch() method,
 * thus is able to dispatch actions to the store.
 * We import setTextFilter to update the text filter everytime users type in the input
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export class ExpensesListFilters extends React.Component {
	state = {
		calendarFocused: null
	}

	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate)
		this.props.setEndDate(endDate)
	}

	onFocusChange = (calendarFocused) => {
		this.setState(() => ({ calendarFocused }))
	}

	onTextChange = (e) => {
		this.props.setTextFilter(e.target.value)
	}

	onSortChange = (e) => {
		if (e.target.value === 'amount') {
			this.props.sortByAmount()
		} else if (e.target.value === 'date') {
			this.props.sortByDate()
		}
	}

	render () {
		return (
			<div className="input-group">
				<div className="input-group__item">
					<input
						type="text"
						defaultValue={this.props.filters.text}
						onChange={this.onTextChange}
						placeholder="Search expenses"
						className="text-input"
					/>
				</div>

				<div className="input-group__item">
					<select
						value={this.props.filters.sortBy}
						onChange={this.onSortChange}
						className="select"
					>
						<option value="date">Date</option>
						<option value="amount">Amount</option>
					</select>
				</div>

				<div className="input-group__item">
					<DateRangePicker
						startDate={this.props.filters.startDate}
						endDate={this.props.filters.endDate}
						startDateId="startDate"
						endDateId="endDate"
						onDatesChange={this.onDatesChange}
						focusedInput={this.state.calendarFocused}
						onFocusChange={this.onFocusChange}
						numberOfMonths={1}
						isOutsideRange={() => false}
						showClearDates={true}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({ filters: state.filters })

const mapDispatchToProps = (dispatch) => ({
	setTextFilter: (text) => dispatch(setTextFilter(text)),
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: () => dispatch(sortByAmount()),
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesListFilters)