const getExpensestotal = (expenses = []) => {
	return expenses
		.map((expense) => expense.amount)
		.reduce((total, curr) => total + curr, 0)
}

export default getExpensestotal