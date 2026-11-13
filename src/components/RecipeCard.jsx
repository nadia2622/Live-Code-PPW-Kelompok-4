function RecipeCard({ meal, recipe, categoryLabel, onSelect }) {
  const item = meal || recipe;
  if (!item) return null;

  const category = item.strCategory ?? categoryLabel;
  const info = [category, item.strArea].filter(Boolean).join(" • ");

  return (
    <article className="recipe-card">
      <button
        type="button"
        className="recipe-card__btn"
        onClick={() => onSelect?.(item.idMeal)}
        aria-label={`Lihat resep ${item.strMeal}`}
      >
        <img
          src={item.strMealThumb ? `${item.strMealThumb}/preview` : ""}
          alt={item.strMeal}
          loading="lazy"
        />
        <div className="recipe-card__body">
          <h3>{item.strMeal}</h3>
          {info && <p className="recipe-card__info">{info}</p>}
        </div>
      </button>
    </article>
  );
}

export default RecipeCard;
