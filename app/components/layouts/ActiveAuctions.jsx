import React from 'react';
import Auction from '../Auction.jsx';

export default class ActiveAuctionsLayout extends React.Component {

    componentDidMount() {
        const url = '/api/1';
        fetch(`${url}/rooms/active`)
            .then((data) => {
                return data.json();
            })
            .then((json) => {
                this.setState({ collection: json });
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {
                                this.state && this.state.collection ? this.state.collection.map((item, index) => <Auction key={index}/>) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
