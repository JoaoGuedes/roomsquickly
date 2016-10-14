import React from 'react';
import { _fetch } from '../../helpers/api';
import AuctionItem from '../../AuctionItem.jsx';
import EmptyList from '../../EmptyList.jsx';
import ErrorLayout from '../Error.jsx';

const ActiveAuctionsLayout = React.createClass({

    contextTypes: {
        setActiveTab: React.PropTypes.func
    },

    _getAuctions() {
        const url = '/api/1';
        _fetch(`${url}/rooms/active`)
            .then((state) => {
                const { error, data = [] } = state;
                this.setState({
                    error,
                    collection: data
                });
            });
    },

    componentDidMount() {
        this.context.setActiveTab('active');
        this._getAuctions();
        this._syncAuctionLoop = setInterval(this._getAuctions, 5000);
        this._updateTimeLoop = setInterval(() => this.setState({
            collection: this.state.collection.map((item) => {
                let clone = { ...item };
                const now = new Date(Date.now() > clone.end ? 0 : clone.end - Date.now());
                clone.remaining.seconds = `${now.getSeconds() < 10 ? 0 : ''}${now.getSeconds()}`;
                clone.remaining.minutes = `${now.getMinutes() < 10 ? 0 : ''}${now.getMinutes()}`;
                return clone;
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
        let { error, collection = [] } = this.state;

        if (error) {
            return <ErrorLayout error={error} />;
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 activeAuctionItems">
                            {
                                collection.length > 0 ?
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
