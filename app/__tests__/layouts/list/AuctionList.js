import React from 'react';
import {
    Router,
    Route,
    createMemoryHistory,
    IndexRoute,
    IndexRedirect
} from 'react-router';
import { shallow, mount } from 'enzyme';
import AuctionListLayout from '../../../components/layouts/list/AuctionList.jsx';
import ActiveAuctionsLayout from '../../../components/layouts/list/ActiveAuctions.jsx';
import EndedAuctionsLayout from '../../../components/layouts/list/EndedAuctions.jsx';

describe('List layouts', () => {

    it('contains spec with an expectation', function(done) {
        const layout = mount(
            <Router history={createMemoryHistory()}>
                <Route path="/" component={AuctionListLayout}/>
                <Route path="/rooms/active" component={ActiveAuctionsLayout}/>
                <Route path="/rooms/ended" component={EndedAuctionsLayout}/>
            </Router>);

        layout.find('#activeTab').simulate('click');
        setTimeout(() => {
            console.log(layout.html());
            done();
            //expect();
        }, 2000);
    });

});
