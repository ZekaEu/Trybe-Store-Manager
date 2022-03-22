const express = require('express');
const salesController = require('../controllers/salesController');
const validationMiddleware = require('../middlewares/validation');

const salesRouter = express.Router();

salesRouter.post(
  '/',
  validationMiddleware.checkSales,
  validationMiddleware.checkSaleQuantity,
  salesController.create,
);

salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.getById);

salesRouter.put(
  '/:id',
  validationMiddleware.checkSales,
  validationMiddleware.checkSaleQuantity,
  salesController.update,
  );

salesRouter.delete('/:id', salesController.exclude);

module.exports = salesRouter;
