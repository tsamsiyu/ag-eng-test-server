import {getFailType, getFullfillType, getPendingType, LOAD_TRANSACTION_BY_ID, LOAD_TRANSACTIONS} from "../constants";

const initialState = {
    list: [],
    item: null,
    pending: false,
    failed: false,
    message: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case getPendingType(LOAD_TRANSACTIONS):
        case getPendingType(LOAD_TRANSACTION_BY_ID):
            return {...state, pending: true, failed: false};
        case getFullfillType(LOAD_TRANSACTIONS):
            return {...state, list: action.payload, pending: false, failed: false};
        case getFullfillType(LOAD_TRANSACTION_BY_ID):
            return {...state, item: action.payload, pending: false, failed: false};
        case getFailType(LOAD_TRANSACTIONS):
        case getFailType(LOAD_TRANSACTION_BY_ID):
            return {...state, message: action.payload, pending: false, failed: true};
        default:
            return state;
    }
};
