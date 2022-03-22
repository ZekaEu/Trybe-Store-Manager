const productsService = require('../services/productsService');
const salesService = require('../services/salesService');

const minusQuantity = (req, res, next) => {
  try {
    const sale = req.body;
    sale.forEach(async ({ productId, quantity }) => {
      await productsService.minusQuantity(productId, quantity);
    });
    next();
  } catch (e) {
    next(e);
  }
};

const plusQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    if (!sale) return next();
    sale.forEach(async ({ productId, quantity }) => {
      await productsService.plusQuantity(productId, quantity);
    });
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  minusQuantity,
  plusQuantity,
};
