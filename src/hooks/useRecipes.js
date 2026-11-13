import { useState, useEffect } from 'react';
import { fetchAllRecipes } from '../services/recipeApi';

export const useRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRecipes = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchAllRecipes();
                setRecipes(data);
            } catch (err) {
                setError('Gagal mengambil data resep. Periksa koneksi internetmu.');
            } finally {
                setIsLoading(false);
            }
        };

        getRecipes();
    }, []);

    // Hook ini mengembalikan state yang akan dipakai oleh komponen RecipeList
    return { recipes, isLoading, error };
};