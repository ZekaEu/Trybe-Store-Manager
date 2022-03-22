const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const Model = require('../../../models/salesModel');

describe('SALES MODEL', () => {
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
      sinon.stub(connection, 'execute').resolves([getAllResponse, []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array de objetos', async () => {
      const sales = await Model.getAll();
      expect(sales).to.be.an('array');
      expect(sales).not.to.be.empty;
      sales.forEach((e) => expect(e).to.be.an('object'));
    });
  });

  describe('Função getById', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[getByIdResponse], []]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Retorna um array', async () => {
      const sale = await Model.getById();
      expect(sale).to.be.an('array');
    });
  });

  describe('Função exclude', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves();
    });

    after(() => {
      connection.execute.restore();
    })

    it('Chama connection.execute', async () => {
      await Model.exclude();
      expect(connection.execute.called).to.be.equal(true);
    });
  });
});
