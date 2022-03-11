const { getSalesArr, getSalesById } = require('../services/salesService');

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

module.exports = {
  getSales,
  getSaleById,
};
