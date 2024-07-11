import React from 'react'
import { Input, Select, Button } from 'antd'

const { Search } = Input
const { Option } = Select

const FilterControls = ({
	customers,
	transactions,
	handleSearch,
	handleSelectCustomer,
	handleResetFilters,
	selectedCustomer,
}) => {
	return (
		<div style={{ marginBottom: 20 }}>
			<Search
				placeholder="Search by name or amount"
				onSearch={handleSearch}
				style={{ width: 200, marginBottom: 20 }}
			/>
			<Select
				placeholder="Select a customer"
				style={{ width: 200, marginBottom: 20 }}
				onChange={handleSelectCustomer}
				value={selectedCustomer}
				allowClear>
				{customers.map((customer) => (
					<Option key={customer.id} value={customer.id}>
						{customer.name}
					</Option>
				))}
			</Select>
			<Button onClick={handleResetFilters}>Reset Filters</Button>
		</div>
	)
}

export default FilterControls
