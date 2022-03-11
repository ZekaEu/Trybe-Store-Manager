const { getProductsArr } = require('../services/productsService');

const checkName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const allProducts = await getProductsArr();
    if (allProducts.some((data) => data.name === name)) {
      return res.status(409).json({ message: 'Product already exists' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkName,
};
