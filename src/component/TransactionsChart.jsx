import React from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts'

const TransactionsChart = ({ selectedCustomer, allTransactions }) => {
	const getChartData = () => {
		if (!selectedCustomer) return []

		const customerTransactions = allTransactions.filter(
			(transaction) =>
				transaction.customer_id.toString() === selectedCustomer,
		)

		const data = customerTransactions.reduce((acc, transaction) => {
			const date = transaction.date
			const amount = transaction.amount

			if (!acc[date]) {
				acc[date] = 0
			}

			acc[date] += amount
			return acc
		}, {})

		return Object.keys(data).map((date) => ({ date, amount: data[date] }))
	}

	return (
		selectedCustomer && (
			<LineChart
				width={500}
				height={300}
				data={getChartData()}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="amount"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		)
	)
}

export default TransactionsChart
