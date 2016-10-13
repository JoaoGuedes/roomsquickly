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

/**
 * @desc Evaluate whether bid value is above the minimum
 * @param {Object} params
 * @param {number} value - value of the bid
 * @param {number} minimum - minimum value to compare against
 * @return {HTTPError} error - if the bid was inferior to the minimum value
 */
const _isBidValid = ({ value, minimum }) => {
    if (value < minimum) {
        throw new HTTPError(`Invalid bid. Minimum value must be ${minimum}`).BadRequest();
    }
};

/**
 * @desc Returns time extension for an auction
 * @return {number} value - 1 minute if bid was placed on the last minute, otherwise 0
 */
const _getAuctionExtension = ({ end, limit }) => {
    return ((end - Date.now()) < limit) ? 1*MINUTE : 0;
};

/**
 * @desc Computes highest bid for a room
 * If bid was 1.05% of current highest bid or if there are no other bids
 */
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

/**
 * @desc Is room still active, i.e, is current time between [stard,end]
 * @returns {boolean} value - true if between [start,end], otherwise false
 */
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
     * @param {Date} [params.start = Date.now()] - start date for auction (UTC)
     * @param {Date} [params.end = DAte.now() + 10 minutes] - end date for auction (UTC)
     * @param {boolean} params.active - whether auction is active
     * @param {string} params.location - location of auction
     * @param {number} params.minimum_bid - minimum bid for this auction
     * @param {Object[]} params.bids - bids on this auction
     * @return {Promise<Object[]>} room - resolves with room if operation was successful, otherwise rejects with Error.
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

    /**
     * @desc Fetches all rooms.
     * The status of each room is updated to inactive if auction ended
     * @return {Promise<Object[]>} rooms - resolves with updated rooms
     */
    getAll() {
        return new Promise((resolve) => {
            this._rooms.forEach((room) => {
                room.active = _isRoomActive({ room });
            });
            resolve(this._rooms);
        });
    }

    /**
     * @desc Fetches one room by id.
     * The status of the room is updated to inactive if auction ended.
     * @param {string} id - id of the room to fetch
     * @return {Promise<Object[]>} room - resolves with room if found, or rejects if no ID was passed or room wasn't found
     */
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

    /**
     * @desc Pushes a new bid into an auction's bid list.
     * @param {Object} params
     * @param {string} params.id - id of the room to bid
     * @param {number} params.value - currency value of the bid
     * @return {Promise<Object[]>} bid — resolves with bid data on success, otherwise rejects
     */
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
                _isBidValid({ value, minimum: room.minimum_bid });                      //Is this bid above the minimum?
                room.end += _getAuctionExtension({ end: room.end, limit: 1*MINUTE });   //If less than one minute is remaining, extend by another minute

                const bid = {
                    bid_id: uuid.v4(),
                    value
                };

                _computeHighestBid({ room, bid });  //If this bid is a winner so far, update the room with that information
                room.bids.push(bid);
                return [bid];
            });
    }

}
