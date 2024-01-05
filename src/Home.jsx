import BackgroundVideo from "./VideoBackground";
import Navigation from "./Navigation";
import SearchBar from "./Search";
import PropTypes from "prop-types";

export default function HomePage({ onSearch }) {
  return (
    <div>
      <Navigation />
      <div className="search-container">
        <BackgroundVideo />
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="content">Content 2</div>
    </div>
  );
}

HomePage.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
