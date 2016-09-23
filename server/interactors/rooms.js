
export default class Interactor {

    constructor({ repository, presenter }) {
        this._repository = repository;
        this._presenter = presenter;
    }

    getActiveAuctions() {
        this.repository.getAll()
            .then((rooms) => rooms.filter((room) => room.active))
            .then((filtered) => this.presenter.present(filtered));
    }

    getPastAuctions() {
        this.repository.getAll()
            .then((rooms) => rooms.filter((room) => !room.active))
            .then((filtered) => this.presenter.present(filtered));
    }


    get repository() {
        return this._repository;
    }

    get presenter() {
        return this._presenter;
    }

}
