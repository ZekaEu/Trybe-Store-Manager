const express = require('express');
const {
  getProducts,
  getProductById,
  registerProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/productsController');
const {
  checkName,
  checkChar,
  checkLength,
  checkQuantity,
  checkValue,
  checkProduct,
  checkProductQuantity,
} = require('../middlewares/validation');

const productsRouter = express.Router();

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductById);

productsRouter.use(
  checkName,
  checkChar,
  checkLength,
  checkQuantity,
  checkValue,
  checkProduct,
  checkProductQuantity,
  );

productsRouter.post('/', registerProduct);

productsRouter.put('/:id', editProduct);

productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;
