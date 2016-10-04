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

    presentActive(data) {
        return this.present(data)
                .filter((room) => room.active)
                .sort((a,b) => {
                    const durationA = a.remaining.minutes.toString() + a.remaining.seconds.toString(),
                        durationB   = b.remaining.minutes.toString() + b.remaining.seconds.toString();

                    return durationA > durationB;
                });
    }

    presentEnded(data) {
        return this.present(data).filter((room) => !room.active);
    }

}
