const sql = require("mssql");
const config = require("./dbConfig");

async function createTable() {
  try {
    const pool = await sql.connect(config);

    const query = `
      CREATE TABLE meals (
        id INT IDENTITY(1,1) PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(MAX) NOT NULL,
        summary VARCHAR(MAX) NOT NULL,
        instructions VARCHAR(MAX) NOT NULL,
        creator VARCHAR(255) NOT NULL,
        creator_email VARCHAR(255) NOT NULL
      )
    `;

    await pool.request().query(query);
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    sql.close();
  }
}

createTable();
