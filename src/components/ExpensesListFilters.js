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
			<div>
				<input
					type="text"
					defaultValue={this.props.filters.text}
					onChange={this.onTextChange}
				/>

				<select
					value={this.props.filters.sortBy}
					onChange={this.onSortChange}
				>
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>

				<DateRangePicker
					startDate={this.props.filters.startDate}
					startDateId="start"
					endDate={this.props.filters.endDate}
					endDateId="end"
					onDatesChange={this.onDatesChange}
					focusedInput={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					numberOfMonths={1}
					isOutsideRange={() => false}
					showClearDates={true}
				/>
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
	setEndDate: (endDate) => dispatch(setStartDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesListFilters)