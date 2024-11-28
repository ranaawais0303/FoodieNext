"use server";

export const shareMeal = async (formData) => {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  // Log data to the server console
  console.log("Server-side Meal data:", meal);

  // Simulate server processing
  // For example, saving data to a database
  // await db.insertMeal(meal);

  return {
    success: true,
    message: `Meal "${meal.title}" shared successfully!`,
  };
};
