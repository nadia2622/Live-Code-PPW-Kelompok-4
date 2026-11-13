import StatusMessage from "./StatusMessage.jsx";

function CategoryList({
  categories = [],
  loading = false,
  error = null,
  onRetry,
  selected,
  onSelect,
}) {
  return (
    <section id="categories" className="section container" aria-labelledby="categories-title">

      {loading && <StatusMessage type="loading" message="Memuat daftar kategori..." />}
      {error && <StatusMessage type="error" message={error} onRetry={onRetry} />}

      {!loading && !error && categories.length > 0 && (
        <div className="category-grid">
          {categories.map((cat) => {
            const isSelected = selected === cat.strCategory;
            return (
              <button
                key={cat.idCategory}
                type="button"
                className={`category-card ${isSelected ? "is-active" : ""}`}
                onClick={() => onSelect(cat.strCategory)}
                aria-pressed={isSelected}
              >
                
                <span className="category-card__name">{cat.strCategory}</span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default CategoryList;

