const sql = require("mssql");
const config = require("../database/dbConfig");
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

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

export const saveMeal = async (meal) => {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const extention = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extention}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      console.error("Error writing image:", error);
      throw new Error("Saving image failed!");
    }
  });

  meal.image = `/images/${fileName}`;

  //save into db

  try {
    const pool = await sql.connect(config);

    const query = `
    Insert into meals (slug, title, image, summary, instructions, creator, creator_email)
    values (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
    `;

    await pool
      .request()
      .input("slug", sql.VarChar, meal.slug)
      .input("title", sql.VarChar, meal.title)
      .input("image", sql.VarChar, meal.image)
      .input("summary", sql.VarChar, meal.summary)
      .input("instructions", sql.VarChar, meal.instructions)
      .input("creator", sql.VarChar, meal.creator)
      .input("creator_email", sql.VarChar, meal.creator_email)
      .query(query);

    console.log("Dummy data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    sql.close();
  }
};
