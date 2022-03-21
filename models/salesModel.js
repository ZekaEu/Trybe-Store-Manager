const connection = require('./connection');

const serialize = (data) => ({
  saleId: data.sale_id,
  productId: data.product_id,
  quantity: data.quantity,
  date: data.date,
});

const getAll = async () => {
  const [sales] = await connection.execute(
    `SELECT p.*, s.date
    FROM StoreManager.sales_products AS p
    JOIN StoreManager.sales AS s
    ON s.id = p.sale_id
    ORDER BY p.sale_id, p.product_id;`,
    );
  return sales.map(serialize);
};

const getById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT p.product_id, p.quantity, s.date 
    FROM StoreManager.sales_products AS p
    JOIN StoreManager.sales AS s
    ON s.id = p.sale_id
    WHERE p.sale_id = ?;`,
    [id],
  );
  if (!sale.length) return null;
  return sale.map(serialize);
};

const create = async (salesArr) => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW());',
  );
  await salesArr.forEach((s) => connection.execute(
    `INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES(?, ?, ?);`,
    [sale.insertId, s.productId, s.quantity],
  ));

  return {
    id: sale.insertId,
    itemsSold: salesArr,
  };
};

const update = async (saleArr, id) => {
  const [sale] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ? WHERE sale_id = ?;`,
    [saleArr[0].productId, saleArr[0].quantity, id],
  );
  return {
    saleId: sale.insertId,
    itemUpdated: saleArr,
  };
};

const exclude = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
