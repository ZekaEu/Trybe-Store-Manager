const {
  getProductsArr,
  getProductsById,
  createProduct,
  updateProduct,
  excludeProduct,
} = require('../services/productsService');

const getProducts = async (_req, res, next) => {
  try {
    const result = await getProductsArr();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getProductsById(+id);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const registerProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const result = await createProduct({ name, quantity });
    return res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const result = await updateProduct({ id, name, quantity });
    if (result.code) return res.status(result.code).json({ message: result.message });
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await excludeProduct(+id);
    if (result.code === 404) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(result.code).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProducts,
  getProductById,
  registerProduct,
  editProduct,
  deleteProduct,
};
