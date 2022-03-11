const express = require('express');
const {
  getProducts,
  getProductById,
  registerProduct,
} = require('../controllers/productsController');
const { checkName } = require('../middlewares/validation');

const productsRouter = express.Router();

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductById);

productsRouter.post('/', checkName, registerProduct);

module.exports = productsRouter;
