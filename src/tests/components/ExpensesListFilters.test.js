import React from 'react'
import { shallow } from 'enzyme'
import { filters, altFilters } from '../fixtures/filters'
import { ExpensesListFilters } from '../../components/ExpensesListFilters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
	setTextFilter = jest.fn()
	sortByDate = jest.fn()
	sortByAmount = jest.fn()
	setStartDate = jest.fn()
	setEndDate = jest.fn()
	wrapper = shallow(
		<ExpensesListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	)
})

test('should render ExpensesListFilters correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesListFilters with alt data correctly', () => {
	wrapper.setProps({ filters: altFilters })
	expect(wrapper).toMatchSnapshot()
})

// should handle text change
test('should handle text change', () => {
	const value = 'Rent'
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	})
	expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

// should sort by date
test('should sort by date', () => {
	const value = 'date'
	wrapper.setProps({ filters: altFilters })
	wrapper.find('select').simulate('change', {
		target: { value }
	})
	expect(sortByDate).toHaveBeenCalled()
})

// should sort by amount
test('should sort by amount', () => {
	const value = 'amount'
	wrapper.find('select').simulate('change', {
		target: { value }
	})
	expect(sortByAmount).toHaveBeenCalled()
})

// should handle date changes
test('should handle date changes', () => {
	const startDate = altFilters.startDate
	const endDate = altFilters.endDate
	wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate})
	expect(setStartDate).toHaveBeenLastCalledWith(startDate)
	expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

// should handle date focus changes
test('should handle date focus changes', () => {
	const focused = 'startDate'
	wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focused)
	expect(wrapper.state('calendarFocused')).toBe(focused)
})