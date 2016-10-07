import React from 'react';
import { Link } from 'react-router';

const formatDate = (date) => {
    return `${date.toLocaleTimeString()} on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

const AuctionItemActive = (props) => {

    let {
        data: {
            id, image, name, location, bids,
            remaining: { minutes, seconds }
        }
    } = props;

    return (
        <div className="col-md-4">
            <div className="thumbnail">
                <Link to={`/room/${id}`}><img className="img-rounded" src={image} /></Link>
                <div className="caption text-center">
                    <h1>{name}</h1>
                    <span className="glyphicon glyphicon-map-marker"></span>
                    <small> {props.data.location}</small>
                    <h2>{`${minutes}:${seconds}`}</h2>
                    <span className={`label label-${ bids.length > 0 ? 'primary' : 'success' }`}>{ bids.length } bids</span>
                </div>
            </div>
        </div>
    );
};

AuctionItemActive.propTypes = {
    data: React.PropTypes.shape({
        id          : React.PropTypes.string,
        bids        : React.PropTypes.array,
        active      : React.PropTypes.bool,
        image       : React.PropTypes.string,
        name        : React.PropTypes.string,
        location    : React.PropTypes.string,
        remaining   : React.PropTypes.shape({
            minutes : React.PropTypes.string,
            seconds : React.PropTypes.string
        }),
        winning_bid : React.PropTypes.obj
    })
};

const AuctionItemEnded = (props) => {

    let {
        data: {
            id, image, name, location, end, winning_bid, bids
        }
    } = props;

    return (
        <div className="col-md-4">
            <div className="thumbnail">
                <Link to={`/room/${id}`}><img className="img-rounded" src={image} /></Link>
                <div className="caption text-center">
                    <h1>{name}</h1>
                    <div className="location-winner-box">
                        <span className="glyphicon glyphicon-map-marker"></span>
                        <small> {location}</small>
                        <p>
                            <span className={`glyphicon glyphicon-star${ winning_bid ? '' : '-empty'}`}></span>
                            <small> { winning_bid ? winning_bid.value : 'No winners' }</small>
                        </p>
                    </div>
                    <p><small>Ended at {formatDate(new Date(end))}</small></p>
                    <span className="label">{ bids.length } bids</span>
                </div>
            </div>
        </div>
    );
};

AuctionItemEnded.propTypes = AuctionItemActive.propTypes;

const AuctionItem = (props) => {

    if (props.data.active) {
        return <AuctionItemActive data={props.data}/>;
    }
    return <AuctionItemEnded data={props.data}/>;
};

AuctionItem.propTypes = {
    data: React.PropTypes.obj
};

export default AuctionItem;
