import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <Link to="/">
        <h3 className="logo">ARAM</h3>
      </Link>
      <ul>
        <li>
          <Link to="/champions">Champions</Link>
        </li>
        <li>
          <Link to="/champions/guide">Guide</Link>
        </li>
      </ul>
    </nav>
  );
}
