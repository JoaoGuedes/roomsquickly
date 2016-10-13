import Promise from 'bluebird';

export default class MockRepository {

    create() {}

    getAll() {
        return new Promise((resolve) => resolve([{ id: 1 }, { id: 2 }, { id: 3 }]));
    }

    getById(id) {
        return new Promise((resolve) => resolve([{ id }]));
    }

    bid({ id, value }) {
        return new Promise((resolve) => resolve([{ id, value }]));
    }

}
