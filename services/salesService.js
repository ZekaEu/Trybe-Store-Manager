const { getAll, getById } = require('../models/salesModel');

const serialize = (data) => ({
  saleId: data.sale_id,
  productId: data.product_id,
  quantity: data.quantity,
  date: data.date,
});

const getSalesArr = async () => {
  const result = await getAll();
  const salesArr = result.map((data) => (serialize(data)));
  return salesArr;
};

const getSalesById = async (id) => {
  const result = await getById(id);
  if (result.length) {
    const saleById = result.map((data) => (serialize(data)));
    return saleById;
  }
  return result;
};

module.exports = {
  getSalesArr,
  getSalesById,
};
