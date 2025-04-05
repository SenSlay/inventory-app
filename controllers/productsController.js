const { getallInventory, getProductById, getAllSubCategories, getAllTopCategories, insertProduct, updateProduct, deleteProductById, deleteCategoryById } = require("../db/queries")
const path = require('path');
const fs = require('fs');

const getProducts = async(req, res) => {
  try {
    const products = await getallInventory();

    res.render('products', { products })
  } catch (err) {
    console.error('Error fetching Products:', err);
    res.status(500).send('Server Error');
  }
}

const getProductDetails = async(req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId)
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render('productDetails', { product });
  } catch(err) {
    console.log(err);
    res.status(500).send("Server Error: ", err);
  }
}

const getProductForm = async(req, res) => {
  try {
    const productId = req.params.id;
    let product;

    const [parentCategories, subCategories] = await Promise.all([
      getAllTopCategories(),
      getAllSubCategories()
    ]);

    if (productId && Number.isInteger(Number(productId))) {
      product = await getProductById(productId);

      if (!product) {
        return res.status(404).send("Category not found");
      }
    }

    console.log(parentCategories)

    res.render('productForm', { product, subCategories, parentCategories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

const addNewProduct = async(req, res) => {
  try {
    const { name, description, price, quantity, category_id } = req.body;
    const image = req.file ? req.file.filename : null;

    const result = await insertProduct(name, description, price, quantity, category_id, image);

    if (!result)  {
      throw new Error("Failed to insert new product");
    }

    res.redirect('/products');
  } catch(err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const oldProduct = await getProductById(productId);

    if (!oldProduct) return res.status(404).send("Product not found");

    // If new image uploaded, remove the old one
    let newImage = oldProduct.image; // default: keep old
    if (req.file) {
      newImage = req.file.filename;

      // Delete old image from uploads folder
      const oldImagePath = path.join(__dirname, '..', 'public', 'uploads', oldProduct.image);
      
      fs.unlink(oldImagePath, err => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    const { name, description, price, quantity, category_id } = req.body;

    const updated = await updateProduct(productId, name, description, price, quantity, category_id, newImage);

    if (!updated) {
      return res.status(404).send("Product not found or not updated");
    }

    res.redirect('/products');
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductById(id);

    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }

    // Delete image from uploads folder
    if (deletedProduct.image) {
      const imagePath = path.join(__dirname, '..', 'public', 'uploads', deletedProduct.image);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn("Image deletion failed:", err.message);
        } 
      });
    }

    res.redirect('/products');
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getProducts,
  getProductDetails,
  getProductForm,
  addNewProduct,
  editProduct,
  deleteProduct
}