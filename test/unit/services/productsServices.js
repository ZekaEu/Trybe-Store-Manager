const sinon = require('sinon');
const { expect } = require('chai');
const Product = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

const getAllResponse = [
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

const testId = 1;

const createInput = { name: 'Cripta de Mana', quantity: 3 };

const getByIdResponse = [
  {
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10
  }
];

const excludeResponse = { affectedRows: 1 };

const fakeIdResponse = { affectedRows: 0 };

const createResponse = { insertId: 1 };

const fakeId = 9999;


describe('PRODUCTS SERVICE', () => {
  describe('Função getAll', () => {
    before(() => {
      sinon.stub(Product, 'getAll').returns(getAllResponse);
    });

    after(() => {
      Product.getAll.restore();
    });

    it('Retorna um array de objetos', async () => {
      await productsService.getAll();
      expect(Product.getAll.calledWith()).to.be.equal(true);
    });
  });

  describe('Função getById', () => {
    describe('Quando Id inserido é válido', () => {
      before(() => {
        sinon.stub(Product, 'getById').returns(getByIdResponse);
      });

      after(() => {
        Product.getById.restore();
      });

      it('Retorna um único objeto', async () => {
        await productsService.getById(testId);

        expect(Product.getById.calledWith(testId)).to.be.equal(true);

      });
    })
    describe('Quando Id inserido não é válido', () => {
      before(() => {
        sinon.stub(Product, 'getById').returns([]);
      });

      after(() => {
        Product.getById.restore();
      });
      it('Retorna array vazio', async () => {
        await productsService.getById(testId);
        expect(Product.getById.calledWith(testId)).to.be.equal(true);
      });
    });
  });

  // describe('Função create', () => {
  //   before(() => {
  //     sinon.stub(Product, 'create').returns(createResponse);
  //   });

  //   after(() => {
  //     Product.create.restore();
  //   });

  //   it('Retorna objeto com as características inseridas', async () => {
  //     await productsService.create(createInput);

  //     expect(Product.create.calledWith(createInput)).to.be.equal(true);
  //   });
  // });

  describe('Função update', () => {
    describe('Quando Id inserido é válido', () => {
      before(() => {
        sinon.stub(Product, 'update').returns(excludeResponse);
      });

      after(() => {
        Product.update.restore();
      });

      it('Retorna objeto 100% atualizado', async () => {
        const result = await productsService.update({ id: testId, ...createInput });

        expect(Product.update.calledWith({ id: testId, ...createInput })).to.be.equal(true);

      });
    });
    describe('Quando Id inserido não é válido', () => {
      before(() => {
        sinon.stub(Product, 'update').returns(fakeIdResponse);
      });

      after(() => {
        Product.update.restore();
      });
      it('Nenhuma Coluna é afetada', async () => {
        await productsService.update({ id: testId, ...createInput });
        expect(Product.update.calledWith({ id: testId, ...createInput })).to.be.equal(true);
      });
    });
  });

  describe('Função exclude', () => {
    describe('Quando Id inserido é válido', () => {
      before(() => {
        sinon.stub(Product, 'exclude').returns(excludeResponse);
      });

      after(() => {
        Product.exclude.restore();
      });

      it('Retorna "True"', async () => {
        await productsService.exclude(testId);

        expect(Product.exclude.calledWith(testId)).to.be.equal(true);
      });
    });

    describe('Quando Id inserido não é válido', () => {
      before(() => {
        sinon.stub(Product, 'exclude').returns(fakeIdResponse);
      });

      after(() => {
        Product.exclude.restore();
      });
      it('Retorna "True"', async () => {
        await productsService.exclude(fakeId);
        expect(Product.exclude.calledWith(fakeId)).to.be.equal(true);
      });
    });
  });
});
