import _ from 'lodash';

export default class Presenter {

    /**
     * @desc Formats output data to be consumed
     * Reverses the bid list to appear from last to first and computes the remaining time for auction end
     * @param {Object} data — room data
     * @param {Number} now - used for testing purposes, represents current time
     * @returns {Object[]} rooms
     */
    present(data, now) {
        if (_.isEmpty(data)) {
            return data;
        }
        const NOW = now || Date.now();
        return data.map((room) => {
            const bids = _.cloneDeep(room.bids || []).reverse();
            if (!room.active) {
                return { ...room, bids };
            }
            const current = new Date(room.end - NOW),
                remaining = {
                    minutes: `${current.getMinutes() < 10 ? 0 : '' }${current.getMinutes()}`,
                    seconds: `${current.getSeconds() < 10 ? 0 : '' }${current.getSeconds()}`
                };
            return {
                ...room,
                bids,
                remaining
            };
        });
    }

    /**
     * @desc Presents active rooms sorted by duration, i.e. auctions near ending appear first
     * @return {Object[]} rooms
     */
    presentActive(data) {
        return this.present(data)
                .filter((room) => room.active)
                .sort((a,b) => {
                    const durationA = a.remaining.minutes.toString() + a.remaining.seconds.toString(),
                        durationB   = b.remaining.minutes.toString() + b.remaining.seconds.toString();

                    return durationA > durationB;
                });
    }

    /**
     * @desc Presents ended rooms, i.e. rooms which aren't active
     * @return {Object[]} rooms
     */
    presentEnded(data) {
        return this.present(data).filter((room) => !room.active);
    }

}
