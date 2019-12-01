const action = require('../../safeAction');

const createController = (txService) => {
    const create = action(async (req, res) => {
        const {type, change} = req.body;
        const validChange = parseInt(change);
        if (Number.isNaN(validChange) || validChange < 0) {
            res.status(400);
            await res.json({message: 'Invalid transaction change'});
            return;
        }
        if (type !== 'DEBIT' && type !== 'CREDIT') {
            res.status(400);
            await res.json({message: 'Invalid transaction type'});
            return;
        }
        try {
            let tx;
            if (type === 'DEBIT') {
                tx = await txService.debit(change);
            } else if (type === 'CREDIT') {
                tx = await txService.credit(change);
            }
            await res.json(tx);
        } catch (e) {
            res.status(400);
            await res.json({message: e.message});
        }
    });

    const getAll = action(async (req, res) => {
        const txs = await txService.fetchAll();
        return res.json(Object.values(txs));
    });

    const getById = action(async (req, res) => {
        const tx = await txService.fetchById(req.params.id);
        if (!tx) {
            res.status(404);
            res.send();
            return;
        }
        return res.json(tx);
    });

    return {
        create,
        getAll,
        getById,
    };
};


module.exports = createController;
