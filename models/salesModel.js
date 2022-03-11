const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT p.*, s.date
    FROM StoreManager.sales_products AS p
    JOIN StoreManager.sales AS s
    ON s.id = p.sale_id
    ORDER BY p.sale_id, p.product_id;`,
    );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT p.product_id, p.quantity, s.date 
    FROM StoreManager.sales_products AS p
    JOIN StoreManager.sales AS s
    ON s.id = p.sale_id
    WHERE p.sale_id = ?;`,
    [id],
  );
  if (!result.length) return { code: 404, message: 'Sale not found' };
  return result;
};

module.exports = {
  getAll,
  getById,
};
