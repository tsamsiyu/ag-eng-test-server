const transactions = { };

let lastTransaction = transactions[4];

module.exports = {
    DEBIT: 'DEBIT',
    CREDIT: 'CREDIT',

    async add(tx) {
        const lastTx = await this.getLast();
        const id = lastTx ? lastTx.id + 1 : 0;
        lastTransaction = {id, ...tx};
        transactions[id] = lastTransaction;
        return lastTransaction;
    },
    async getAll() {
        return Object.values(transactions);
    },
    async getById(id) {
        return transactions[id];
    },
    async getLast() {
        return lastTransaction;
    }
};
