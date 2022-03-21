const Sales = require('../models/salesModel');

const getAll = async () => {
  const sales = await Sales.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await Sales.getById(id);
  if (!sale) return null;
  return sale;
};

const create = async (salesArr) => {
  const sale = await Sales.create(salesArr);
  if (!sale) return null;
  return sale;
};

const update = async (saleArr, id) => {
  const sale = await Sales.getById(id);
  if (!sale) return null;
  const newSale = await Sales.update(saleArr, id);
  return newSale;
};

const exclude = async (id) => {
  const checkId = await Sales.getById(id);
  if (!checkId) return false;
  await Sales.exclude(id);
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
