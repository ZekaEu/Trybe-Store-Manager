const express = require('express');
const {
  getSales,
  getSaleById,
  registerSale,
  editSale,
} = require('../controllers/salesController');
const { checkProduct, checkProductQuantity } = require('../middlewares/validation');

const salesRouter = express.Router();

salesRouter.get('/', getSales);

salesRouter.get('/:id', getSaleById);

salesRouter.use(checkProduct, checkProductQuantity);

salesRouter.post('/', registerSale);

salesRouter.put('/:id', editSale);

module.exports = salesRouter;
