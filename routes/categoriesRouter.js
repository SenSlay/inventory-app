const { Router } = require('express');
const { getCategories, getCategory, renderCategoryForm, addNewCategory, editCategory } = require('../controllers/categoriesController');
const { getCategoryById } = require('../db/queries');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/create', renderCategoryForm)
categoriesRouter.get('/:id', getCategory);
categoriesRouter.get('/:id/edit', renderCategoryForm)

categoriesRouter.post('/create', addNewCategory);
categoriesRouter.post('/:id/edit', editCategory);

module.exports = categoriesRouter;