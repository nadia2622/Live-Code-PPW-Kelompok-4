function RecipeCard({ meal, categoryLabel, onSelect }) {
  const category = meal.strCategory ?? categoryLabel;
  const info = [category, meal.strArea].filter(Boolean).join(" • ");

  return (
    <article className="recipe-card">
      <button
        className="recipe-card__btn"
        onClick={() => onSelect(meal.idMeal)}
        aria-label={`Lihat resep ${meal.strMeal}`}
      >
        <img src={`${meal.strMealThumb}/medium`} alt={meal.strMeal} loading="lazy" />
        <div className="recipe-card__body">
          <h3>{meal.strMeal}</h3>
          {info && <p className="recipe-card__info">{info}</p>}
        </div>
      </button>
    </article>
  );
}

export default RecipeCard;
