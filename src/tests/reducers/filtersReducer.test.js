import moment from 'moment'
import filtersReducer from '../../reducers/filtersReducer'

test('should setup default filter values', () => {
	// This is default action sent by redux, when initializing
	const state = filtersReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	})
})

test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
	expect(state.sortBy).toBe('amount')
})

test('should set sortBy to date', () => {
	// Set default current state to actually see 'sortBy' change
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	}
	const state = filtersReducer(currentState, { type: 'SORT_BY_DATE' })
	expect(state.sortBy).toBe('date')
})

test('should set text filter', () => {
	const text = 'Rent'
	const action = {
		type: 'SET_TEXT_FILTER',
		text
	}
	const state = filtersReducer(undefined, action)
	expect(state.text).toBe(text)
})

test('should set startDate filter', () => {
	const startDate = moment(0).valueOf()
	const action = {
		type: 'SET_START_DATE',
		startDate
	}
	const state = filtersReducer(undefined, action)
	expect(state.startDate).toEqual(startDate)
})

test('should set endDate filter', () => {
	const endDate = moment(0).valueOf()
	const action = {
		type: 'SET_END_DATE',
		endDate
	}
	const state = filtersReducer(undefined, action)
	expect(state.endDate).toEqual(endDate)
})