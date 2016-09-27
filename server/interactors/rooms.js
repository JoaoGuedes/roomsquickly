import _ from 'lodash';
import HTTPError from '~/lib/errors';

export default class Interactor {

    constructor({ repository, presenter }) {
        this._repository = repository;
        this._presenter = presenter;
    }

    getActiveAuctions() {
        this.repository.getAll()
            .then((rooms) => this.presenter.present(rooms))
            .then((filtered) => filtered.filter((room) => room.active));
            //@todo sort by remaining bidding time
    }

    getPastAuctions() {
        this.repository.getAll()
            .then((rooms) => this.presenter.present(rooms))
            .then((filtered) => filtered.filter((room) => !room.active));
    }

    isBidIDWinner({ bid_id }) {
        this.repository.getAll()
            .then((rooms) => this.presenter.present(rooms))
            .then((filtered) => filtered.filter((room) => {
                const isWinner = room.highestBid ? room.highestBid.bid_id.toUpperCase() === bid_id.toUpperCase() : false;
                return !room.active && isWinner;
            }))
            .then((winners) => _.first(winners));
    }

    get repository() {
        return this._repository;
    }

    get presenter() {
        return this._presenter;
    }

}
