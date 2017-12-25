import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'

let wrapper, total, count

beforeEach(() => {
	total = 1750
	count = 1
	wrapper = shallow(<ExpensesSummary expensesTotal={total} expensesCount={count} />)
})

test('should render ExpensesSummary correctly with one expense', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary correctly with multiple expenses', () => {
	wrapper.setProps({ 'expensesCount': 3 })
	expect(wrapper).toMatchSnapshot()
})