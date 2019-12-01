import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {store} from './store';
import TransactionsList from "./containers/Transactions/TransactionsList";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import TransactionItem from "./containers/Transactions/TransactionItem";

function App() {
    return (
        <div className="container App">
            <Router>
                <Provider store={store}>
                    <Switch>
                        <Route path="/transactions" exact>
                            <TransactionsList/>
                        </Route>
                        <Route path="/transactions/:id">
                            <TransactionItem/>
                        </Route>
                        <Route path="/">
                            <Redirect
                                to={{
                                    pathname: "/transactions",
                                }}
                            />
                        </Route>
                    </Switch>
                </Provider>
            </Router>
        </div>
    );
}

export default App;
