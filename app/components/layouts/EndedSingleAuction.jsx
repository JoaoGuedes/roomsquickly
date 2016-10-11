import React from 'react';
import BidList from '../BidList.jsx';

const EndedSingleAuction = (props) => {

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

EndedSingleAuction.propTypes = {
    data: React.PropTypes.object
};

export default EndedSingleAuction;
