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

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = ($1)", [id]);
  return rows[0]; 
}

async function getSubCategoriesById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE parent_category_id = ($1)", [id])
  return rows;
}

async function getProductsByCategoryId(id) {
  const { rows } = await pool.query("SELECT * FROM inventory WHERE category_id = ($1)", [id]);
  return rows;
}

async function insertCategory(category, description, parentId) {
  const result = await pool.query(
    "INSERT INTO categories (category, description, parent_category_id) VALUES ($1, $2, $3) RETURNING *",
    [category, description, parentId]
  );

  return result.rows[0];
}

async function updateCategory(id, category, description) {
  const result = await pool.query("UPDATE categories SET category = $1, description = $2 WHERE id = $3 RETURNING *", [category, description, id]);

  return result.rows[0];
}

module.exports = {
  getAllTopCategories,
  getAllSubCategories,
  getallInventory,
  getCategoryById,
  getSubCategoriesById,
  getProductsByCategoryId,
  insertCategory,
  updateCategory
}