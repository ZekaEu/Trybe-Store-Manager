const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.post('/', productsController.create);

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.exclude);

module.exports = productsRouter;
