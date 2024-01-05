import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./home";
import Champions from "./champions";
import Guides from "./Guides";
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
          <Route path="/guides" element={<Guides />} />
        </Routes>
      </div>
    </Router>
  );
}
