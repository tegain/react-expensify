import uuid from "uuid";
import db from '../firebase/firebase'

/**
 *
 * SYNC process:
 * Component calls action generator
 * action generator returns object
 * component dispatches object
 * redux store changes
 *
 * ASYNC process:
 * component calls action generator
 * action generator returns function
 * component dispatches function (with middleware)
 * function runs (has the ability to dispatch other actions and do whatever it wants)
 */

/**
 * ADD_EXPENSE Action generator
 * @param description
 * @param note
 * @param amount
 * @param createdAt
 * @returns {{type: string, expense: {id: *, description: string, note: string, amount: number, createdAt: number}}}
 */
export const addExpense = (expense) => ({
	type: 'ADD_EXPENSE',
	expense
})

// Returned function only works because of redux-thunk middleware
export const startAddExpense = (expenseData = {}) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid
		// Define default values for expenseData
		const {
			description = '',
			note = '',
			amount = 0,
			createdAt = 0
		} = expenseData

		// Create new expense with provided value
		const expense = { description, note, amount, createdAt }

		// Push to Firebase
		// Push promise resolves gives access to the ref (and then its unique key)
		// Return the query as a promise (easier to test)
		return db.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
			dispatch(addExpense({
				id: ref.key,
				...expense
			}))
		})
	}
}

/**
 * REMOVE_EXPENSE Action generator
 * @param id
 * @returns {{type: string, id}}
 */
export const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

export const startRemoveExpense = ({ id } = {}) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid

		return db.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
			dispatch(removeExpense({ id }))
		})
	}
}

/**
 * EDIT_EXPENSE Action generator
 * @param id
 * @param updates
 * @returns {{type: string, id: *, updates: *}}
 */
export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})

export const startEditExpense = (id, updates) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid

		return db.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
			dispatch(editExpense(id, updates))
		})
	}
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
	type: 'SET_EXPENSES',
	expenses
})

export const startSetExpenses = () => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid

		return db.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
			const expenses = []

			snapshot.forEach((child) => {
				expenses.push({
					id: child.key,
					...child.val()
				})
			})

			dispatch(setExpenses(expenses))
		})
	}
}