import test from 'tape-catch';
import nconf from 'nconf';
import seed from '~/test/unit/fixtures/rooms';
import Repository from '~/repositories/rooms';
import HTTPError from '~/lib/errors';

let repo;

const before = () => {
    nconf.file('./server/config.json');
};

const beforeEach = () => {
    repo = new Repository({ seed });
};

before();

test('Repository.create', (t) => {
    beforeEach();
    t.plan(1);
    repo.create({ end: Date.now() - 10000 })
        .then(() => t.fail())
        .catch((err) => t.true(err instanceof HTTPError, 'should fail because auction end date is before start date'));
});

test('Repository.create', (t) => {
    beforeEach();
    t.plan(2);
    const duration = nconf.get('AUCTION_DURATION_IN_MINUTES');

    repo.create({})
        .then(([room]) => {
            const end = room.start + (duration * 1000*60);
            t.true(room, 'should create room');
            t.equal(room.end, end, 'end date should be correct');
        })
        .catch((err) => t.fail(err));
});

test('Repository.getAll', (t) => {
    beforeEach();
    t.plan(1);
    repo.getAll()
        .then((rooms) => {
            t.equal(rooms.length, seed.length, 'should return all rooms');
        })
        .catch((err) => t.fail(err));
});

test('Repository.getById', (t) => {
    beforeEach();
    t.plan(1);
    repo.getById()
        .then(() => t.fail())
        .catch((err) => t.true(err instanceof HTTPError, 'should fail when no ID was passed'));
});

test('Repository.getById', (t) => {
    beforeEach();
    t.plan(1);

    repo.create({ name: 'foo' })
        .then(([fooRoom]) => repo.getById(fooRoom.id))
        .then(([room]) => {
            t.equal(room.name, 'foo', 'should return correct room');
        })
        .catch((err) => t.fail(err));
});

test('Repository.bid', (t) => {
    beforeEach();
    t.plan(1);
    repo.create({ minimum_bid: 100 })
        .then(([room]) => repo.bid({
            id: room.id,
            value: 30
        }))
        .then(() => t.fail())
        .catch((err) => t.true(err instanceof HTTPError, 'should fail on invalid bid'));
});

test('Repository.bid', (t) => {
    beforeEach();
    t.plan(1);
    repo.bid({ id: 'foo', value: 30 })
        .then(() => t.fail())
        .catch((err) => t.true(err instanceof HTTPError, 'should fail on invalid room ID'));
});

test('Repository.bid', (t) => {
    beforeEach();
    t.plan(1);
    const duration = 2,
        now = Date.now(),
        end = now + (duration * 1000*60);

    repo.create({ end, minimum_bid: 100 })
        .then(([room]) => repo.bid({
            id: room.id,
            value: 105
        }))
        .then(([room]) => {
            t.equal(room.end, end, 'auction duration should remain the same');
        })
        .catch((err) => t.fail(err));
});

test('Repository.bid', (t) => {
    beforeEach();
    t.plan(1);
    const duration = 0.5, //Half minute
        now = Date.now(),
        end = now + (duration * 1000*60);

    repo.create({ end, minimum_bid: 100 })
        .then(([room]) => repo.bid({
            id: room.id,
            value: 105
        }))
        .then(([room]) => {
            const extendedTime = end + (1 * 1000*60);
            t.equal(room.end, extendedTime, 'should extend 1 minute on last minute of auction');
        })
        .catch((err) => t.fail(err));
});

test('Repository.bid', (t) => {
    beforeEach();
    t.plan(1);
    repo.create({ minimum_bid: 100 })
        .then(([room]) => repo.bid({
            id: room.id,
            value: 100
        }))
        .then(([room]) => repo.bid({
            id: room.id,
            value: 100
        }))
        .then(([room]) => repo.bid({
            id: room.id,
            value: 150
        }))
        .then(([room]) => {
            t.equal(room.highestBid.value, 150, '150 should be the highest bid');
        })
        .catch((err) => t.fail(err));
});

test('Repository.bid', (t) => {
    beforeEach();
    t.plan(1);
    repo.create({ minimum_bid: 100 })
        .then(([room]) => repo.bid({
            id: room.id,
            value: 100
        }))
        .then(([room]) => repo.bid({
            id: room.id,
            value: 100
        }))
        .then(([room]) => repo.bid({
            id: room.id,
            value: 150
        }))
        .then(([room]) => repo.bid({
            id: room.id,
            value: 155
        }))
        .then(([room]) => {
            t.equal(room.highestBid.value, 150, '150 should be the highest bid');
        })
        .catch((err) => t.fail(err));
});

test('Repository.bid', (t) => {
    beforeEach();
    t.plan(1);
    repo.create({ minimum_bid: 100 })
        .then(([room]) => repo.bid({
            id: room.id,
            value: 100
        }))
        .then(([room]) => repo.bid({
            id: room.id,
            value: 100
        }))
        .then(([room]) => repo.bid({
            id: room.id,
            value: 100
        }))
        .then(([room]) => {
            t.deepEqual(room.highestBid, room.bids[0], 'the first bid should be the highest');
        })
        .catch((err) => t.fail(err));
});
