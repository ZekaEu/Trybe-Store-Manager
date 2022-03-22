const sinon = require('sinon');
const { expect } = require('chai');
const Model = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('SALES SERVICE', () => {
  const getAllResponse = [
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 1,
        "quantity": 5,
        "saleId": 1
    },
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 2,
        "quantity": 10,
        "saleId": 1
    },
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 3,
        "quantity": 15,
        "saleId": 2
    }
  ];

  const getByIdResponse = [
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 1,
        "quantity": 5
    },
    {
        "date": "2022-03-15T21:20:07.000Z",
        "productId": 2,
        "quantity": 10
    }
  ];

  describe('Função getAll', () => {
    before(() => {
      sinon.stub(Model, 'getAll').resolves(getAllResponse);
    });

    after(() => {
      Model.getAll.restore();
    });

    it('Retorna um array de objetos', async () => {
      const sales = await salesService.getAll();
      expect(sales).to.be.an('array');
      expect(sales).to.not.be.empty;
      sales.forEach((e) => expect(e).to.be.an('object'));
    });
  });

  describe('Função getById', () => {
    before(() => {
      sinon.stub(Model, 'getById').resolves(getByIdResponse);
    });

    after(() => {
      Model.getById.restore();
    });

    it('Retorna um array de objetos', async () => {
      const sale = await salesService.getById();
      expect(sale).to.be.an('array');
      expect(sale).not.to.be.empty;
      sale.forEach((e) => expect(e).to.be.an('object'));
    });
  });
});
