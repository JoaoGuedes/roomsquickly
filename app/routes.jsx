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

const Routes = React.createClass({
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={AppLayout}>
                    <IndexRedirect to="/rooms/active"/>
                    <Route path="rooms" component={AuctionListLayout}>
                        <IndexRedirect to="/rooms/active"/>
                        <Route path="active" component={ActiveAuctionsLayout}/>
                        <Route path="ended" component={EndedAuctionsLayout}/>
                    </Route>
                    <Route path="room/:id" component={SingleAuctionLayout}/>
                </Route>
                <Route path="*">
                    <IndexRedirect to="/"/>
                </Route>
            </Router>
        );
    }
});

export default Routes;
