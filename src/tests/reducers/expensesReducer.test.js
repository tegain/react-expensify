import uuid from 'uuid'
import moment from 'moment'
import expenses from '../fixtures/expenses'
import expensesReducer from '../../reducers/expensesReducer'

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual([])
})

// should add expense
test('should add new expense', () => {
	const expense = {
		id: uuid(),
		description: 'Coffee',
		amount: '350',
		createdAt: moment(0).valueOf()
	}
	const action = {
		type: 'ADD_EXPENSE',
		expense
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([...expenses, expense])
})

// should edit expense
test('should edit expense', () => {
	const description = 'Rent for october'
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			description
		}
	}
	const state = expensesReducer(expenses, action)
	expect(state[0].description).toBe(description)
	// expect(state).toEqual([
	// 	{ ...expenses[0], description },
	// 	expenses[1],
	// 	expenses[2]
	// ])
})

test('should not edit expense if id not found', () => {
	const description = 'Rent for october'
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			description
		}
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses)
})



// should remove expense
test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([ expenses[0], expenses[2] ])
})

test('should not remove expense if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses)
})

test('should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [ expenses[1], expenses[0] ]
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([ expenses[1], expenses[0] ])
})