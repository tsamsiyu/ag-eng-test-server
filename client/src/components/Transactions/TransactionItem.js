import React, {useEffect} from 'react';
import {
    useParams,
    Link
} from "react-router-dom";


function TransactionItem({transaction, loadTransaction}) {

    const {id} = useParams();

    useEffect(() => {
        loadTransaction(id);
    }, [loadTransaction, id]);

    return (
        <div className="row">
            <div className="col">
                <Link to="/transactions">Back to transactions</Link>
                <br/>
                {transaction && (
                    <ul className="list-group">
                        <li className="list-group-item">Id: {transaction.id}</li>
                        <li className="list-group-item">Type: {transaction.type}</li>
                        <li className="list-group-item">Change: {transaction.change}</li>
                        <li className="list-group-item">Balance: {transaction.balance}</li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TransactionItem;
