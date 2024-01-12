import BackgroundVideo from "./VideoBackground";
import PropTypes from "prop-types";

export default function HomePage() {
  return (
    <div>
      <BackgroundVideo />
      <div className="content">Content 2</div>
    </div>
  );
}

HomePage.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
