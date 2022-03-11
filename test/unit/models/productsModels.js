const sinon = require('sinon');
const { expect } = require('chai');
const DB = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testando ProductsModel', () => {
  describe('getAll() e getById() funcionam corretamente', () => {
    const testId = '1';
    const fakeId = '9999';

    const getAllResults =   [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      }
    ];

    const getByIdResults = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };

    const expected404 = { code: 404, message: 'Product not found' };

    describe('Quando getAll() resolve:', () => {
      before(() => {
        const result = [getAllResults, []];
        sinon.stub(DB, 'execute').resolves(result);
      })

      after(() => {
        DB.execute.restore();
      });

      it('Retorna um array com os produtos', async () => {
        const modelResults = await productsModel.getAll();

        expect(modelResults).to.be.an('array');
        expect(modelResults).to.be.deep.equal(getAllResults);
      })
    })
    describe('Quando getById() resolve:', () => {
      before(() => {
        const result = [[getByIdResults], []];
        sinon.stub(DB, 'execute').resolves(result);
      })

      after(() => {
        DB.execute.restore();
      });

      it('Retorna somente o produto solicitado', async () => {
        const modelResults = await productsModel.getById(testId);

        expect(modelResults).to.be.an('object');
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
        const modelResults = await productsModel.getById(fakeId);

        expect(modelResults).to.be.deep.equal(expected404);
      });
    });
  });
});
