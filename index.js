require('dotenv').config();
const express = require('express');
const errorMiddleware = require('./middlewares/error');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
