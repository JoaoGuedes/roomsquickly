import React from 'react';

const BidForm = (props) => {
    let _bid;

    const onSubmit = (event, value) => {
        event.preventDefault();

        if (!value) {
            return;
        }

        props.onBid(event, _bid.value);
        _bid.value = '';
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
                    <div className="input-group" style={{ padding: '10px' }}>
                        <input type="number" ref={(input) => _bid = input} className="form-control" min={minimum_bid} placeholder={minimum_bid} />
                        <span className="input-group-addon">฿</span>
                    </div>
                    <button type="submit" className="form-control btn btn-primary">Bid</button>
                </div>
            </form>
        </div>
    );
};

BidForm.propTypes = {
    data: React.PropTypes.object.isRequired,
    onBid: React.PropTypes.func.isRequired
};

export default BidForm;
