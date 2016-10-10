import React from 'react';
import { Link } from 'react-router';
import Jumbo from '../Jumbo.jsx';
import Empty from '../EmptyList.jsx';

const ActiveAuction = (props) => {
    let _bid;
    return (
        <div>
            <h3>{`${ props.data.remaining.minutes }:${ props.data.remaining.seconds }`}</h3>
            <form className="form-inline" onSubmit={(event) => props.onBid(event, _bid.value)}>
              <div className="form-group">
                <input type="text" ref={(input) => _bid = input} className="form-control" placeholder="Search"/>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};

ActiveAuction.propTypes = {
    data: React.PropTypes.object.isRequired,
    onBid: React.PropTypes.func.isRequired
};

const EndedAuction = (props) => {
    return (<div></div>);
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

                        if (!this.state.active) {
                            clearInterval(this._updateTimeLoop);
                        }

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
                }
            });
    },

    componentWillUnmount() {
        [this._syncAuctionLoop, this._updateTimeLoop].forEach((interval) => clearInterval(interval));
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
                    return { error: 'Invalid bid' };
                }
                return data.json();
            })
            .then((data) => {
                this.setState({
                    ...this.state,
                    ...data
                });
            })
            .catch((err) => console.log(err));
    },

    render() {
        let { image, name, location, bids, minimum_bid } = this.state;

        if (this.state.error === 404) {
            return (<Empty/>);
        }

        return (
            <div>
                <ol className="breadcrumb">
                    <li><Link to="/rooms">List</Link></li>
                    <li className="active">{name}</li>
                </ol>
                <img src={ image }/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 text-center">
                            <h1>{ name }</h1>
                            <span className="glyphicon glyphicon-map-marker"></span> { location }
                            <span className="glyphicon glyphicon-map-marker"></span> { minimum_bid }
                            { this.state.error ? <div className="alert alert-danger">
                              <strong>{ this.state.error }</strong>
                            </div> : '' }
                            <ul>
                            { bids.map((bid, index) => <li key={index}>{bid.value}</li>) }
                            </ul>
                            { this.state.active ? <ActiveAuction data={this.state} onBid={this.onBid}/> : <EndedAuction data={this.state}/> }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default SingleAuctionLayout;
