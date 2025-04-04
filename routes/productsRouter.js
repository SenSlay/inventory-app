const { Router } = require('express');
const { getProducts, getProductDetails, getProductForm, addNewProduct } = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/', getProducts)
productsRouter.get('/new', getProductForm)
productsRouter.get('/:id', getProductDetails);
productsRouter.get('/:id/edit', getProductForm);

productsRouter.post('/new', addNewProduct);

module.exports = productsRouter;