const productsService = require('../services/productsService');

const getAll = async (_req, res, next) => {
    try {
    const products = await productsService.getAll();
    res.status(200).json(products);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const allProducts = await productsService.getAll();
    if (allProducts.some((data) => data.name === name)) {
      return res.status(409).json({ message: 'Product already exists' });
    }
    const product = await productsService.create({ name, quantity });
    // if (!product) return res.status(409).json({ message: 'Product already exists' });
    res.status(201).json(product);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const newProduct = await productsService.update({ id, name, quantity });
    if (!newProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(newProduct);
  } catch (e) {
    next(e);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.exclude(id);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};
