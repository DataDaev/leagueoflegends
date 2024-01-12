import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const apiLeague = {
  championDataURL:
    "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/",
  squareImageURL:
    "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/",
  abilitiesURL: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/",
  passiveURL: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/passive/",
};

export default function Guide({ search }) {
  const [champion, setChampion] = useState([]);
  const capitalizedSearch = search
    .toLowerCase()
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase().replace(/'/g, "")
    )
    .join("");

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const championDataRes = await fetch(
          `${apiLeague.championDataURL + capitalizedSearch}.json`
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
      {console.log(search)}
      <div className="guide">
        {searchedChampion && (
          <div className="guide-container">
            <div>
              <img
                src={`${apiLeague.squareImageURL + capitalizedSearch}.png`}
                alt=""
              />
            </div>
            <div className="guide-champion">
              <h1>{searchedChampion.name} ARAM Build & Runes</h1>
              <div className="abilities">
                {Object.values(searchedChampion.spells).map((skill, index) => (
                  <img
                    key={index}
                    src={`${apiLeague.abilitiesURL + skill.id}.png`}
                    alt={index}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Guide.propTypes = {
  search: PropTypes.string,
};
