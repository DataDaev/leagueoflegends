import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Champions() {
  const [championImage, setChampionImage] = useState([]);

  const champions = championImage.data || {};

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        );
        const versionData = await versionRes.json();
        const latestVersion = versionData[0];

        const championDataRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
        );
        const championData = await championDataRes.json();
        setChampionImage(championData);
      } catch (error) {
        console.log("Error fetching champion data:", error);
      }
    };

    fetchChampions();
  }, []);

  return (
    <>
      <div className="content">
        <div className="content-container">
          <h1>Champions</h1>
          <div className="champion-gallery">
            {Object.values(champions).map((champion) => (
              <div className="champion-card" key={champion.key}>
                <Link to={`/leagueoflegends/champions/${champion.id}`}>
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
    </>
  );
}

Champions.propTypes = {
  search: PropTypes.string,
};
