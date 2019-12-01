const express = require('express');
const storage = require('./storage');
const createController = require('./controller');
const createService = require('./service');

const createModule = () => {
    const service = createService(storage);
    const controller = createController(service);
    const router = express.Router();
    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);

    return { service, router };
};

module.exports = createModule;
