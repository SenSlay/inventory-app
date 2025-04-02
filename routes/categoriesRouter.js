const { Router } = require('express');
const { getCategories, getCategory } = require('../controllers/categoriesController');
const { getCategoryById } = require('../db/queries');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/:id', getCategory);

module.exports = categoriesRouter;