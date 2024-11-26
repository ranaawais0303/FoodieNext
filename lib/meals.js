const sql = require("mssql");
const config = require("../database/dbConfig");

export const getMeals = async () => {
  const pool = await sql.connect(config);
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const result = await pool.request().query("SELECT * FROM Meals");
  // throw new Error("Loading meals failed");
  return result.recordset;
};

export const getMeal = async (slug) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("slug", sql.VarChar, slug) // Bind the slug parameter securely
      .query("SELECT * FROM Meals WHERE slug = @slug"); // Use @slug in the query

    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching meal:", error);
    throw error; // Re-throw the error for better error handling
  } finally {
    sql.close(); // Ensure the connection is closed
  }
};
