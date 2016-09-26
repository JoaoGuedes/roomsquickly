import nconf from 'nconf';
import uuid from 'uuid';
import _ from 'lodash';
import Promise from 'bluebird';
import HTTPError from '~/lib/errors';

/**
 * Defaults for Room
 */
const MINIMUM_BID       = nconf.get('MINIMUM_BID'),
    MINUTE              = 1000*60,
    DEFAULT_LOCATION    = 'Bogota, Colombia',
    DEFAULT_ROOM_NAME   = 'Untitled Room',
    DEFAULT_ROOM_IMAGE  = 'https://penang.equatorial.com/wp-content/uploads/sites/9/2015/06/2016-09-02_hep_deluxe_room-400x200.jpg';

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
     * @param {string} params.id - room id, defaults to uuid
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
        id          = uuid.v4(),
        name        = DEFAULT_ROOM_NAME,
        image       = DEFAULT_ROOM_IMAGE,
        active      = true,
        start,
        end,
        location    = DEFAULT_LOCATION,
        minimum_bid = MINIMUM_BID,
        bids        = []
    }) {
        return new Promise((resolve, reject) => {
            const NOW = Date.now();
            start = start || NOW;

            if (start < NOW) {
                return reject(new HTTPError('Auction date cannot be in the past').BadRequest());
            }

            if (end < start) {
                return reject(new HTTPError('Auction end date cannot be before start date').BadRequest());
            }

            const duration = nconf.get('AUCTION_DURATION_IN_MINUTES'),
                finishTime = start + (duration * MINUTE);
            end = end || finishTime;  //Set duration of auction
            const newRoom = { id, name, image, start, end, location, minimum_bid, bids, active };

            this._rooms.push(newRoom);
            resolve(newRoom);
        });

    }

    refresh(collection) {
        return new Promise((resolve) => {
            const NOW = Date.now();

            collection.forEach((room) => {
                if (!room || !room.active) {
                    return;
                }
                if (room.end <= NOW) {
                    room.active = false;
                    return;
                }
                const current = new Date(room.end - NOW);
                room.current = {
                    minutes: current.getMinutes(),
                    seconds: current.getSeconds()
                };
            });

            resolve(collection);
        });
    }

    getAll() {
        return this.refresh(this._rooms);
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

            return this.refresh([room])
                .then((collection) => _.first(collection));
        });
    }

    update({ id, bid, ...values }) {
        return this.getById(id)
            .then((room) => {
                if (!room) {
                    throw new HTTPError('Room not found').NotFound();
                }
                if (bid && room.active) {
                    if (bid < room.minimum_bid) {
                        throw new HTTPError(`Invalid bid. Minimum value must be ${room.minimum_bid}`).BadRequest();
                    }
                    if ((room.end - Date.now()) < 1*MINUTE) {
                        room.end += 1*MINUTE;
                    }
                    this.refresh([room])
                        .then((room) => {
                            room.bids.push({
                                bid_id: uuid.v4(),
                                bid
                            });
                        });

                }
                room = {
                    ...room,
                    ...values
                };
                return room;
            });
    }

}
