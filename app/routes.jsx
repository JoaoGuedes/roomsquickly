import React from 'react';
import {
    Router,
    Route,
    browserHistory,
    IndexRoute,
    IndexRedirect
} from 'react-router';
import { AppLayout } from 'components/layouts/App.jsx';
import AuctionListLayout from 'components/layouts/AuctionList.jsx';
import ActiveAuctionsLayout from 'components/layouts/ActiveAuctions.jsx';
import EndedAuctionsLayout from 'components/layouts/EndedAuctions.jsx';
import SingleAuctionLayout from 'components/layouts/SingleAuction.jsx';
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
                        <IndexRedirect to="/rooms/active"/>
                        <Route path="rooms" component={AuctionListLayout}>
                            <IndexRoute component={ActiveAuctionsLayout} />
                            <Route path="active" component={ActiveAuctionsLayout}/>
                            <Route path="ended" component={EndedAuctionsLayout}/>
                        </Route>
                        <Route path="room/:id" component={SingleAuctionLayout}/>
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
