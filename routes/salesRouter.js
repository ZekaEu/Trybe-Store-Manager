const express = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/', salesController.create);

salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.getById);

salesRouter.put('/:id', salesController.update);

salesRouter.delete('/:id', salesController.exclude);

module.exports = salesRouter;
