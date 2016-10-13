import test from 'tape-catch';
import _ from 'lodash';
import nconf from 'nconf';
import { enrichAuctions } from '~/lib/utils';
import seed from '~/test/unit/fixtures/rooms';
import Presenter from '~/presenters/rooms';
import HTTPError from '~/lib/errors';

let presenter;

const before = () => {
    nconf.file('./server/config.json');
};

const beforeEach = () => {
    presenter = new Presenter();
};

before();

test('Presenter.present', (t) => {
    beforeEach();
    t.plan(3);
    const NOW = Date.now();
    const room = {
        active: true,
        start: NOW,
        end: NOW + 10 * 60 * 1000,
        bids: [{ id: 1 }, { id: 2 }]
    };
    let [result] = presenter.present([room], NOW);
    t.equal(result.remaining.minutes, '10', 'minutes should be correct');
    t.equal(result.remaining.seconds, '00', 'seconds should be correct');
    t.deepEqual(result.bids, [{ id: 2 }, { id: 1 }], 'bids should be reversed');
});

test('Presenter.presentActive', (t) => {
    beforeEach();
    t.plan(2);
    let clone = enrichAuctions(_.cloneDeep(seed));
    clone.forEach((auction) => auction.active = true);

    let result = presenter.presentActive(clone);
    t.equal(result.length, clone.length, 'should return correct number of active auctions');
    let sortingFlag;
    for (let i=0; i<result.length-1; i++) {
        const a = `${result[i].remaining.minutes}${result[i].remaining.seconds}`,
            b = `${result[i+1].remaining.minutes}${result[i+1].remaining.seconds}`;
        sortingFlag = a <= b;
        if (!sortingFlag) {
            break;
        }
    }

    t.equal(sortingFlag, true, 'items should be correctly sorted');
});

test('Presenter.presentEnded', (t) => {
    beforeEach();
    t.plan(1);
    let [head, second, ...rest] = _.cloneDeep(seed);
    head.active = false;
    second.active = false;
    rest.forEach((item) => item.active = true);
    let result = presenter.presentEnded([head,second,...rest]);
    t.equal(result.length, 2, 'should return correct number of ended auctions');
});
