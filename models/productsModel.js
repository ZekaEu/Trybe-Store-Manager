const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return result;
};

const getById = async (ProductId) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [ProductId],
  );
  if (!result.length) return { code: 404, message: 'Product not found' };
  const { id, name, quantity } = result[0];
  return {
    id,
    name,
    quantity,
  };
};

const postProduct = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  postProduct,
};
