import BackgroundVideo from "./VideoBackground";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="content">
      <BackgroundVideo />
      <div className="featured-champion">
        <h1>Featured Champion</h1>
        <img
          src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Smolder_0.jpg"
          alt=""
        />
        <h2>Smolder</h2>
        <Link to="/champions/smolder">
          <button>Biography</button>
        </Link>
      </div>
      <div className="about">
        <h1>About Lolchamp</h1>
        <div className="about-content">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/Smolder.png`}
            alt=""
          />
          <p>
            Lolchamp provides the biography and skills of every released
            champion from League of Legends. We want players to be able look up
            champions and get a basic understanding of who the champions are and
            their abilities.
          </p>
        </div>
      </div>
    </div>
  );
}
