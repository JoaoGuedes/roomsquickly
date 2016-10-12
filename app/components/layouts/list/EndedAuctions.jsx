import React from 'react';
import { _fetch } from '../../helpers/api';
import AuctionItem from '../../AuctionItem.jsx';
import EmptyList from '../../EmptyList.jsx';
import ErrorLayout from '../Error.jsx';

const EndedAuctionsLayout = React.createClass({

    contextTypes: {
        setActiveTab: React.PropTypes.func
    },

    _getAuctions() {
        const url = '/api/1';
        _fetch(`${url}/rooms/ended`)
            .then((state) => {
                const { error, data = [] } = state;
                this.setState({
                    error,
                    collection: data
                });
            });
    },

    componentDidMount() {
        this.context.setActiveTab('ended');
        const url = '/api/1';
        this._getAuctions();
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
                        <div className="col-sm-12">
                            {
                                collection.length > 0 ?
                                    collection.map((item, index) => <AuctionItem key={index} data={item}/>) :
                                    <EmptyList/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default EndedAuctionsLayout;
