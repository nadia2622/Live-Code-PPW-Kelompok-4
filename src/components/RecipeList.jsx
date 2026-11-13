import React from 'react';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
    const { recipes, isLoading, error } = useRecipes();

    if (isLoading) {
        return <div className="loading-state">⏳ Mengambil data resep...</div>;
    }

    if (error) {
        return <div className="error-state">❌ {error}</div>;
    }

    if (recipes.length === 0) {
        return <div className="empty-state">📭 Belum ada resep.</div>;
    }

    return (
        <div className="recipe-list-container">
            {/* 
        Styling container ini urusannya Abidah (grid/flex). 
      */}
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.idMeal} // Sesuaikan dengan nama ID dari API
                    recipe={recipe}     // Melempar seluruh data satu resep ke komponen Sukma
                />
            ))}
        </div>
    );
};

export default RecipeList;