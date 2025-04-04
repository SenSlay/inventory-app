const { Router } = require('express');
const { getCategories, getCategoryDetails, getCategoryForm, addNewCategory, editCategory } = require('../controllers/categoriesController');
const { getCategoryById } = require('../db/queries');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/create', getCategoryForm)
categoriesRouter.get('/:id', getCategoryDetails);
categoriesRouter.get('/:id/edit', getCategoryForm)

categoriesRouter.post('/create', addNewCategory);
categoriesRouter.post('/:id/edit', editCategory);

module.exports = categoriesRouter;