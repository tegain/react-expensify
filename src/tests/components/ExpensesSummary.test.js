import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import { ExpensesSummary } from '../../components/ExpensesSummary'

let wrapper, total, count

beforeEach(() => {
	total = 1750
	count = 1
	wrapper = shallow(<ExpensesSummary total={total} count={count} />)
})

test('should render ExpensesSummary correctly with one expense', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary correctly with multiple expenses', () => {
	wrapper.setProps({ 'count': 3 })
	expect(wrapper).toMatchSnapshot()
})