import { useState } from 'react';
import Pagination from './Pagination';
import PropTypes from 'prop-types';

const Transactions = ({ transactions_data }) => {
  const itemsPerPage = 5;
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = transactions_data.filter(data => {
    const transactionDate = new Date(data.transaction_date);
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return (!fromDate || transactionDate >= from) && (!toDate || transactionDate <= to);
  });

  
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handleFromDateChange = event => {
    setFromDate(event.target.value);
    setCurrentPage(1);
  };

  const handleToDateChange = event => {
    setToDate(event.target.value);
    setCurrentPage(1);
  };

  const onPageChange = page => {
    setCurrentPage(page);
  };

  return (
    <div className="transactions">
      <h3 className="text-center text-light">Transactions</h3>
      <form className="transaction-form row container" onSubmit={e => e.preventDefault()}>
        <div className="mb-3 col">
          <label htmlFor="from" className="form-label">
            From:
          </label>
          <input type="date" className="form-control" value={fromDate} onChange={handleFromDateChange} />
        </div>
        <div className="mb-3 col">
          <label htmlFor="to" className="form-label">
            To:
          </label>
          <input type="date" className="form-control" value={toDate} onChange={handleToDateChange} />
        </div>
      </form>
      <table className="table text-center table-striped">
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>Transaction Type</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.length === 0 ? (
            <tr>
              <td colSpan="3">No transactions found.</td>
            </tr>
          ) : (
            currentTransactions.map((data, index) => (
              <tr key={index}>
                <td>{data.transaction_date}</td>
                <td>{data.transaction_type}</td>
                <td>
                  <i className="fa-solid fa-indian-rupee-sign"></i> {data.transaction_amount}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="transaction-footer">
        <button type="button" onClick={window.print} className="btn btn-secondary mb-3">
          Print
        </button>
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
        )}
      </div>
    </div>
  );
};

Transactions.propTypes = {
  transactions_data: PropTypes.array.isRequired,
};

export default Transactions;
