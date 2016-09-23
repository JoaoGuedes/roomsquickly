import nconf from 'nconf';
import uuid from 'uuid';
import _ from 'lodash';
import Promise from 'bluebird';
import HTTPError from '~/lib/errors';

const MINIMUM_BID       = nconf.get('MINIMUM_BID'),
    MINUTE              = 1000*60,
    DEFAULT_LOCATION    = 'Bogota, Colombia',
    DEFAULT_ROOM_NAME   = 'Untitled Room',
    DEFAULT_ROOM_IMAGE  = 'https://penang.equatorial.com/wp-content/uploads/sites/9/2015/06/2016-09-02_hep_deluxe_room-400x200.jpg';

export default class Repository {

    constructor({ seed }) {
        this._seed  = seed;
        this._rooms = [];
    }

    create({
        id          = uuid.v4(),
        name        = DEFAULT_ROOM_NAME,
        image       = DEFAULT_ROOM_IMAGE,
        start       = Date.now(),
        location    = DEFAULT_LOCATION,
        minimum_bid = MINIMUM_BID,
        bids        = []
    }) {
        return new Promise((resolve, reject) => {

            if (start < Date.now()) {
                return reject(new HTTPError('Auction date cannot be in the past').BadRequest());
            }

            const duration = nconf.get('AUCTION_DURATION_IN_MINUTES'),
                end = start + (duration * MINUTE),
                newRoom = { id, name, image, start, end, location, minimum_bid, bids };

            this._rooms.push(newRoom);
            resolve(newRoom);
        });

    }

    getAll() {
        return new Promise((resolve) => resolve(this._rooms));
    }

    getOne(id) {
        return new Promise((resolve, reject) => {

            if (!id) {
                return reject(new HTTPError('Missing ID').BadRequest());
            }

            return resolve(_.chain(this._rooms)
                .filter((room) => room.id === id)
                .first()
                .value());
        });
    }

    update({ id, bid, ...values }) {
        return this.getOne(id)
            .then((room) => {
                if (!room) {
                    throw new HTTPError('Room not found').NotFound();
                }
                if (bid) {
                    if (bid < room.minimum_bid) {
                        throw new HTTPError(`Invalid bid. Minimum value must be ${room.minimum_bid}`).BadRequest();
                    }

                }
                room = {
                    ...room,
                    ...values
                };

            });
    }

        /*return new Promise((resolve, reject) => {
            if (!id) {
                return reject(new HTTPError('Missing ID').BadRequest());
            }
            if (value < MINIMUM_BID) {
                return reject(new HTTPError(`Bid must be superior to ${MINIMUM_BID} Thai Bahts`).BadRequest());
            }
            return this.update({ id, ))
        });*/
}
