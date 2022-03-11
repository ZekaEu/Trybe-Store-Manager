const {
  getAll,
  getById,
  postSale,
  putSale,
} = require('../models/salesModel');

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

const createQueryArray = (array) => {
  const matriz = array.map((data) => [data.productId, data.quantity]);
   let queryArray = [];
   for (let i = 0; i < matriz.length; i += 1) {
    queryArray = [...queryArray, ...matriz[i]];
   }
   return queryArray;
};

const createSale = async (productArray) => {
  const queryArray = createQueryArray(productArray);
  const result = await postSale(productArray, queryArray);
  return result;
};

const updateSale = async (id, productArray) => {
  const result = await putSale(id, productArray);
  return result;
};

module.exports = {
  getSalesArr,
  getSalesById,
  createSale,
  updateSale,
};
