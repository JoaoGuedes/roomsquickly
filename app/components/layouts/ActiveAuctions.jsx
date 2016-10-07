import React from 'react';
import AuctionItem from '../AuctionItem.jsx';
import EmptyList from '../EmptyList.jsx';

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


    componentDidMount() {
        this.context.setActiveTab('active');
        this._fetch();
        this._syncAuctionLoop = setInterval(this._fetch, 5000);
        this._updateTimeLoop = setInterval(() => this.setState({
            collection: this.state.collection.map((item) => {
                const now = new Date(Date.now() > item.end ? 0 : item.end - Date.now());
                item.remaining.seconds = `${now.getSeconds() < 10 ? 0 : ''}${now.getSeconds()}`;
                item.remaining.minutes = `${now.getMinutes() < 10 ? 0 : ''}${now.getMinutes()}`;
                return item;
            })

        }), 500);
    },

    componentWillUnmount() {
        [this._syncAuctionLoop, this._updateTimeLoop].forEach((interval) => clearInterval(interval));
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
                                this.state.collection.length > 0 ?
                                    this.state.collection.map((item, index) => <AuctionItem key={index} data={item} />) :
                                    <EmptyList/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ActiveAuctionsLayout;
