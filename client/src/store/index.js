import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import transactions from './transactions/reducer';
import { createLogger } from 'redux-logger'

const logger = createLogger({
    collapsed: true,
});

const rootReducer = combineReducers({
    transactions,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
