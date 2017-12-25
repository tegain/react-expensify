import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// Actions:
//
// * Expenses:
//   ADD_EXPENSE
//   REMOVE_EXPENSE
//   EDIT_EXPENSE
//
// * Filters:
//   SET_TEXT_FILTER
//   SORT_BY_DATE
//   SORT_BY_AMOUNT
//   SET_START_DATE
//   SET_END_DATE


// ADD_EXPENSE
const addExpense = (
	{
		description = '',
		note = '',
		amount = 0,
		createdAt = 0
	} = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
})

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})

const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			]
		case 'REMOVE_EXPENSE':
			// return state.filter((e) => e.id !== action.id)
			return state.filter(({ id }) => id !== action.id) // Refactor
		case 'EDIT_EXPENSE':
 			return state.map((expense) => {
 				// Find expense with id matching the action.id
 				// Using object spread operator to override action.updates (object) to original expense (also object)
 				if (expense.id === action.id) {
 					return {
						...expense,
						...action.updates
					}
				} else {
 					return expense
				}
			})
		default:
			return state
	}
}


// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text
})

//SORT_BY_AMOUNT
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
})

// SORT_BY_DATE
const sortByDate = () => ({
	type: 'SORT_BY_DATE'
})

// SET_START_DATE
const setStartDate = (startDate) => ({
	type: 'SET_START_DATE',
	startDate
})

// SET_END_DATE
const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
})

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			}
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount'
			}
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date'
			}
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			}
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			}
		default:
			return state
	}
}

// Timestamps
//

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	console.log(sortBy)
	// Filter by text, startDate, and endDate
	return expenses.filter((expense) => {
		// If startDate isn't a number (ex. 'undefined'), the result is TRUE
		// -> startDate shouldn't be blocking expenses visibility
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

		return startDateMatch && endDateMatch && textMatch
	}).sort((a, b) => {
		// Sort filtered expenses by date or amount
		// @doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort
		if (sortBy === 'date') {
			return (a.createdAt < b.createdAt) ? 1 : -1
		} else if (sortBy === 'amount') {
			return (a.amount < b.amount) ? 1 : -1
		}
	})
}

// Store creation
// Combine reducers: takes an object, assigning each reducer to the wanted key
const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
)

store.subscribe(() => {
	const state = store.getState()
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
	console.log(visibleExpenses)
})

// The returned value of a dispatch method IS the store's action
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -1000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }))
// console.log(expenseOne) // ==> {type: 'ADD_EXPENSE', expense: {...}}

// Expenses
// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))
//
// // Filters
// store.dispatch(setTextFilter('rent')) // should return 'rent'
// store.dispatch(setTextFilter()) // should return empty string
 store.dispatch(sortByAmount())
// store.dispatch(sortByDate())
// store.dispatch(setStartDate(125)) // should return startDate: 125
// store.dispatch(setStartDate())		// should return startDate: undefined
// store.dispatch(setEndDate(250))	// should return endDate: 1250


const demoState = {
	expenses: [{
		id: 'dgfdsgdghg',
		description: 'January rent',
		note: 'This was the final payment for that address',
		amount: '54500',
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'amount', // date or amount
		startDate: undefined,
		endDate: undefined
	}
}