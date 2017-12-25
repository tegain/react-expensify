import getExpensestotal from '../../selectors/expensesTotalSelectors'
import expenses from '../fixtures/expenses'

// should return 0 if no expenses
test('should return 0 if no expenses', () => {
	const total = getExpensestotal()
	expect(total).toBe(0)
})

// should correctly add up a single expense
test('should correctly add up a single expense', () => {
	const total = getExpensestotal([expenses[0]])
	expect(total).toBe(195)
})


// should correctly add up multiple expenses
test('should correctly add up multiple expenses', () => {
	const total = getExpensestotal(expenses)
	expect(total).toBe(2070)
})