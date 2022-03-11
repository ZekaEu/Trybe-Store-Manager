const {
  getAll,
  getById,
  postProduct,
  putProduct,
  deleteProduct,
} = require('../models/productsModel');

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

const updateProduct = async ({ id, name, quantity }) => {
  const updatedProduct = await putProduct({ id, name, quantity });
  if (!updatedProduct.affectedRows) return { code: 404, message: 'Product not found' };
  return { id, name, quantity };
};

const excludeProduct = async (id) => {
  const result = await deleteProduct(id);
  if (!result.affectedRows) return { code: 404, message: 'Product not found' };
  return { code: 204 };
};

module.exports = {
  getProductsArr,
  getProductsById,
  createProduct,
  updateProduct,
  excludeProduct,
};
