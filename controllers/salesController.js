const {
  getSalesArr,
  getSalesById,
  createSale,
  updateSale,
} = require('../services/salesService');

const getSales = async (_req, res, next) => {
  try {
    const result = await getSalesArr();
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getSalesById(+id);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const registerSale = async (req, res, next) => {
  try {
    const saleArray = [...req.body];
    const result = await createSale(saleArray);
    return res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

const editSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const saleArray = [...req.body];
    const result = await updateSale(id, saleArray);
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getSales,
  getSaleById,
  registerSale,
  editSale,
};
