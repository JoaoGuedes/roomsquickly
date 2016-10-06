import React from 'react';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import { AppLayout } from 'components/layouts/App.jsx';
import AuctionLayout from 'components/layouts/Auction.jsx';
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
                    <Route path="/" component={AppLayout}>
                        <IndexRoute component={AuctionLayout}/>
                    </Route>
                    <Route path="*">
                        <IndexRedirect to="/"/>
                    </Route>
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
