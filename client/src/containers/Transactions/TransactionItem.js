import {connect} from 'react-redux'
import {loadTransactionById} from "../../store/transactions/actions";
import TransactionItem from "../../components/Transactions/TransactionItem";

const mapStateToProps = state => {
    return {
        transaction: state.transactions.item,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTransaction: (id) => dispatch(loadTransactionById(id)),
    };
};

const TransactionsItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransactionItem);

export default TransactionsItemContainer
