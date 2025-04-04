const { Client } = require("pg");
require("dotenv").config();

const dropTables = `DROP TABLE IF EXISTS inventory, categories;`;

const createInventoryTable = `
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    image TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    description VARCHAR(200),
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
  )
`;

const createCategoryTable = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    parent_category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category_id) REFERENCES categories(id) ON DELETE CASCADE
  )
`;

const addDefaultData = `
  INSERT INTO categories (category, description, parent_category_id)
  VALUES
    ('Electronics', 'Devices like phones, laptops, and accessories', NULL),
    ('Clothing', 'Men and women apparel', NULL),
    ('Smartphones', 'Mobile phones and accessories', 1),
    ('Laptops', 'Portable computers', 1),
    ('Men''s Clothing', 'Shirts, pants, and jackets', 2),
    ('Women''s Clothing', 'Dresses, skirts, and tops', 2);

  INSERT INTO inventory (name, image, price, quantity, description, category_id)
  VALUES
    ('iPhone 13', 'iphone_13.jpg', 999.99, 50, 'Latest model with A15 chip and 5G connectivity', 3),
    ('MacBook Pro 16"', 'macbook_pro_16.jpg', 2499.99, 30, 'High-performance laptop with M1 Pro chip', 4),
    ('Men''s T-Shirt', 'mens_tshirt.jpg', 19.99, 100, 'Comfortable cotton t-shirt in various colors', 5),
    ('Women''s Jacket', 'womens_jacket.jpg', 89.99, 75, 'Stylish jacket for women, available in multiple sizes', 6);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Database connected.");
    await client.query(dropTables);
    await client.query(createCategoryTable);
    await client.query(createInventoryTable);
    await client.query(addDefaultData);
    console.log("Database seeded.");
  } catch (err) {
    console.log("Error seeding database: ", err)
  } finally {
    await client.end();
  }
}

main();