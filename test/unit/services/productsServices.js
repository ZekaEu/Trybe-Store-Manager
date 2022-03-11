const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Testando ProductService', () => {
  describe('Conecta ao DB corretamente', () => {
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

    const getByIdResults =   {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };

    const serviceResults = [
      {
        "id": 1,
        "name": "Martelo de Thor",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
        "quantity": 20
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América",
        "quantity": 30
      }
    ];

    const serviceResultsById = {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10
    };

    const expected404 = { code: 404, message: 'Product not found' };

    describe('Quando os produtos são listados com sucesso', () => {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves(getAllResults);
      })

      after(() => {
        productsModel.getAll.restore();
      });

      it('Retorna um objeto com code 200 os produtos listados', async () => {
        const response = await productsService.getProductsArr();

        expect(response).to.be.deep.equal(serviceResults);
      })
    })
    describe('Quando o produto chamado por id é listado com sucesso', () => {
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(getByIdResults);
      })

      after(() => {
        productsModel.getById.restore();
      });

      it('Retorna um objeto com code 200 e a informação do produto', async () => {
        const response = await productsService.getProductsById(testId);

        expect(response).to.be.deep.equal(serviceResultsById);
      })
    })
    describe('Quando o produto chamado por id não existe', () => {
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(null);
      })

      after(() => {
        productsModel.getById.restore();
      });

      it('Retorna um objeto com code 400 e objeto serviceResultsByIdFail', async () => {
        const response = await productsService.getProductsById(fakeId);

        expect(response).to.be.deep.equal(expected404);
      });
    });
  });
});
