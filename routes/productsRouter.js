const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const { getProducts, getProductDetails, getProductForm, addNewProduct, editProduct } = require('../controllers/productsController');

const productsRouter = Router();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

productsRouter.get('/', getProducts)
productsRouter.get('/new', getProductForm)
productsRouter.get('/:id', getProductDetails);
productsRouter.get('/:id/edit', getProductForm);

productsRouter.post('/new', upload.single('image'), addNewProduct);
productsRouter.post('/:id/edit', upload.single('image'), editProduct);

module.exports = productsRouter;