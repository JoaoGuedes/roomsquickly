export default class Interactor {

    /**
     * @constructor
     * @param {Object} params
     * @param {Object} params.repository - injected repository
     * @param {Object} params.presenter - injected presenter
     */
    constructor({ repository, presenter }) {
        this._repository = repository;
        this._presenter = presenter;
    }

    /**
     * @desc
     * Fetches one room from repository and formats its output
     * @param {Object} params
     * @param {String} params.id - room id
     * @returns {Object} room formatted for consumption
     */
    getOne({ id }) {
        return this.repository.getById(id)
            .then((rooms) => this.presenter.present(rooms))
            .then(([head]) => head);
    }

    /**
     * @desc
     * Fetches all rooms from repository and formats their output
     * @returns {Object[]} rooms formatted for consumption
     */
    getAll() {
        return this.repository.getAll()
            .then((rooms) => this.presenter.present(rooms));
    }

    /**
     * @desc
     * Fetches all active rooms from repository and formats their output
     * @returns {Object[]} rooms formatted for consumption
     */
    getActive() {
        return this.repository.getAll()
            .then((rooms) => this.presenter.presentActive(rooms));
    }

    /**
     * @desc
     * Fetches all inactive rooms from repository and formats their output
     * @returns {Object[]} rooms formatted for consumption
     */
    getEnded() {
        return this.repository.getAll()
            .then((rooms) => this.presenter.presentEnded(rooms));
    }

    /**
     * @desc
     * Place bid on a room
     * @param {Object} params
     * @param {String} params.id - room id
     * @param {Number} params.value - bid value
     * @returns {Object} bid - bid with generated id and value
     */
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
