import moment from 'moment'
import selectExpenses from '../../selectors/expensesSelectors'
import expenses from '../fixtures/expenses'


/**
 * Keep only 2nd and last one, sorting by [recent, old]
 */
test('should filter by text value "e"', () => {
	const filters = {
		text: 'e',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([ expenses[2], expenses[0] ])
})

/**
 * Keep only 2nd and last one, sorting by [recent, old]
 */
test('should filter by text value "bill"', () => {
	const filters = {
		text: 'bill',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([ expenses[2], expenses[1] ])
})

/**
 * Keep only 1st and last expenses, sorting by [recent, old]
 */
test('should filter by startDate', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: moment(0),
		endDate: undefined
	}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([ expenses[2], expenses[0] ])
})

// Should filter by endDate
test('should filter by end date (UNIX 0)', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: moment(0)
	}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([ expenses[0], expenses[1] ])
})

test('should filter by end date (UNIX -1 day)', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: moment(0).subtract(1, 'days')
	}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([ expenses[1] ])
})

// Should sort by date
test('should sort by date (most recent first)', () => {
	const filters = {
		text: '',
		sortBy: 'date',
		startDate: undefined,
		endDate: undefined
	}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ])
})

// Should sort by amount
test('should sort by amount (most expensive first)', () => {
	const filters = {
		text: '',
		sortBy: 'amount',
		startDate: undefined,
		endDate: undefined
	}
	const result = selectExpenses(expenses, filters)
	expect(result).toEqual([ expenses[1], expenses[2], expenses[0] ])
})