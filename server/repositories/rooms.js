import nconf from 'nconf';
import uuid from 'uuid';
import _ from 'lodash';
import Promise from 'bluebird';
import HTTPError from '~/lib/errors';

/**
 * Defaults for Room
 */
const MINUTE            = 1000*60,
    DEFAULT_LOCATION    = 'Bogota, Colombia',
    DEFAULT_ROOM_NAME   = 'Untitled Room',
    DEFAULT_ROOM_IMAGE  = 'https://penang.equatorial.com/wp-content/uploads/sites/9/2015/06/2016-09-02_hep_deluxe_room-400x200.jpg';

const _isBidValid = ({ value, minimum }) => {
    if (value < minimum) {
        throw new HTTPError(`Invalid bid. Minimum value must be ${minimum}`).BadRequest();
    }
};

const _getAuctionExtension = ({ end, limit }) => {
    return ((end - Date.now()) < limit) ? 1*MINUTE : 0;
};

const _computeHighestBid = ({ room, bid }) => {
    if (_.isEmpty(room.bids)) {
        room.highestBid = bid;
    }
    else {
        if (bid.value > (room.highestBid.value * 1.05)) {
            room.highestBid = bid;
        }
    }
};

const _isRoomActive = ({ room }) => {
    const now = Date.now();
    return now >= room.start && now < room.end;
};

export default class Repository {

    /**
     * @constructor
     * Stores rooms in-memory
     * @param {Object} params
     * @param {Object[]} params.seed - seed data
     */
    constructor({ seed = [] }) {
        this._rooms = [];
        const promises = seed.map((room) => this.create(room));
        Promise.all(promises)
            .catch((err) => console.log(err));
    }

    /**
     * @desc Creates a new Room
     * @param {Object} params
     * @param {string} params.name - room name
     * @param {string} params.image - URL for room image
     * @param {Date} params.start - start date for auction (UTC), defaults to current time
     * @param {boolean} params.active - whether auction is active
     * @param {string} params.location - location of auction
     * @param {number} params.minimum_bid - minimum bid for this auction
     * @param {Object[]} params.bids - bids on this auction
     * @return {Promise} room - resolves with room if operation was successful, otherwise rejects with Error.
     */
    create({
        name        = DEFAULT_ROOM_NAME,
        image       = DEFAULT_ROOM_IMAGE,
        start,
        end,
        location    = DEFAULT_LOCATION,
        minimum_bid,
        bids        = []
    }) {
        return new Promise((resolve, reject) => {
            const NOW   = Date.now();
            start       = start || NOW;
            minimum_bid = minimum_bid || nconf.get('MINIMUM_BID');
            const duration = nconf.get('AUCTION_DURATION_IN_MINUTES'),
                finishTime = start + (duration * MINUTE);
            end = end || finishTime;  //Set duration of auction

            if (end < start) {
                return reject(new HTTPError('Auction end date cannot be before start date').BadRequest());
            }

            const newRoom = { id: uuid.v4(), name, image, start, end, location, minimum_bid, bids };
            newRoom.active = _isRoomActive({ room: newRoom });
            this._rooms.push(newRoom);
            resolve([newRoom]);
        });

    }

    getAll() {
        return new Promise((resolve) => {
            this._rooms.forEach((room) => {
                room.active = _isRoomActive({ room });
            });
            resolve(this._rooms);
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {

            if (!id) {
                return reject(new HTTPError('Missing ID').BadRequest());
            }

            const room = _.chain(this._rooms)
                .filter((room) => room.id === id)
                .first()
                .value();

            if (!room) {
                return reject(new HTTPError('Room not found').NotFound());
            }

            room.active = _isRoomActive({ room });
            return resolve([room]);
        });
    }

    bid({ id, value }) {
        return this.getById(id)
            .then(([room]) => { //Validations
                if (!room) {
                    throw new HTTPError('Room not found').NotFound();
                }
                if (!value) {
                    throw new HTTPError('Missing bid value').BadRequest();
                }
                if (!room.active) {
                    throw new HTTPError('Auction has already ended').BadRequest();
                }
                return room;
            })
            .then((room) => {   //Apply business rules
                _isBidValid({ value, minimum: room.minimum_bid });
                room.end += _getAuctionExtension({ end: room.end, limit: 1*MINUTE });

                const bid = {
                    bid_id: uuid.v4(),
                    value
                };

                _computeHighestBid({ room, bid });
                room.bids.push(bid);
                return [bid];
            });
    }

}
