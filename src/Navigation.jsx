import { Link } from "react-router-dom";
import SearchBar from "./Search";
import PropTypes from "prop-types";

export default function Navigation({ onSearch, search }) {
  return (
    <nav>
      <div>
        <Link to="/">
          <h3 className="logo">ARAM</h3>
        </Link>
      </div>
      <div className="nav-search-container">
        <SearchBar onSearch={onSearch} search={search} />
      </div>
      <div>
        <ul>
          <li>
            <Link to="/champions">Champions</Link>
          </li>
          <li>
            <Link to="/champions/guide">Guide</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
};
