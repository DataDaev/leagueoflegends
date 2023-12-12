import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState();

  function handleKeyPress() {
    // if (e.key === "Enter") {
    // }
  }

  return (
    <div className="search">
      <input
        placeholder="Player or Champion"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div>
        <button className="search-button">🔍</button>
      </div>
    </div>
  );
}
