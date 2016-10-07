import React from 'react';
import AuctionItem from '../AuctionItem.jsx';

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

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                this.state && this.state.collection ? this.state.collection.map((item, index) => <AuctionItem key={index} data={item}/>) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default EndedAuctionsLayout;
