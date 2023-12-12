import BackgroundVideo from "./video-background";
import Navigation from "./nav";
import SearchBar from "./search";

export default function App() {
  return (
    <div>
      <Navigation />
      <div className="search-container">
        <BackgroundVideo />
        <SearchBar />
      </div>

      <div className="content">Content 2</div>
    </div>
  );
}
