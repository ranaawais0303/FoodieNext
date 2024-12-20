import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export const generateMetadata = async ({ params }) => {
  const meal = await getMeal(params.dynamic);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealsDetailPage = async ({ params }) => {
  const meal = await getMeal(params.dynamic);
  if (!meal) {
    notFound("page not found");
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.image} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mainto:${"Email"}`}> {meal.creator_email}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
};

export default MealsDetailPage;
