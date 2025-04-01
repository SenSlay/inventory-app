const { Client } = require("pg");
require("dotenv").config();

const SQL = `

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Database connected.");
    await client.query(SQL);
    console.log("Database seeded.");
  } catch (err) {
    console.log("Error seeding database: ", err)
  } finally {
    await client.end();
  }
}

main();