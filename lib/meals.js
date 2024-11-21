const sql = require("mssql");
const config = require("../database/dbConfig");

export async function getMeals() {
  const pool = await sql.connect(config);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const result = await pool.request().query("SELECT * FROM Meals");
  return result.recordset;
}
