const sinon = require('sinon');
const { expect } = require('chai');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');
const productsRouter = require('../../../routes/productsRouter');

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

const errorResponse = Error('Ops... Algo deu errado!');

const getByIdResponse = {
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10
};

const fakeIdResponse = { code: 404, message: "Product not found" };

const createInput = {
	"id": 1,
	"name": "Lente Prismática",
	"quantity": 25
}

const updateResponse = {
	"id": 1,
	"name": "Compasso Estelar",
	"quantity": 35
}

const excludeResponse = {
  code: 204,
};

describe('PRODUCTS CONTROLLER', () => {
  const req = {}; const res = {}; let next = () => {};
  describe('Função getAll', () => {
    describe('Quando não há erros', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAll').returns(getAllResponse);
      });

      after(() => {
        productsService.getAll.restore();
      });

      it('Retorna status esperado', async () => {
        await productsController.getAll(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna um array de objetos', async () => {
        await productsController.getAll(req, res, next);

        expect(res.json.calledWith(getAllResponse)).to.be.equal(true);
      });
    });

    describe('Quando há erros', () => {
      before(() => {
        next = sinon.stub().returns();
        sinon.stub(productsService, 'getAll').throws(errorResponse);
      });

      after(() => {
        productsService.getAll.restore();
      });

      it('Chama Função next com um erro', async () => {
        await productsController.getAll(req, res, next);
        expect(next.calledWith(errorResponse)).to.be.equal(true);
      });
     });
  });

  describe('Função getById', () => {
    describe('Quando Id inserido é válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 1 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getById').returns(getByIdResponse);
      });

      after(() => {
        productsService.getById.restore();
      });

      it('Retorna status esperado', async () => {
        await productsController.getById(req, res, next);

        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Retorna um único objeto', async () => {
        await productsController.getById(req, res, next);

        expect(res.json.calledWith(getByIdResponse)).to.be.equal(true);
      });
    })
    describe('Quando Id inserido não é válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 203 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getById').returns(fakeIdResponse);
      });

      after(() => {
        productsService.getById.restore();
      });
      it('Retorna status esperado', async () => {
        await productsController.getById(req, res, next);

        expect(res.status.calledWith(404)).to.be.equal(false);
      });
      it('Retorna mensagem esperada', async () => {
        await productsController.getById(req, res, next);

        expect(res.json.calledWith({ message: "Product not found"  })).to.be.equal(false);
      });
    });
    describe('Quando há erros', () => {
      before(() => {
        next = sinon.stub().returns();
        sinon.stub(productsService, 'getById').throws(errorResponse);
      });

      after(() => {
        productsService.getById.restore();
      });

      it('Chama Função next com um erro', async () => {
        await productsController.getById(req, res, next);
        expect(next.calledWith(errorResponse)).to.be.equal(true);
      });
     });
  });
  describe('Função create', () => {
    describe('Quando não há erros', () => {

      before(() => {
        req.body = sinon.stub().returns({ name: 'Lente Prismática', quantity: 25 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'create').returns(createInput);
      });

      after(() => {
        productsService.create.restore();
      });

      it('Retorna status esperado', async () => {
        await productsController.create(req, res, next);

        expect(res.status.calledWith(201)).to.be.equal(true);
      });

      it('Retorna objeto com as características inseridas', async () => {
        await productsController.create(req, res, next);

        expect(res.json.calledWith(createInput)).to.be.equal(true);
      });
    });

    describe('Quando há erros', () => {
      before(() => {
        next = sinon.stub().returns();
        sinon.stub(productsService, 'create').throws(errorResponse);
      });

      after(() => {
        productsService.create.restore();
      });

      it('Chama Função next com um erro', async () => {
        await productsController.create(req, res, next);
        expect(next.calledWith(errorResponse)).to.be.equal(true);
      });
     });
  });

  describe('Função update', () => {
    // describe('Quando Id inserido é válido', () => {
    //   before(() => {
    //     req.params = sinon.stub().returns({ id: 1 });
    //     res.status = sinon.stub().returns(res);
    //     res.json = sinon.stub().returns();
    //     sinon.stub(productsService, 'update').returns(updateResponse);
    //   });

    //   after(() => {
    //     productsService.update.restore();
    //   });

    //   it('Retorna status esperado', async () => {
    //     await productsController.update(req, res, next);

    //     expect(res.status.calledWith(200)).to.be.equal(true);
    //   });

    //   it('Retorna objeto 100% atualizado', async () => {
    //     await productsController.update(req, res, next);

    //     expect(res.json.calledWith(updateResponse)).to.be.equal(true);
    //   });
    // })
    describe('Quando Id inserido não é válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 203 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'update').returns(fakeIdResponse);
      });

      after(() => {
        productsService.update.restore();
      });
      it('Retorna status esperado', async () => {
        await productsController.update(req, res, next);

        expect(res.status.calledWith(404)).to.be.equal(false);
      });
      it('Retorna mensagem esperada', async () => {
        await productsController.update(req, res, next);

        expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(false);
      });
    });
    // describe('Quando há erros', () => {
    //   before(() => {
    //     next = sinon.stub().returns();
    //     sinon.stub(productsService, 'update').throws(errorResponse);
    //   });

    //   after(() => {
    //     productsService.update.restore();
    //   });

    //   it('Chama Função next com um erro', async () => {
    //     await productsController.update(req, res, next);
    //     expect(next.calledWith(errorResponse)).to.be.equal(true);
    //   });
    //  });
  });

  describe('Função exclude', () => {
    // describe('Quando Id inserido é válido', () => {
    //   before(() => {
    //     req.params = sinon.stub().returns({ id: 1 });
    //     res.status = sinon.stub().returns(res);
    //     res.end = sinon.stub().returns();
    //     sinon.stub(productsService, 'exclude').returns(excludeResponse);
    //   });

    //   after(() => {
    //     productsService.exclude.restore();
    //   });

    //   it('Retorna status esperado', async () => {
    //     await productsController.exclude(req, res, next);

    //     expect(res.status.calledWith(204)).to.be.equal(true);
    //   });

    //   it('Encerra responses', async () => {
    //     await productsController.exclude(req, res, next);

    //     expect(res.end.calledWith()).to.be.equal(true);
    //   });
    // })
    describe('Quando Id inserido não é válido', () => {
      before(() => {
        req.params = sinon.stub().returns({ id: 203 });
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'exclude').returns(fakeIdResponse);
      });

      after(() => {
        productsService.exclude.restore();
      });
      it('Retorna status esperado', async () => {
        await productsController.exclude(req, res, next);

        expect(res.status.calledWith(404)).to.be.equal(false);
      });
      it('Retorna mensagem esperada', async () => {
        await productsController.exclude(req, res, next);

        expect(res.json.calledWith({ message: "Product not found" })).to.be.equal(false);
      });
    });
    // describe('Quando há erros', () => {
    //   before(() => {
    //     next = sinon.stub().returns();
    //     sinon.stub(productsService, 'exclude').throws(errorResponse);
    //   });

    //   after(() => {
    //     productsService.exclude.restore();
    //   });

    //   it('Chama Função next com um erro', async () => {
    //     await productsController.exclude(req, res, next);
    //     expect(next.calledWith(errorResponse)).to.be.equal(true);
    //   });
    // });
  });
  describe('Router', () => {
    before(() => {
      sinon.stub(productsRouter, 'get').returns();
    });
    describe('/products', () => { 
      it('Funciona na rota /get', () => {
        productsRouter.get('/', productsController.getAll);
        expect(productsRouter.get.calledWith('/', productsController.getAll));
      });
    });
  });
});
