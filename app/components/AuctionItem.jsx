import React from 'react';
import { Link } from 'react-router';

const formatDate = (date) => {
    return `${date.toLocaleTimeString()} on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

const AuctionItem = (props) => {

    if (props.data.active) {

        let {
            data: {
                id, image, name, location,
                remaining: { minutes, seconds }
            }
        } = props;

        return (
            <div className="col-md-4">
                <div className="thumbnail">
                    <img className="img-rounded" src={image} />
                    <div className="caption text-center">
                        <h1><Link to={`/room/${id}`}>{name}</Link></h1>
                        <span className="glyphicon glyphicon-map-marker"></span>
                        <span> {props.data.location}</span>
                        <h2>{`${minutes}:${seconds}`}</h2>
                        <p>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    let {
        data: {
            image, name, location, end, winning_bid
        }
    } = props;

    return (
        <div className="col-md-4">
            <div className="thumbnail">
                <img className="img-rounded" src={props.data.image} />
                <div className="caption text-center">
                    <h1><Link to={`/room/${id}`}>{name}</Link></h1>
                    <span className="glyphicon glyphicon-map-marker"></span>
                    <span> {props.data.location}</span>
                    <p>{props.data.winning_bid ? props.data.winning_bid.value : 'No winners' }</p>
                    <p>Ended at {formatDate(new Date(end))}</p>
                    <p><a href="#" className="btn btn-warning" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                </div>
            </div>
        </div>
    );
};

AuctionItem.propTypes = {
    data: React.PropTypes.shape({
        id          : React.PropTypes.string,
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

export default AuctionItem;
