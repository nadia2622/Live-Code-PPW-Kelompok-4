import RecipeCard from "./RecipeCard.jsx";
import StatusMessage from "./StatusMessage.jsx";

function RecipeList({
  meals = [],
  loading = false,
  error = null,
  onRetry,
  onSelect,
  categoryLabel,
  emptyMessage = "Belum ada resep di kategori ini.",
}) {
  if (loading) {
    return <StatusMessage type="loading" message="Mengambil data resep..." />;
  }

  if (error) {
    return <StatusMessage type="error" message={error} onRetry={onRetry} />;
  }

  if (!meals || meals.length === 0) {
    return <StatusMessage type="empty" message={emptyMessage} />;
  }

  return (
    <div className="recipe-grid">
      {meals.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          categoryLabel={categoryLabel}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default RecipeList;
