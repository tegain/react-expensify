import moment from 'moment'

export default [
	{ id: 1, description: 'Rent', note: '', amount: 195, createdAt: 0 },
	// Use moment().subtract() and moment().add() because the selector uses a comparison by day
	{ id: 2, description: 'Gas bill', note: 'That\'s pretty expensive!', amount: 1050, createdAt: moment(0).subtract(4, 'days').valueOf() },
	{ id: 3, description: 'Internet bill', note: '', amount: 825, createdAt: moment(0).add(4, 'days').valueOf() },
]