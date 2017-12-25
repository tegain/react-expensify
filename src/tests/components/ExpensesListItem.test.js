import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import ExpensesListItem from '../../components/ExpensesListItem'

test('should render <ExpensesListItem/> correctly', () => {
	const wrapper = shallow(<ExpensesListItem {...expenses[0]} />)
	expect(wrapper).toMatchSnapshot()
})