import { useEffect, useState } from "react";
import { getMealDetail, isCancel } from "../services/recipeApi";
import StatusMessage from "./StatusMessage";

const getIngredients = (meal) =>
  Array.from({ length: 20 }, (_, i) => ({
    name: meal[`strIngredient${i + 1}`]?.trim(),
    measure: meal[`strMeasure${i + 1}`]?.trim(),
  })).filter((item) => item.name);

function RecipeDetail({ id, onClose }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setMeal(null);

    getMealDetail(id, controller.signal)
      .then(setMeal)
      .catch((err) => {
        if (!isCancel(err)) setError("Detail resep gagal dimuat.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id, attempt]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const ingredients = meal ? getIngredients(meal) : [];
  const steps = meal?.strInstructions?.split(/\r?\n/).filter((s) => s.trim()) ?? [];
  const tags = meal?.strTags?.split(",").filter(Boolean) ?? [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Tutup detail resep">
          ✕
        </button>

        {loading && <StatusMessage type="loading" message="Membuka buku resep..." />}
        {error && <StatusMessage type="error" message={error} onRetry={() => setAttempt((n) => n + 1)} />}
        {!loading && !error && !meal && (
          <StatusMessage type="empty" message="Resep tidak ditemukan." />
        )}

        {meal && (
          <article className="detail">
            <img className="detail__img" src={`${meal.strMealThumb}/medium`} alt={meal.strMeal} />

            <div className="detail__content">
              <h2 id="detail-title">{meal.strMeal}</h2>
              <p className="detail__meta">
                <span className="pill">{meal.strCategory}</span>
                <span className="pill pill--olive">{meal.strArea}</span>
              </p>

              {tags.length > 0 && (
                <ul className="detail__tags" aria-label="Tag resep">
                  {tags.map((tag) => (
                    <li key={tag}>#{tag.trim()}</li>
                  ))}
                </ul>
              )}

              {meal.strYoutube && (
                <a className="btn btn--outline" href={meal.strYoutube} target="_blank" rel="noreferrer">
                  Tonton di YouTube
                </a>
              )}
            </div>

            <section className="detail__ingredients" aria-labelledby="ing-title">
              <h3 id="ing-title">Bahan-bahan</h3>
              <ul>
                {ingredients.map(({ name, measure }, i) => (
                  <li key={`${name}-${i}`}>
                    <span>{name}</span>
                    <span className="measure">{measure}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="detail__steps" aria-labelledby="steps-title">
              <h3 id="steps-title">Cara memasak</h3>
              {steps.map((step, i) => (
                <p key={i}>{step}</p>
              ))}
            </section>
          </article>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;
