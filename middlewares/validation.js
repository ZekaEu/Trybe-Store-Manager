const productsService = require('../services/productsService');

const checkName = (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const nameCheck = async (req, res, next) => {
  try {
    const { name } = req.body;
    const allProducts = await productsService.getAll();
    if (allProducts.some((data) => data.name === name)) {
      return res.status(409).json({ message: 'Product already exists' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const checkQuantity = (req, res, next) => {
  try {
    const { quantity } = req.body;
    if (!quantity && typeof quantity !== 'number') {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    if (quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const checkSales = (req, res, next) => {
  try {
    const [{ productId, quantity }] = req.body;
    if (!productId) return res.status(400).json({ message: '"productId" is required' });
    if (!quantity && typeof quantity !== 'number') {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const checkSaleQuantity = (req, res, next) => {
  try {
    const [{ quantity }] = req.body;
    if (quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkName,
  checkQuantity,
  checkSales,
  nameCheck,
  checkSaleQuantity,
};
