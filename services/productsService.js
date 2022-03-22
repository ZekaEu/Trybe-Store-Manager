const Product = require('../models/productsModel');

const getAll = async () => {
  const products = await Product.getAll();
  return products;
};

const getById = async (id) => {
  const product = await Product.getById(id);
  if (!product) return null;
  return product;
};

const create = async ({ name, quantity }) => {
  const allProducts = await getAll();
  if (allProducts.some((data) => data.name === name)) {
    return false;
  }
  const { id } = await Product.create({ name, quantity });
  return {
    id,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  const newProduct = await Product.update({ id, name, quantity });
  return newProduct;
};

const exclude = async (id) => {
  await Product.exclude(id);
  return true;
};

const minusQuantity = async (id, quantity) => {
  await Product.minusQuantity(id, quantity);
};

const plusQuantity = async (id, quantity) => {
  await Product.plusQuantity(id, quantity);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
  minusQuantity,
  plusQuantity,
};
