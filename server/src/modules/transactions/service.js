const {CREDIT, DEBIT} = require("./storage");

let lock = Promise.resolve();

module.exports = (storage) => {
    return {
        NEGATIVE_BALANCE_CODE: 10,

        async debit(change) {
            return new Promise((resolveTransaction, rejectTransaction) => {
                const previousLock = lock;
                lock = new Promise(async (resolveLock, rejectLock) => {
                    await previousLock;
                    const lastTx = await storage.getLast();
                    let balance = lastTx ? lastTx.balance : 0;
                    balance += change;
                    const tx = await storage.add({
                        type: DEBIT,
                        change,
                        balance,
                    });
                    resolveTransaction(tx);
                    resolveLock();
                });
            });
        },

        async credit(change) {
            return new Promise((resolveTransaction, rejectTransaction) => {
                const previousLock = lock;
                lock = new Promise(async (resolveLock, rejectLock) => {
                    await previousLock;
                    const lastTx = await storage.getLast();
                    let balance = lastTx ? lastTx.balance : 0;
                    balance -= change;
                    if (balance < 0) {
                        rejectTransaction(new Error('Unacceptable credit value'));
                        resolveLock();
                        return;
                    }
                    const tx = await storage.add({
                        type: CREDIT,
                        change,
                        balance,
                    });
                    resolveTransaction(tx);
                    resolveLock();
                });
            });
        },

        async fetchById(id) {
            await lock;
            const tx = await storage.getById(id);
            return Promise.resolve(tx);
        },

        async fetchAll() {
            await lock;
            const txs = await storage.getAll();
            return Promise.resolve(txs);
        },

        async fetchBalance() {
            await lock;
            const lastTx = await storage.getLast();
            return lastTx ? lastTx.balance : null;
        }
    }
};
