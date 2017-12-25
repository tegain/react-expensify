import moment from 'moment'
import {
	setTextFilter,
	setStartDate,
	setEndDate,
	sortByDate,
	sortByAmount
} from '../../actions/filtersActions'

test('should set text filter object with text value', () => {
	const text = 'Some text'
	const action = setTextFilter(text)
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text
	})
})

test('should set text filter object with default value', () => {
	const action = setTextFilter()
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	})
})

test('should set start date filter object', () => {
	const action = setStartDate(moment(0))
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: moment(0)
	})
})

test('should set end date filter object', () => {
	const action = setEndDate(moment(0))
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: moment(0)
	})
})

test('should sort by date object', () => {
	expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE' })
})

test('should sort by amount object', () => {
	expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' })
})