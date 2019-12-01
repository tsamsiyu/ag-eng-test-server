import transactionResource from '../../resources/transactions';
import {
    buildAction,
    getFailType,
    getFullfillType,
    getPendingType,
    LOAD_TRANSACTION_BY_ID,
    LOAD_TRANSACTIONS
} from "../constants";

export const loadTransactions = () => {
    return async (dispatch) => {
        dispatch(buildAction(getPendingType(LOAD_TRANSACTIONS)));
        try {
            const txs = await transactionResource.getAll();
            dispatch(buildAction(getFullfillType(LOAD_TRANSACTIONS), txs));
        } catch (e) {
            dispatch(buildAction(getFailType(LOAD_TRANSACTIONS), e.message));
        }
    };
};

export const loadTransactionById = (id) => {
    return async (dispatch) => {
        dispatch(buildAction(getPendingType(LOAD_TRANSACTION_BY_ID)));
        try {
            const tx = await transactionResource.getById(id);
            dispatch(buildAction(getFullfillType(LOAD_TRANSACTION_BY_ID), tx));
        } catch (e) {
            dispatch(buildAction(getFailType(LOAD_TRANSACTION_BY_ID), e.message));
        }
    };
};
