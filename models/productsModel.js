const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return products;
};

const getById = async (id) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  if (!products.length) return null;
  return products[0];
};

const create = async ({ name, quantity }) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  const [product] = await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;',
    [name, quantity, id],
  );
  return {
    id: product.insertId,
    name,
    quantity,
  };
};

const exclude = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );
};

const minusQuantity = async (id, quantity) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET quantity = quantity - ?
    WHERE id = ?;`,
    [quantity, id],
  );
};

const plusQuantity = async (id, quantity) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET quantity = quantity + ?
    WHERE id = ?;`,
    [quantity, id],
  );
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
