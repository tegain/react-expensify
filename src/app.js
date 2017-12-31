import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expensesActions'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css'
import './firebase/firebase'

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

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'))

// When fetching data from database is finished, display the app instead of loading message
store.dispatch(startSetExpenses()).then(() => {
	ReactDOM.render(jsx, document.getElementById('root'))
})

