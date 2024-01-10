import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import PropTypes from "prop-types";

const apiLeague = {
  championURL:
    "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/",
  abilitiesURL: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/",
};

export default function Guide({ search }) {
  const [champion, setChampion] = useState([]);
  const capitalizedSearch =
    search.charAt(0).toUpperCase() +
    search.slice(1).toLowerCase().replace(/'/g, "");

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const championDataRes = await fetch(
          `${apiLeague.championURL + capitalizedSearch}.json`
        );
        const championData = await championDataRes.json();
        setChampion(championData);
      } catch (error) {
        console.log("Error fetching champion data:", error);
      }
    };
    fetchChampions();
  }, []);

  const championData = champion.data || {};
  const searchedChampion = championData[capitalizedSearch];

  return (
    <div>
      <Navigation />
      <div className="guide">
        <div className="guide-container">
          {searchedChampion && (
            <div className="guide-champion">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${capitalizedSearch}.png`}
                alt=""
              />
              <h1>{searchedChampion.name} ARAM Build & Runes</h1>
              <div>
                <img
                  src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/AatroxQ.png"
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Guide.propTypes = {
  search: PropTypes.string,
};
