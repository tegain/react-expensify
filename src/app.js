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