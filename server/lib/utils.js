
export const enrichAuctions = (auctions) => {
    return auctions.map((auction) => {

        const start = Date.now() - (Math.random() * 10).toFixed(0) * 60*1000,
            end = start + 10*60*1000;
        return {
            ...auction,
            end,
            start
        };
    });
};
