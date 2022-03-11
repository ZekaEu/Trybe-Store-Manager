const { getAll, getById } = require('../models/productsModel');

const getProductsArr = async () => {
  const products = await getAll();
  return products;
};

const getProductsById = async (ProductId) => {
  const products = await getById(ProductId);
  if (products === null) return null;
  return products;
};

module.exports = {
  getProductsArr,
  getProductsById,
};
