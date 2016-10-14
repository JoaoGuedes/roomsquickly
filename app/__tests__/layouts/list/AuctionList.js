import React from 'react';
import {
    Router,
    Route,
    createMemoryHistory,
    IndexRoute,
    IndexRedirect
} from 'react-router';
import { shallow, mount } from 'enzyme';
import { AppLayout } from 'components/layouts/App.jsx';
import AuctionListLayout from 'components/layouts/list/AuctionList.jsx';
import ActiveAuctionsLayout from 'components/layouts/list/ActiveAuctions.jsx';
import EndedAuctionsLayout from 'components/layouts/list/EndedAuctions.jsx';
import AuctionViewLayout from 'components/layouts/view/AuctionView.jsx';

//import 'whatwg-fetch';

describe('List layouts', () => {

    it('contains spec with an expectation', function(done) {
        fetch.mockResponseOnce(JSON.stringify([
                {
                    "name": "The Great Suite",
                    "image": "https://a0.muscache.com/im/pictures/24538580/7d4b34f6_original.jpg?aki_policy=xx_large",
                    "location": "Cambridge, UK",
                    "minimum_bid": 60
                },
                {
                    "name": "Le Grand Suite",
                    "image": "https://a2.muscache.com/im/pictures/d427eba7-0471-4d7d-943e-2fae8ec31466.jpg?aki_policy=xx_large",
                    "location": "Paris, FR",
                    "minimum_bid": 49
                },
                {
                    "name": "Biggest Room Ever",
                    "image": "https://a2.muscache.com/im/pictures/5798aa79-4db8-4ca1-92ef-08b0331bc721.jpg?aki_policy=xx_large",
                    "location": "New York, USA",
                    "minimum_bid": 17
                },
                {
                    "name": "Master's Lounge",
                    "image": "https://a0.muscache.com/im/pictures/111609039/c49a64f0_original.jpg?aki_policy=xx_large",
                    "location": "Venice, IT",
                    "minimum_bid": 26
                },
                {
                    "name": "O Grande Quarto",
                    "image": "https://a0.muscache.com/im/pictures/87623241/d350f755_original.jpg?aki_policy=xx_large",
                    "location": "Lisbon, PT",
                    "minimum_bid": 17
                },
                {
                    "name": "The King's Chamber",
                    "image": "https://a2.muscache.com/im/pictures/87623280/978e1e89_original.jpg?aki_policy=xx_large",
                    "location": "Celeryville, USA",
                    "minimum_bid": 34
                }
            ]));
        const layout = mount(<Router history={createMemoryHistory()}>
                        <Route path="/" component={AppLayout}>
                            <IndexRedirect to="/rooms/active"/>
                            <Route path="rooms" component={AuctionListLayout}>
                                <IndexRedirect to="/rooms/active"/>
                                <Route path="active" component={ActiveAuctionsLayout}/>
                                <Route path="ended" component={EndedAuctionsLayout}/>
                            </Route>
                            <Route path="room/:id" component={AuctionViewLayout}/>
                        </Route>
                        <Route path="*">
                            <IndexRedirect to="/"/>
                        </Route>
                    </Router>);
        layout.find('#activeTab').simulate('click');
        console.log(layout.html());
        done();
    });

});
