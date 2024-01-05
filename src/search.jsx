import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [championSearch, setChampionSearch] = useState("");

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      console.log(championSearch);
      onSearch(championSearch);
    }
  }

  return (
    <div className="search">
      <input
        placeholder="Champion"
        type="text"
        value={championSearch}
        onChange={(e) => setChampionSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div>
        <button className="search-button">🔍</button>
      </div>
    </div>
  );
}
