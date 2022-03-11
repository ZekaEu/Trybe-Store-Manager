const express = require('express');
const {
  getProducts,
  getProductById,
  registerProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/productsController');
const { checkName } = require('../middlewares/validation');

const productsRouter = express.Router();

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductById);

productsRouter.use(checkName);

productsRouter.post('/', registerProduct);

productsRouter.put('/:id', editProduct);

productsRouter.delete('/:id', deleteProduct);

module.exports = productsRouter;
