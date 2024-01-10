import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./home";
import Champions from "./champions";
import Guide from "./Guide";
// import { SearchContext } from "./Contexts/ContextApi";

export default function App() {
  const [search, setSearch] = useState("");

  function handleSearch(term) {
    setSearch(term);
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage onSearch={handleSearch} />} />
          <Route path="/champions" element={<Champions search={search} />} />
          <Route
            path={`/champions/${search}`}
            element={<Guide search={search} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
