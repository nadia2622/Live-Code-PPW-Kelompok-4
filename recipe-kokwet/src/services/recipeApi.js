import axios from 'axios';

// Ganti URL dengan base URL API yang kalian gunakan (misal: TheMealDB)
const apiClient = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/',
    timeout: 5000,
});

export const fetchAllRecipes = async () => {
    // Ganti endpoint '/search.php?s=' sesuai kebutuhan API
    const response = await apiClient.get('/search.php?s=');
    return response.data.meals || [];
};