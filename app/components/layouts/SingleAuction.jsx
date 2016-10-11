import React from 'react';
import { Link } from 'react-router';
import Jumbo from '../Jumbo.jsx';
import Empty from '../EmptyList.jsx';

const BidForm = (props) => {
    let _bid;
    return (
        <div className="row" style={{ marginBottom: '30px' }}>
            <h3>{`${ props.data.remaining.minutes }:${ props.data.remaining.seconds }`}</h3>
            <form className="form-inline" onSubmit={(event) => props.onBid(event, _bid.value)}>
              <div className="form-group">
                <input type="number" ref={(input) => _bid = input} className="form-control" placeholder={props.data.minimum_bid} />
              </div>
              <button type="submit" className="btn btn-success" style={{ marginLeft: '10px' }}>Bid</button>
            </form>
        </div>
    );
};

BidForm.propTypes = {
    data: React.PropTypes.object.isRequired,
    onBid: React.PropTypes.func.isRequired
};

const BidList = (props) => {

    let { data, winner } = props;

    return (
    <div className="row" style={{ marginTop: '30px' }}>
        <div className="col-sm-12">
            <div className="col-sm-4 col-center">
                <div className="panel panel-info">
                    <div className="panel-heading">Bids</div>
                    <table className="table">
                        <tbody>
                            { data
                                .map((bid, index) => {
                                    if (bid.bid_id === winner.bid_id) {
                                        return (
                                            <tr key={index} className="text-center active">
                                                <td>
                                                    <span className="glyphicon glyphicon-star sunflower-dark"></span>
                                                     &nbsp; { parseFloat(bid.value).toFixed(3) } ฿
                                                </td>
                                            </tr>);
                                    }
                                    else {
                                        return (
                                            <tr key={index} className="text-center">
                                                <td>{ parseFloat(bid.value).toFixed(3) } ฿</td>
                                            </tr>);
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>);
};

BidList.propTypes = {
    data: React.PropTypes.array,
    winner: React.PropTypes.object
};

const Message = (props) => {
    const { className, message } = props;
    return <div className={`${className} navbar-fixed-bottom`} dangerouslySetInnerHTML={{ __html: message }} />;
};

Message.propTypes = {
    className: React.PropTypes.string,
    message: React.PropTypes.string.isRequired
};

const SingleAuctionLayout = React.createClass({

    getInitialState() {
        return {};
    },

    propTypes: {
        params: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired
        })
    },

    _fetch() {
        const url = '/api/1';
        return fetch(`${url}/room/${this.props.params.id}`)
            .then((data) => {
                if (data.status === 404) {
                    return { error: 404 };
                }
                return data.json();
            })
            .then((state) => {
                this.setState(state);

                if (!state.active) {
                    this._clearIntervals();
                }

                return state;
            })
            .catch((err) => console.log(err));
    },

    componentDidMount() {
        this._fetch()
            .then((state) => {
                if (state.active) {
                    this._syncAuctionLoop = setInterval(this._fetch, 5000);
                    this._updateTimeLoop = setInterval(() => {
                        const now = new Date(Date.now() > this.state.end ? 0 : this.state.end - Date.now());
                        const data = {
                            remaining: {
                                minutes: `${now.getMinutes() < 10 ? 0 : ''}${now.getMinutes()}`,
                                seconds: `${now.getSeconds() < 10 ? 0 : ''}${now.getSeconds()}`
                            }
                        };
                        this.setState(data);
                    }, 500);
                }
            });
    },

    _clearIntervals() {
        [this._syncAuctionLoop, this._updateTimeLoop].forEach((interval) => clearInterval(interval));
    },

    componentWillUnmount() {
        this._clearIntervals();
    },

    getInitialState() {
        return {
            bids: []
        };
    },

    onBid(event, value) {
        event.preventDefault();
        const url = '/api/1';
        fetch(`${url}/room/${this.props.params.id}/bid`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value })
        })
            .then((data) => {
                if (!data.ok) {
                    return {
                        ...this.state,
                        error: 'Invalid bid',
                        success: ''
                    };
                }
                return data.json()
                        .then((bid) => {
                            return {
                                ...this.state,
                                success: `Bid id <strong>${bid.bid_id}</strong> with value <strong>${bid.value}฿</strong> has been placed`,
                                error: ''
                            };
                        });

            })
            .then((data) => {
                this.setState({ ...data });
            })
            .catch((err) => console.log(err));
    },

    render() {
        let { image, name, location, bids, minimum_bid, highestBid = {} } = this.state;

        if (this.state.error === 404) {
            return (<Empty/>);
        }

        return (
            <div>
                <ol className="breadcrumb">
                    <li><Link to="/rooms">List</Link></li>
                    <li className="active">{name}</li>
                </ol>
                <img src={ image } className="logo"/>
                <div className="container text-center">

                    {/* NAME, LOCATION AND MINIMUM BID */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div>
                                <h1>{ name }</h1>
                                <div>
                                    <p><span className="glyphicon glyphicon-map-marker"></span> { location }</p>
                                    <p><b>Minimum bid</b>: { minimum_bid } ฿</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BID FORM */}
                    { this.state.active ? <BidForm data={this.state} onBid={this.onBid}/> : '' }

                    {/* BID LIST */}
                    { bids.length > 0 ? <BidList data={this.state.bids} winner={this.state.highestBid}/> : '' }

                    {/* SUCCESS MESSAGES */}
                    { this.state.success ? <Message className="alert alert-success" message={this.state.success}/> : '' }

                    {/* ERRORS */}
                    { this.state.error ? <Message className="alert alert-danger" message={this.state.error}/> : '' }
                    
                </div>
            </div>
        );
    }
});

export default SingleAuctionLayout;
