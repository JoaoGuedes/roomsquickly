import Promise from 'bluebird';

export default class Interactor {

    constructor({ repository, presenter }) {
        this._repository = repository;
        this._presenter = presenter;
    }

    create(rooms) {
        const promises = rooms.map((room) => this.repository.create(room));
        return Promise.all(promises)
            .then((rooms) => this.presenter.present(rooms));
    }

    getOne({ id }) {
        return this.repository.getById(id)
            .then((rooms) => this.presenter.present(rooms))
            .then(([head]) => head);
    }

    getAll() {
        return this.repository.getAll()
            .then((rooms) => this.presenter.present(rooms));
    }

    getActive() {
        return this.repository.getAll()
            .then((rooms) => this.presenter.presentActive(rooms));
    }

    getEnded() {
        return this.repository.getAll()
            .then((rooms) => this.presenter.presentEnded(rooms));
    }

    bid({ id, value }) {
        return this.repository.bid({ id, value });
    }

    isBidIDWinner({ bid_id }) {
        return this.repository.getAll()
            .then((rooms) => this.presenter.present(rooms))
            .then((filtered) => filtered.filter((room) => {
                const isWinner = room.highestBid ? room.highestBid.bid_id.toUpperCase() === bid_id.toUpperCase() : false;
                return !room.active && isWinner;
            }))
            .then(([head]) => head);
    }

    get repository() {
        return this._repository;
    }

    get presenter() {
        return this._presenter;
    }

}
