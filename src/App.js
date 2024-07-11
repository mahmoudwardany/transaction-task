import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomersTable from './component/CustomersTable';
import TransactionsChart from './component/TransactionsChart';
import FilterControls from './component/FilterControls';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await axios.get('https://mahmoudwardany.github.io/transaction-task//customers');
        const transactionResponse = await axios.get('https://mahmoudwardany.github.io/transaction-task//transactions');

        setCustomers(customerResponse.data);
        setTransactions(transactionResponse.data);
        setFilteredTransactions(transactionResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    const filtered = transactions.filter(transaction =>
      transaction.amount.toString().includes(value) ||
      customers.find(customer => customer.id === transaction.customer_id.toString())?.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomer(customerId);
    const filtered = transactions.filter(transaction => transaction.customer_id.toString() === customerId);
    setFilteredTransactions(filtered);
  };

  const handleResetFilters = () => {
    setSelectedCustomer(null);
    setFilteredTransactions(transactions);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Customer Transactions</h1>
      <FilterControls
        customers={customers}
        transactions={transactions}
        handleSearch={handleSearch}
        handleSelectCustomer={handleSelectCustomer}
        handleResetFilters={handleResetFilters}
        selectedCustomer={selectedCustomer}
      />
      <CustomersTable
        customers={customers}
        transactions={filteredTransactions}
      />
      <TransactionsChart
        transactions={filteredTransactions}
        selectedCustomer={selectedCustomer}
        allTransactions={transactions}
      />
    </div>
  );
};

export default App;
