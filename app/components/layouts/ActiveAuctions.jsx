import React from 'react';
import AuctionItem from '../AuctionItem.jsx';

const ActiveAuctionsLayout = React.createClass({

    contextTypes: {
        setActiveTab: React.PropTypes.func
    },

    _fetch() {
        const url = '/api/1';
        fetch(`${url}/rooms/active`)
            .then((data) => {
                return data.json();
            })
            .then((json) => {
                this.setState({ collection: json });
            })
            .catch((err) => console.log(err));
    },

    componentWillMount() {
        this._fetch();
    },

    componentDidMount() {
        this.context.setActiveTab('active');
        this._interval = setInterval(this._fetch, 5000);
    },

    componentWillUnmount() {
        clearInterval(this._interval);
    },

    getInitialState() {
        return {
            collection: []
        };
    },

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                this.state.collection.map((item, index) => <AuctionItem key={index} data={item} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ActiveAuctionsLayout;