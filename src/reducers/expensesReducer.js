const expensesReducerDefaultState = []

/**
 * Expenses Reducer
 * @param state {Object}
 * @param action {Object}
 * @returns {*}
 */
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			]
		case 'REMOVE_EXPENSE':
			return state.filter(({ id }) => id !== action.id)
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

export default expensesReducer
