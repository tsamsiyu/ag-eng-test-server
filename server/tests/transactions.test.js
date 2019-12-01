const createTxService = require('../src/modules/transactions/service');
const storage = require('../src/modules/transactions/storage');

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const littleRandomDelay = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, getRandomInt(15, 100));
    });
};

const createDelayedStorage = () => {
    return {
        ...storage,
        async add(type, change) {
            await littleRandomDelay();
            return storage.add.call(this, type, change);
        },
        async getLast() {
            await littleRandomDelay();
            return storage.getLast.call(this);
        }
    }
};

test('transaction service should process write requests sequentially', async () => {
    const delayedStorage = createDelayedStorage();
    const txService = createTxService(delayedStorage);
    const mocks = [14, 29, -21, -1, 20, 20, 20, 16, 25, -38];
    await Promise.all(
        mocks.map((val) => {
            return val > 0 ? txService.debit(val) : txService.credit(val);
        })
    );
    const lastBalance = await txService.fetchBalance();
    const expectedSum = mocks.reduce((a, b) => b > 0 ? a + b : a - b, 0);
    expect(lastBalance).toBe(expectedSum);
});
