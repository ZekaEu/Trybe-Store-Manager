const express = require('express');
const {
  getSales,
  getSaleById,
  registerSale,
  editSale,
} = require('../controllers/salesController');
const { checkProduct, checkProductQuantity } = require('../middlewares/validation');

const salesRouter = express.Router();

salesRouter.use(checkProduct, checkProductQuantity);

salesRouter.get('/', getSales);

salesRouter.get('/:id', getSaleById);

salesRouter.post('/', registerSale);

salesRouter.put('/:id', editSale);

module.exports = salesRouter;
