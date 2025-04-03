const { getAllTopCategories, getAllSubCategories, getCategoryById, getSubCategoriesById } = require("../db/queries")

const getCategories = async (req, res) => {
  try {
    const [topCategories, subCategories] = await Promise.all([
      getAllTopCategories(),
      getAllSubCategories()
    ]);

    // Group subcategories by parent_category_id for quick lookup
    const subCategoryMap = {};
    subCategories.forEach(subCategory => {
      if (!subCategoryMap[subCategory.parent_category_id]) {
        subCategoryMap[subCategory.parent_category_id] = [];
      }
      subCategoryMap[subCategory.parent_category_id].push(subCategory);
    });

    console.log('Top categories: ', topCategories);
    console.log('Sub categories: ', subCategories);

    res.render('categories', { topCategories, subCategoryMap });

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Server Error');
  }
};

const getCategory = async(req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    let parentCategory = null;
    let subCategories = null;
    if (!category) {
      return res.status(404).send("Category not found");
    }
    
    if (category.parent_category_id) {
      parentCategory = await getCategoryById(category.parent_category_id);
      res.render('categoryDetails', { category, subCategories, parentCategory })
      return;
    } else {
      subCategories = await getSubCategoriesById(categoryId);
      console.log(subCategories)
      res.render('categoryDetails', { category, subCategories })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error: ", err);
  }
}

module.exports = {
  getCategories,
  getCategory
}