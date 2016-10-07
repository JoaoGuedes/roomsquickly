import React from 'react';
import AuctionItem from '../AuctionItem.jsx';
import EmptyList from '../EmptyList.jsx';

const EndedAuctionsLayout = React.createClass({

    contextTypes: {
        setActiveTab: React.PropTypes.func
    },

    componentDidMount() {
        this.context.setActiveTab('ended');
        const url = '/api/1';
        fetch(`${url}/rooms/ended`)
            .then((data) => {
                return data.json();
            })
            .then((json) => {
                this.setState({ collection: json });
            })
            .catch((err) => console.log(err));
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
                                    this.state.collection.map((item, index) => <AuctionItem key={index} data={item}/>) :
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
