import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import CategoryList from "./components/CategoryList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import RecipeList from "./components/RecipeList.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import Footer from "./components/Footer.jsx";
import { useRecipeSearch } from "./hooks/useRecipeSearch.js";
import { useCategories, useRecipes } from "./hooks/useRecipes.js";

function App() {
  const [category, setCategory] = useState("Dessert");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const categoriesState = useCategories();
  const recipes = useRecipes(category);
  const search = useRecipeSearch(query);

  const isSearching = query.trim() !== "";
  const active = isSearching ? search : recipes;

  const handleSelectCategory = (name) => {
    setQuery("");
    setCategory(name);
    document.getElementById("recipes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero image={recipes.meals?.[0]?.strMealThumb} />

        <CategoryList
          {...categoriesState}
          selected={isSearching ? null : category}
          onSelect={handleSelectCategory}
        />

        <section id="recipes" className="section container" aria-labelledby="recipes-title">
          <div className="section__head">
            <h2 id="recipes-title">
              {isSearching ? `Hasil untuk “${query.trim()}”` : `Resep ${category}`}
            </h2>
            <SearchBar value={query} onChange={setQuery} onClear={() => setQuery("")} />
          </div>

          <RecipeList
            meals={active.meals}
            loading={active.loading}
            error={active.error}
            onRetry={active.retry}
            onSelect={setSelectedId}
            categoryLabel={isSearching ? undefined : category}
            emptyMessage={
              isSearching
                ? `Belum ada resep bernama “${query.trim()}”. Coba kata kunci lain.`
                : "Belum ada resep di kategori ini."
            }
          />
        </section>
      </main>
      <Footer />

      {selectedId && <RecipeDetail id={selectedId} onClose={() => setSelectedId(null)} />}
    </>
  );
}

export default App;
