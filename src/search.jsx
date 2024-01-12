import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as SearchIcon } from "./assets/search-icon.svg";

export default function SearchBar({ onSearch, search }) {
  const navigate = useNavigate();
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  function handleSearchBar(e) {
    e.preventDefault();
    const trimSearch = search.trim();
    if (trimSearch === "") return;
    onSearch(trimSearch);
    navigate(`/champions/${trimSearch}`);
    // onSearch("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearchBar(e);
    }
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
          onKeyDown={handleKeyPress}
        />
        <div>
          <button className="search-button" type="submit">
            {/* <SearchIcon /> */}
          </button>
        </div>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
};
