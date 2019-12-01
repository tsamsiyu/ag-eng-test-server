import React, {useEffect} from 'react';
import {
    Link
} from "react-router-dom";

function TransactionsList({transactions, isTransactionsFailed, isTransactionsPending, loadTransactions}) {

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    return (
        <div className="row">
            <div className="col">
                {isTransactionsPending && (<div>
                    Loading...
                </div>)}
                {isTransactionsFailed && (<div>
                    Internal error occurred
                </div>)}
                {!isTransactionsFailed && (<table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx.id}>
                            <th scope="row">
                                <Link to={`/transactions/${tx.id}`}>{tx.id}</Link>
                            </th>
                            <td>{tx.type}</td>
                            <td>{tx.balance}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>)}
            </div>
        </div>
    );
}

export default TransactionsList;
