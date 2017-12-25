import moment from 'moment'

/**
 * Needs State params
 *
 * @param expenses
 * @param text
 * @param sortBy
 * @param startDate
 * @param endDate
 * @returns {void|*|this}
 */
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	// Filter by text, startDate, and endDate
	return expenses.filter((expense) => {
		const createdAtMoment = moment(expense.createdAt)
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

		return startDateMatch && endDateMatch && textMatch
	}).sort((a, b) => {
		// Sort filtered expenses by date or amount
		// @doc: https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort
		// If the result is negative, 'a' comes first
		if (sortBy === 'date') {
			return (a.createdAt < b.createdAt) ? 1 : -1
		} else if (sortBy === 'amount') {
			return (a.amount < b.amount) ? 1 : -1
		}
	})
}

export default getVisibleExpenses