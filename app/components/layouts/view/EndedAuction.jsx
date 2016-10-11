import React from 'react';
import BidList from '../../BidList.jsx';

const EndedAuction = (props) => {

    let {
        data: {
            bids,
            highestBid
        }
    } = props;

    return (
        <div>
            <BidList data={bids} active={false} winner={highestBid}/>
        </div>
    );
};

EndedAuction.propTypes = {
    data: React.PropTypes.object
};

export default EndedAuction;
