import { Link } from "react-router-dom";
import SearchBar from "./Search";
import PropTypes from "prop-types";

export default function Navigation({ onSearch, search, onSearchSubmitted }) {
  return (
    <nav>
      <Link to="/leagueoflegends/">
        <h3 className="logo">Lolchamp</h3>
      </Link>
      <div className={"nav-search-container"}>
        <SearchBar
          onSearch={onSearch}
          search={search}
          onSearchSubmitted={onSearchSubmitted}
        />
      </div>

      <ul>
        <li>
          <Link to="/leagueoflegends/champions">Champions</Link>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
  onSearchSubmitted: PropTypes.func,
};
