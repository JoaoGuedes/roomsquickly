import React from 'react';
import {
    Router,
    Route,
    browserHistory,
    IndexRoute,
    IndexRedirect
} from 'react-router';
import { AppLayout } from 'components/layouts/App.jsx';
import AuctionLayout from 'components/layouts/Auction.jsx';
import ActiveAuctionsLayout from 'components/layouts/ActiveAuctions.jsx';
import AllAuctionsLayout from 'components/layouts/AllAuctions.jsx';
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
                        <IndexRedirect to="/rooms"/>
                        <Route path="rooms" component={AuctionLayout}>
                            <IndexRoute component={AllAuctionsLayout} />
                            <Route path="active" component={ActiveAuctionsLayout} />
                            {/*<Route path="ended" component={EndedAuctionsLayout}/>*/}
                        </Route>
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
