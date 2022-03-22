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
  const { id } = await Product.create({ name, quantity });
  return {
    id,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  const checkID = await Product.getById(id);
  if (!checkID) return false;
  const newProduct = await Product.update({ id, name, quantity });
  return newProduct;
};

const exclude = async (id) => {
  const checkID = await Product.getById(id);
  if (!checkID) return false;
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
