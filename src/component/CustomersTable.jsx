import React from 'react'
import { Table } from 'antd'

const CustomersTable = ({ customers, transactions }) => {
	const mappedTransactions = transactions.map((transaction) => ({
		...transaction,
		customerName: customers.find(
			(customer) => customer.id === transaction.customer_id.toString(),
		)?.name,
	}))

	return (
		<Table
			dataSource={mappedTransactions}
			rowKey="id"
			pagination={{ pageSize: 10 }}
			loading={!customers.length || !transactions.length}>
			<Table.Column
				title="Customer Name"
				dataIndex="customerName"
				key="customerName"
			/>
			<Table.Column
				title="Transaction Amount"
				dataIndex="amount"
				key="amount"
			/>
			<Table.Column
				title="Transaction Date"
				dataIndex="date"
				key="date"
			/>
		</Table>
	)
}

export default CustomersTable
