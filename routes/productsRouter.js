const { Router } = require('express');
const { getProducts } = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get('/', getProducts)

module.exports = productsRouter;