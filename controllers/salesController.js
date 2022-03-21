const salesService = require('../services/salesService');

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesService.getAll();
    res.status(200).json(sales);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sale);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const salesArr = [...req.body];
    const newSales = await salesService.create(salesArr);
    res.status(201).json(newSales);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const salesArr = [...req.body];
    const { id } = req.params;
    const newSale = await salesService.update(salesArr, id);
    if (!newSale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(newSale);
  } catch (e) {
    next(e);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await salesService.exclude(id);
    if (!result) return res.status(404).json({ message: 'Sale not found' });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
