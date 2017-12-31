import database from '../../firebase/firebase'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startSetExpenses
} from '../../actions/expensesActions'
import expenses from '../fixtures/expenses'

// Pass middlewares inside configureStore method
const middlewares = [thunk]
const createMockStore = configureMockStore(middlewares)

beforeEach((done) => {
	const expensesData = {}

	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt }
	})

	database.ref('expenses').set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123-abc' })
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123-abc'
	})
})

test('should setup edit expense action object', () => {
	const action = editExpense('123-abc', { note: 'Hello there' })
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123-abc',
		updates: {
			note: 'Hello there'
		}
	})
})

test('should setup add expense action object with provided values', () => {
	const expenseData = expenses[0] // Replaces old expensewith a dummy one with ID, because firebase requires ID
	const action = addExpense(expenseData)

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenseData
	})
})

// Add `done`param to tell jest this test is ASYNC,
// and must wait for the `done()` method
test('should add expense to database and store', (done) => {
	const expenseData = {
		description: 'New description',
		amount: 1750,
		createdAt: 1000,
		note: 'This is my note'
	}

	// Set store initial state
	const store = createMockStore({})

	// Dispatch action with dummy expense,
	// then tell jest the test is done()
	store.dispatch(startAddExpense(expenseData)).then(() => {
		// Returns the actions of the mock store
		const actions = store.getActions()

		// Expect the action is correctly dispatched
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		})

		// Then, check if database contains the new expense,
		// Then, tell Jest the test is done()
		return database.ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
		done()
	})
})

test('should add expense with default to database and store', (done) => {
	// Set initial state
	const store = createMockStore({})
	const defaultExpense = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	}

	// Dispatch action
	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions()

		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaultExpense
			}
		})

		return database.ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultExpense)
		done()
	})
})

test('should setup setExpenses action with data', () => {
	const action = setExpenses(expenses)

	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
})

test('should fetch data from database', (done) => {
	const store = createMockStore({})

	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions()

		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done()
	})
})