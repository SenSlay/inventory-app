const { getallInventory } = require("../db/queries")

const getProducts = async(req, res) => {
  try {
    const products = await getallInventory();
    console.log("Products: ", products);
    res.render('products', { products })
  } catch (err) {
    console.error('Error fetching Products:', err);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getProducts
}