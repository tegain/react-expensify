import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expensesActions'
import { setTextFilter } from './actions/filtersActions'
import getVisibleExpenses from './selectors/expensesSelectors'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()
store.dispatch(addExpense({ description: 'Water bill', amount: '7000', createdAt: 1000 }))
store.dispatch(addExpense({ description: 'Gas bill', amount: '8000', createdAt: 800 }))
store.dispatch(addExpense({ description: 'Electricity bill', amount: '3000', createdAt: 3000 }))
store.dispatch(addExpense({ description: 'Internet bill', amount: '5000', createdAt: 1500 }))

// store.dispatch(setTextFilter('bill'))

const state = store.getState()
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses)

/**
 *  Provides the store to all the components
 *  Must be used in order to use connect() in hierarchy components
 */
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))