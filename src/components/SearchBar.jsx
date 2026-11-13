function SearchBar({ value, onChange, onClear }) {
  return (
    <form className="searchbar" role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="recipe-search" className="sr-only">
        Cari resep berdasarkan nama
      </label>
      <input
        id="recipe-search"
        type="search"
        placeholder="Cari resep, misalnya: Arrabiata"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      {value && (
        <button type="button" className="searchbar__clear" onClick={onClear}>
          Hapus
        </button>
      )}
    </form>
  );
}

export default SearchBar;
