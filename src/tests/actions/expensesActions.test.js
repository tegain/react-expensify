import database from '../../firebase/firebase'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	startAddExpense,
	addExpense,
	editExpense,
	startEditExpense,
	removeExpense,
	startRemoveExpense,
	setExpenses,
	startSetExpenses
} from '../../actions/expensesActions'
import expenses from '../fixtures/expenses'

// Pass middlewares inside configureStore method
const middlewares = [thunk]
const createMockStore = configureMockStore(middlewares)
const uid = 'thisIsMyFakeUid'
const defaultAuthState = { auth: { uid } }

beforeEach((done) => {
	const expensesData = {}

	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt }
	})

	database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
	const action = removeExpense({ id: '123-abc' })
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123-abc'
	})
})

test('should remove expenses from database', (done) => {
	const store = createMockStore(defaultAuthState) // Create fake store with fake uid
	const id = expenses[0].id

	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions()

		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		})

		return database.ref(`users/${uid}/expenses/${id}`).once('value')
	})
	.then((snapshot) => {
		// fetching database.ref(`expenses/${id}`) will return `null` if the written expense is actually removed
		// We can thus expect it to be falsy
		expect(snapshot.val()).toBeFalsy()
		done()
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

test('should edit expense from Firebase', (done) => {
	const store = createMockStore(defaultAuthState) // Create fake store with fake uid
	const id = expenses[1].id
	const updates = {
		description: 'This is my new description'
	}

	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions()

		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		})

		// Fetch database, and expect the new description is actually updated
		return database.ref(`users/${uid}/expenses/${id}`).once('value')
	})
	.then((snapshot) => {
		expect(snapshot.val().description).toBe(updates.description)
		done()
	})
})

test('should setup add expense action object with provided values', () => {
	const expenseData = expenses[0] // Replaces old expense with a dummy one with ID, because firebase requires ID
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
	const store = createMockStore(defaultAuthState) // Create fake store with fake uid

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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
		done()
	})
})

test('should add expense with default to database and store', (done) => {
	// Set initial state
	const store = createMockStore(defaultAuthState) // Create fake store with fake uid
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

		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
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
	const store = createMockStore(defaultAuthState) // Create fake store with fake uid

	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions()

		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done()
	})
})