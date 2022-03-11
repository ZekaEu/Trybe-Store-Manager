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

productsRouter.post('/', checkName,
checkChar,
checkLength,
checkQuantity,
checkValue,
checkProduct,
checkProductQuantity,
registerProduct);

productsRouter.put('/:id', checkName,
checkChar,
checkLength,
checkQuantity,
checkValue,
checkProduct,
checkProductQuantity,
editProduct);

productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;
