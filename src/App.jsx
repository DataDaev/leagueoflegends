import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./home";
import Champions from "./champions";
import Guide from "./Guide";
import Navigation from "./Navigation";
import ScrollToTop from "./ScrollToTop";
export default function App() {
  const [search, setSearch] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  function handleSearchSubmitted(e) {
    setSearchSubmitted(e);
  }

  function handleSearch(term) {
    setSearch(term);
  }

  return (
    <Router>
      <>
        <ScrollToTop />
        <Navigation
          onSearch={handleSearch}
          search={search}
          onSearchSubmitted={handleSearchSubmitted}
        />
        <Routes>
          <Route path="/" element={<HomePage onSearch={handleSearch} />} />
          <Route
            path="/champions"
            element={<Champions onSearch={handleSearch} />}
          />
          <Route
            path={"/champions/:search"}
            element={
              <Guide
                search={search}
                searchSubmitted={searchSubmitted}
                onSearchSubmitted={handleSearchSubmitted}
              />
            }
          />
        </Routes>
      </>
    </Router>
  );
}
