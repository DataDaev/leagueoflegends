import { Link } from "react-router-dom";
import SearchBar from "./search";
import PropTypes from "prop-types";

export default function Navigation({ onSearch, search, onSearchSubmitted }) {
  // const pageLocation = useLocation();
  // const isHome = pageLocation.pathname === "/";

  return (
    <nav>
      <Link to="/">
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
          <Link to="/champions">Champions</Link>
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
