const express = require('express');
const action = require('../safeAction');
const createTxModule = require('./transactions');

const router = express.Router();

const txModule = createTxModule();

router.use('/transactions', txModule.router);

router.get('/', action(async (req, res) => {
    const balance = await txModule.service.fetchBalance();
    return res.json({balance});
}));

module.exports = router;
