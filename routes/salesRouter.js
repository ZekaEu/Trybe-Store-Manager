const express = require('express');
const { getSales, getSaleById } = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', getSales);

salesRouter.get('/:id', getSaleById);

module.exports = salesRouter;
