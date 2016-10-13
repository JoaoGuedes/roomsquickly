import test from 'tape-catch';
import nconf from 'nconf';
import sinon from 'sinon';
import MockRepository from '@/unit/mocks/repository.room';
import MockPresenter from '@/unit/mocks/presenter.room';
import Interactor from '~/interactors/rooms';

let repoSpy, presentSpy, interactor, sandbox,
    repository = new MockRepository(),
    presenter = new MockPresenter();

const before = () => {
    nconf.file('./server/config.json');
    sandbox = sinon.sandbox.create();
};

const beforeEach = () => {
    interactor = new Interactor({
        repository,
        presenter
    });
};

const afterEach = () => {
    sandbox.restore();
};

before();

test('Interactor.getOne', (t) => {
    beforeEach();
    t.plan(3);
    repoSpy = sandbox.spy(repository, 'getById'),
    presentSpy = sandbox.spy(presenter, 'present');

    let id = 1;
    interactor.getOne({ id })
        .then((room) => {
            t.deepEqual(room, { id: 1 }, 'should return correct room');
            t.true(repoSpy.calledWith(id), 'should call repository with correct argument');
            t.true(presentSpy.calledWith([{ id: 1 }]), 'should call presenter with correct value');
        })
        .catch((err) => t.fail(err))
        .finally(() => afterEach());
});

test('Interactor.getAll', (t) => {
    beforeEach();
    t.plan(3);
    const rooms = [{ id: 1 }, { id: 2 }, { id: 3 }],
        repoSpy = sandbox.spy(repository, 'getAll'),
        presentSpy = sandbox.spy(presenter, 'present');

    interactor.getAll()
        .then((data) => {
            t.deepEqual(rooms, data, 'should return all rooms');
            t.true(repoSpy.called, 'should call repository.getAll()');
            t.true(presentSpy.calledWith(rooms), 'should call presenter with correct value');
        })
        .catch((err) => t.fail(err))
        .finally(() => afterEach());
});

test('Interactor.getActive', (t) => {
    beforeEach();
    t.plan(3);
    const rooms = [{ id: 1 }, { id: 2 }, { id: 3 }],
        repoSpy = sandbox.spy(repository, 'getAll'),
        presentSpy = sandbox.spy(presenter, 'presentActive');

    interactor.getActive()
        .then((data) => {
            t.deepEqual(rooms, data, 'should return all rooms');
            t.true(repoSpy.called, 'should call repository.getAll()');
            t.true(presentSpy.calledWith(rooms), 'should call presenter with correct value');
        })
        .catch((err) => t.fail(err))
        .finally(() => afterEach());
});

test('Interactor.getEnded', (t) => {
    beforeEach();
    t.plan(3);
    const rooms = [{ id: 1 }, { id: 2 }, { id: 3 }],
        repoSpy = sandbox.spy(repository, 'getAll'),
        presentSpy = sandbox.spy(presenter, 'presentEnded');

    interactor.getEnded()
        .then((data) => {
            t.deepEqual(rooms, data, 'should return all rooms');
            t.true(repoSpy.called, 'should call repository.getAll()');
            t.true(presentSpy.calledWith(rooms), 'should call presenter with correct value');
        })
        .catch((err) => t.fail(err))
        .finally(() => afterEach());
});

test('Interactor.bid', (t) => {
    beforeEach();
    t.plan(2);
    const repoSpy = sandbox.spy(repository, 'bid'),
        presentSpy = sandbox.spy(); //not used

    interactor.bid({ id: 1, value: 100 })
        .then((bid) => {
            t.deepEqual(bid, { id: 1, value: 100 }, 'should return correct bid');
            t.true(repoSpy.called, 'should call repository.bid()');
        })
        .catch((err) => t.fail(err))
        .finally(() => afterEach());
});
