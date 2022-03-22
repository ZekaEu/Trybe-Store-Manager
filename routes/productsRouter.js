const express = require('express');
const productsController = require('../controllers/productsController');
const validationMiddleware = require('../middlewares/validation');

const productsRouter = express.Router();

productsRouter.post(
  '/',
  validationMiddleware.checkName,
  validationMiddleware.nameCheck,
  validationMiddleware.checkQuantity,
  productsController.create,
);

productsRouter.get('/', productsController.getAll);

productsRouter.get('/:id', productsController.getById);

productsRouter.put(
  '/:id',
  validationMiddleware.checkName,
  validationMiddleware.checkQuantity,
  productsController.update,
);

productsRouter.delete('/:id', productsController.exclude);

module.exports = productsRouter;
