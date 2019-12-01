export const buildAction = (type, payload) => {
    return {type, payload};
};

export const getPendingType = (type) => {
    return `${type}_PENDING`;
};

export const getFullfillType = (type) => {
    return `${type}_FULLFILL`;
};

export const getFailType = (type) => {
    return `${type}_FAIL`;
};

export const LOAD_TRANSACTIONS = 'LOAD_TRANSACTIONS';
export const LOAD_TRANSACTION_BY_ID = 'LOAD_TRANSACTION_BY_ID';
