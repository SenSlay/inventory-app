const { getallInventory, getProductById, getAllSubCategories, getAllTopCategories, insertProduct } = require("../db/queries")

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

    const result = await insertProduct(name, description, price, quantity, category_id);

    if (!result)  {
      throw new Error("Failed to insert new product");
    }
    
    res.redirect('/products');
  } catch(err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getProducts,
  getProductDetails,
  getProductForm,
  addNewProduct
}