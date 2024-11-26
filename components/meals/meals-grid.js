import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";
const MealsGrid = ({ meals }) => {
  return (
    <ui className={classes.meals}>
      {meals.map((meal) => {
        console.log(meal.slug, "slug");
        return (
          <li key={meal.id}>
            <MealItem {...meal} />
          </li>
        );
      })}
    </ui>
  );
};
export default MealsGrid;
