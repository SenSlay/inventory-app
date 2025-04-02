const pool = require("./pool");

async function getAllTopCategories() {
  const { rows } = await pool.query("SELECT * FROM categories WHERE parent_category_id IS NULL;")
  return rows; 
}

async function getAllSubCategories() {
  const { rows } = await pool.query("SELECT * FROM categories WHERE parent_category_id IS NOT NULL")
  return rows;
}

async function getallInventory() {
  const { rows } = await pool.query("SELECT * FROM inventory;");
  return rows; 
}

module.exports = {
  getAllTopCategories,
  getAllSubCategories,
  getallInventory
}