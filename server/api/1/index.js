import Router from 'express';

import seed from '~/test/unit/fixtures/rooms';
import RoomsInteractor from '~/interactors/rooms';
import RoomsRepository from '~/repositories/rooms';
import RoomsPresenter from '~/presenters/rooms';

const interactor = new RoomsInteractor({
    repository: new RoomsRepository({ seed }),
    presenter: new RoomsPresenter()
});

interactor.create([
    {
        name: 'Lounge',
        image: 'http://www.motelcorpoealma.com.br/resources/images/galeria/_DSC3692.jpg',
        location: 'Porto, Portugal',
        minimum_bid: 10,
        start: Date.now(),
        end: Date.now() + 1000*60*0.5
    },
    {
        name: 'Presidential suite',
        image: 'http://www.mountfalcon.com/uploads/images/FullLengthImages/Small/Wall%20Pool%20Bedroom.NK_1.jpg',
        location: 'Lisbon, Portugal',
        minimum_bid: 100,
        start: Date.now() + 1000
    }
]);

export default Router({ mergeParams: true })
    .get('/rooms', (req, res, next) => {
        interactor.getAll()
            .then((rooms) => res.status(200).json(rooms))
            .catch((err) => next(err));
    })
    .get('/rooms/active', (req, res, next) => {
        interactor.getActive()
            .then((rooms) => res.status(200).json(rooms))
            .catch((err) => next(err));
    })
    .get('/rooms/ended', (req, res, next) => {
        interactor.getEnded()
            .then((rooms) => res.status(200).json(rooms))
            .catch((err) => next(err));
    })
    .get('/room/:id', (req, res, next) => {
        const id = req.params.id;
        interactor.getOne({ id })
            .then((room) => res.status(200).json(room))
            .catch((err) => next(err));
    });
