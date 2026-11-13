import { useEffect, useState } from "react";
import { getCategories, getMealsByCategory, isCancel } from "../services/recipeApi";

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        getCategories(controller.signal)
            .then(setCategories)
            .catch((err) => {
                if (!isCancel(err)) setError("Kategori gagal dimuat. Periksa koneksi internetmu.");
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [attempt]);

    return { categories, loading, error, onRetry: () => setAttempt((n) => n + 1) };
}

export function useRecipes(category) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!category) return;
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        getMealsByCategory(category, controller.signal)
            .then(setMeals)
            .catch((err) => {
                if (!isCancel(err)) setError("Menu gagal dimuat. Periksa koneksi internetmu.");
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [category, attempt]);

    return { meals, loading, error, retry: () => setAttempt((n) => n + 1) };
}
