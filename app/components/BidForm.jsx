import React from 'react';

const BidForm = (props) => {
    let _bid;

    const onSubmit = (event, value) => {
        event.preventDefault();
        props.onBid(event, _bid.value);
        _bid.value = undefined;
    };

    let {
        data: {
            remaining: { minutes, seconds },
            minimum_bid
        }
    } = props;
    return (
        <div className="row" style={{ marginBottom: '30px' }}>
            <h3>{`${ minutes }:${ seconds }`}</h3>
            <form className="form-inline" onSubmit={(event) => onSubmit(event, _bid.value)}>
              <div className="form-group">
                <input type="number" ref={(input) => _bid = input} className="form-control" min={minimum_bid} placeholder={minimum_bid} />
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

export default BidForm;
