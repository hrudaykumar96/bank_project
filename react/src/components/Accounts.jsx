import { useState } from "react";
import { Link } from "react-router-dom";
import Transactions from "./Transactions";
import propTypes from "prop-types";
const Accounts = ({data}) => {
  const [transactions, setTransactions] = useState(false);
  const opentransactions = () => {
    setTransactions(true);
  };

  const closetransactions = () => {
    setTransactions(false);
  };

  const transactions_data=data.accounts.transactions;

  return (
    <div className="accounts">
      <h3 className="text-center text-light">account details</h3>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>account number</th>
            <th>account holder name</th>
            <th>account balance</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.accounts.account_number}</td>
            <td>{data.name}</td>
            <td>
              <i className="fa-solid fa-indian-rupee-sign"></i> {data.accounts.account_balance}
            </td>
            <td>
              {transactions ? (
                <Link className="view-transactions" onClick={closetransactions}>
                  Hide transactions
                </Link>
              ) : (
                <>
                  <Link
                    className="view-transactions"
                    onClick={opentransactions}
                  >
                    view transactions
                  </Link>
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {transactions && <Transactions transactions_data={transactions_data}/>}
    </div>
  );
};
Accounts.propTypes={
  data:propTypes.any
}
export default Accounts;