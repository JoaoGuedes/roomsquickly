import _ from 'lodash';

export default class Presenter {

    present(data) {
        if (_.isEmpty(data)) {
            return data;
        }
        const NOW = Date.now();
        return data.map((room) => {
            if (!room || !room.active) {
                return room;
            }
            if (room.end <= NOW) {
                return {
                    ...room,
                    active: false
                };
            }
            const current = new Date(room.end - NOW),
                remaining = {
                    minutes: current.getMinutes(),
                    seconds: current.getSeconds()
                };

            return {
                ...room,
                remaining
            };
        });
    }

}