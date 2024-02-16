import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Home";
import Champions from "./Champions";
import Lore from "./Lore-skills";
import Navigation from "./Navigation";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";

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
          <Route
            path="/leagueoflegends/"
            element={<HomePage onSearch={handleSearch} />}
          />
          <Route
            path="/leagueoflegends/champions"
            element={<Champions onSearch={handleSearch} />}
          />
          <Route
            path={"/leagueoflegends/champions/:search"}
            element={
              <Lore
                search={search}
                searchSubmitted={searchSubmitted}
                onSearchSubmitted={handleSearchSubmitted}
              />
            }
          />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}
