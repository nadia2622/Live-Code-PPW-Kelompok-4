import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/',
    timeout: 5000,
});

export const fetchAllRecipes = async () => {
    const response = await apiClient.get('/search.php?s=');
    return response.data.meals || [];
};

export const searchMeals = async (name, signal) => {
  const { data } = await api.get("/search.php", { params: { s: name }, signal });
  return data.meals ?? []; 
};