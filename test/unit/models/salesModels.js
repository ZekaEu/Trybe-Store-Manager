const sinon = require('sinon');
const { expect } = require('chai');
const DB = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Testando salesModel', () => {
  describe('getAll() e getById funcionam corretamente', () => {
    const testId = '1';
    const fakeId = '9999';

    const getAllResults =     [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    const getByIdResults =   [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    const expected404 = { code: 404, message: 'Sale not found' };

    describe('Quando getAll() resolve:', () => {
      before(() => {
        const result = [getAllResults, []];
        sinon.stub(DB, 'execute').returns(result);
      })

      after(() => {
        DB.execute.restore();
      });

      it('Retorna um array com as vendas', async () => {
        const modelResults = await salesModel.getAll();

        expect(modelResults).to.be.an('array');
        expect(modelResults).to.be.deep.equal(getAllResults);
      })
    })
    describe('Quando getById() resolve:', () => {
      before(() => {
        const result = [getByIdResults, []];
        sinon.stub(DB, 'execute').resolves(result);
      })

      after(() => {
        DB.execute.restore();
      });

      it('Retorna somente a venda solicitada', async () => {
        const modelResults = await salesModel.getById(testId);

        expect(modelResults).to.be.a('array');
        expect(modelResults).to.be.deep.equal(getByIdResults);
      })
    })
    describe('Se o id passado não existe', () => {
      before(() => {
        const result = [[], []];
        sinon.stub(DB, 'execute').resolves(result);
      })

      after(() => {
        DB.execute.restore();
      });

      it('Retorna erro 404', async () => {
        const modelResults = await salesModel.getById(fakeId);

        expect(modelResults).to.be.deep.equal(expected404);
      });
    });
  });
});