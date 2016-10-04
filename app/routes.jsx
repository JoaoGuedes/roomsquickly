import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { AppLayout } from 'components/App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const Routes = React.createClass({
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={AppLayout}/>
                    {/*<Route path="/orders" component={OrdersApp}>
                        <Route path=":id" component={Order}>
                            <Route path="edit" component={OrderEdit} />
                        </Route>
                    </Route>*/}
                </Router>
            </Provider>
        );
    }
});

export default Routes;
