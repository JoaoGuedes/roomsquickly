export default class Interactor {

    constructor({ repository, presenter }) {
        this._repository = repository;
        this._presenter = presenter;
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
        return this.repository.bid({ id, value })
                .then(([head]) => head);
    }

    get repository() {
        return this._repository;
    }

    get presenter() {
        return this._presenter;
    }

}
