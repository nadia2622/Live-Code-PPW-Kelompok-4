import axios from "axios";

// Instance Axios dipakai semua fungsi di bawah.
const api = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1",
  timeout: 10000,
});

export const isCancel = axios.isCancel;

// GET /categories.php
export const getCategories = async (signal) => {
  const { data } = await api.get("/categories.php", { signal });
  return data.categories ?? [];
};

// GET /filter.php?c={kategori}
export const getMealsByCategory = async (category, signal) => {
  const { data } = await api.get("/filter.php", { params: { c: category }, signal });
  return data.meals ?? []; // API mengembalikan { meals: null } kalau kosong
};

// GET /search.php?s={nama}
export const searchMeals = async (name, signal) => {
  const { data } = await api.get("/search.php", { params: { s: name }, signal });
  return data.meals ?? []; // null -> [] supaya jadi empty state, bukan error
};

// GET /lookup.php?i={idMeal}
export const getMealDetail = async (id, signal) => {
  const { data } = await api.get("/lookup.php", { params: { i: id }, signal });
  return data.meals?.[0] ?? null;
};
