import { useEffect, useState } from "react";
import { searchMeals, isCancel } from "../services/recipeApi";

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function useRecipeSearch(query) {
  const trimmed = query.trim();
  const debounced = useDebounce(trimmed);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!debounced) {
      setMeals([]);
      setLoading(false);
      setError(null);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    searchMeals(debounced, controller.signal)
      .then(setMeals)
      .catch((err) => {
        if (!isCancel(err)) setError("Pencarian gagal. Periksa koneksi internetmu.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [debounced, attempt]);

  const waiting = trimmed !== debounced;

  return {
    meals: waiting ? [] : meals,
    loading: loading || waiting,
    error: waiting ? null : error,
    retry: () => setAttempt((n) => n + 1),
  };
}
