const { getAll, getById, postProduct } = require('../models/productsModel');

const getProductsArr = async () => {
  const products = await getAll();
  return products;
};

const getProductsById = async (ProductId) => {
  const products = await getById(ProductId);
  if (products === null) return null;
  return products;
};

const createProduct = async ({ name, quantity }) => {
  const newProduct = await postProduct({ name, quantity });
  const id = newProduct.insertId;

  return { id, name, quantity };
};

module.exports = {
  getProductsArr,
  getProductsById,
  createProduct,
};
