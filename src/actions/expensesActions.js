import uuid from "uuid";

/**
 * ADD_EXPENSE Action generator
 * @param description
 * @param note
 * @param amount
 * @param createdAt
 * @returns {{type: string, expense: {id: *, description: string, note: string, amount: number, createdAt: number}}}
 */
export const addExpense = (
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

/**
 * REMOVE_EXPENSE Action generator
 * @param id
 * @returns {{type: string, id}}
 */
export const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

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