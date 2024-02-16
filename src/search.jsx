import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import SearchIcon from "./SearchIcon";

export default function SearchBar({ onSearch, search, onSearchSubmitted }) {
  const searchRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  function handleSearchBar(e) {
    e.preventDefault();
    const trimSearch = search.trim();
    if (trimSearch === "") return;
    onSearch(trimSearch);
    onSearchSubmitted(true);
    navigate(`/leagueoflegends/champions/${trimSearch}`);
    onSearch("");
  }

  return (
    <form onSubmit={handleSearchBar}>
      <div className="search-container">
        <input
          placeholder="Champion"
          className="champion-input"
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <div>
          <button className="search-button" type="submit">
            <SearchIcon />
          </button>
        </div>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
  onSearchSubmitted: PropTypes.func,
};
