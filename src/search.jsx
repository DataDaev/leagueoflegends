import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ onSearch }) {
  const [championSearch, setChampionSearch] = useState("");
  const navigate = useNavigate();

  function handleSearchBar(e) {
    e.preventDefault();
    const trimSearch = championSearch.trim();
    if (trimSearch === "") return;
    onSearch(trimSearch);
    navigate(`/champions/${trimSearch}`);
    console.log(trimSearch);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearchBar(e);
    }
  }

  return (
    <form onSubmit={handleSearchBar}>
      <div className="search">
        <input
          placeholder="Champion"
          type="text"
          value={championSearch}
          onChange={(e) => setChampionSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div>
          <button className="search-button" type="submit">
            🔍
          </button>
        </div>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
