import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const apiLeague = {
  allChampionsURL:
    "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json",
};

export default function Champions() {
  const [championImage, setChampionImage] = useState([]);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const championDataRes = await fetch(`${apiLeague.allChampionsURL}`);
        const championData = await championDataRes.json();
        setChampionImage(championData);
      } catch (error) {
        console.log("Error fetching champion data:", error);
      }
    };

    fetchChampions();
  }, []);

  const champions = championImage.data || {};

  return (
    <div>
      {console.log(champions)}
      <div className="content">
        <div className="content-container">
          <div className="championGallery">
            {Object.values(champions).map((champion) => (
              <div className="championCard" key={champion.key}>
                <Link to={`/champions/${champion.id}`}>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                    alt=""
                  />
                  <h1>{champion.name}</h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Champions.propTypes = {
  search: PropTypes.string,
};
