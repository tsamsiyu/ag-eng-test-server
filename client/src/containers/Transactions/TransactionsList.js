import {connect} from 'react-redux'
import TransactionsList from "../../components/Transactions/TransactionsList";
import {loadTransactions} from "../../store/transactions/actions";

const mapStateToProps = state => {
    return {
        transactions: state.transactions.list,
        isTransactionsPending: state.transactions.pending,
        isTransactionsFailed: state.transactions.failed,
        transactionsError: state.transactions.message,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTransactions: () => dispatch(loadTransactions()),
    };
};

const TransactionsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionsList);

export default TransactionsListContainer
