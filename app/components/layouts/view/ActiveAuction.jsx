import React from 'react';
import { _fetch } from '../../helpers/api';
import BidForm from '../../BidForm.jsx';
import BidList from '../../BidList.jsx';
import Message from '../../Message.jsx';

const ActiveAuction = React.createClass({

    propTypes: {
        data: React.PropTypes.object
    },

    componentDidMount() {
        this._installIntervals();
    },

    componentWillUnmount() {
        this._clearIntervals();
    },

    _installIntervals() {
        this._syncAuctionLoop = setInterval(this._getAuction, 5000);
        this._updateTimeLoop = setInterval(() => {
            const now = new Date(Date.now() > this.state.end ? 0 : this.state.end - Date.now());
            const data = {
                ...this.state,
                remaining: {
                    minutes: `${now.getMinutes() < 10 ? 0 : ''}${now.getMinutes()}`,
                    seconds: `${now.getSeconds() < 10 ? 0 : ''}${now.getSeconds()}`
                }
            };
            this.setState(data);
        }, 500);
    },

    _clearIntervals() {
        [this._syncAuctionLoop, this._updateTimeLoop].forEach((interval) => clearInterval(interval));
    },

    _getAuction() {
        return _fetch(`/api/1/room/${this.state.id}`)
            .then((state) => {
                this.setState(state);

                if (!state.active) {
                    this._clearIntervals();
                }
            });
    },

    getInitialState() {
        return Object.assign({}, this.props.data);
    },

    onBid(event, value) {
        const url = '/api/1';
        fetch(`${url}/room/${this.state.id}/bid`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value })
        })
            .then((data) => {
                if (!data.ok) {
                    return data.json()
                        .then((data) => ({
                            error: 'Invalid bid',
                            success: ''
                        }));
                }
                let message = 'Bid id <strong>%id%</strong> with value <strong>%value% ฿</strong> has been placed';
                return data.json()
                    .then((data) => ({
                        error: '',
                        success: message.replace('%id%', data.bid_id).replace('%value%', data.value)
                    }));
            })
            .then((data) => {
                this.setState({ ...this.state, ...data });
            })
            .catch((err) => console.log(err));
    },

    render() {
        let { image, bids, highestBid, name, active, success, error } = this.state;

        return (
            <div>
                <div className="container text-center">

                    {/* BID FORM */}
                    <BidForm data={this.state} onBid={this.onBid}/>

                    {/* BID LIST */}
                    <BidList data={ bids } active={ true } winner={highestBid}/>

                    {/* SUCCESS MESSAGES */}
                    { success ? <Message className="alert alert-success" message={success}/> : '' }

                    {/* ERRORS */}
                    { error ? <Message className="alert alert-danger" message={error}/> : '' }

                </div>
            </div>
        );
    }
});

export default ActiveAuction;
