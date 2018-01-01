import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import '../locales/fr'
import { Link } from 'react-router-dom'

const ExpensesListItem = ({ id, description, amount, createdAt, note }) => (
	<div className="expense-item">
		<Link to={`/edit/${id}`}>
			<div className="expense-item__content">
				<h3 className="expense-item__title">{description}</h3>
				<span className="expense-item__date">{moment(createdAt).format('Do MMMM YYYY')}</span>
				{
					(note) && (
						<p className="expense-item__note">
							{note}
						</p>
					)
				}
			</div>
			<span className="expense-item__amount">
				{numeral(amount / 100).format("0,0[.][00] $")}
			</span>
		</Link>
	</div>
)

export default ExpensesListItem