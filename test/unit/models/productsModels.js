const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const Product = require('../../../models/productsModel');

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

const getByIdResponse = {
  "id": 1,
  "name": "Martelo de Thor",
  "quantity": 10
};

const createInput = {
  id: 45,
  name: 'Anel Solar',
  quantity: 100,
};

const createResponse = { insertId: 45 };

const excludeResponse = { affectedRows: 1 };

describe('PRODUCTS MODEL', () => {
  describe('Função getAll', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[getAllResponse], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um array de objetos', async () => {
      const [result] = await Product.getAll();
      expect(result).to.be.an('array');
      expect(result).to.be.equal(getAllResponse);
    });
  });

  describe('Função getById', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[getByIdResponse], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna um único objeto', async () => {
      const result = await Product.getById(testId);
      expect(result).to.be.an('object');
      expect(result).to.be.equal(getByIdResponse);
    });
  });

  describe('Função create', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[createResponse], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna objeto criado', async () => {
      const result = await Product.create(createInput);
      expect(result).to.be.an('object');
    });
  });

  describe('Função update', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[createResponse], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna objeto 100% atualizado', async () => {
      const result = await Product.update(createInput);
      expect(result).to.be.an('object');
    });
  });

  describe('Função exclude', () => {
    before(() => {
      sinon.stub(connection, 'execute').returns([[excludeResponse], []]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Retorna o número de colunas afetadas', async () => {
      const result = await Product.exclude(testId);
      expect(result).to.be.an('object');
    });
  });
});
