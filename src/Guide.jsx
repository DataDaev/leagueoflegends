import { useEffect, useState } from "react";
import { fetchBiographyData } from "./BiographyData";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const apiLeague = {
  allChampionsURL:
    "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json",
  championDataURL:
    "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion/",
  splashImageURL:
    "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/",
  squareImageURL:
    "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/",
  abilitiesURL: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/",
  passiveURL: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/passive/",
};

export default function Guide({ search, searchSubmitted, onSearchSubmitted }) {
  const [champion, setChampion] = useState([]);
  const [filteredChampion, setfilteredChampion] = useState("");
  const [biography, setBiography] = useState("");
  const fromChampionPage = useParams();
  const capitalizedSearch = fromChampionPage.search
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).replace(/'/g, "")
    )
    .join("");

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const allChampionsRes = await fetch(`${apiLeague.allChampionsURL}`);
        const allChampionsData = await allChampionsRes.json();
        const mappedData = Object.values(allChampionsData.data).map(
          (champion) => champion.id
        );
        const filteredData = mappedData.filter((name) =>
          name.includes(capitalizedSearch)
        );
        console.log(filteredData[0]);
        setfilteredChampion(filteredData[0]);
        const championDataRes = await fetch(`${
          apiLeague.championDataURL + filteredData[0]
        }.json
        `);
        const championData = await championDataRes.json();
        setChampion(championData);
        const bioData = await fetchBiographyData();
        setBiography(bioData);
      } catch (error) {
        console.log("Error fetching champion data:", error);
      }
    };
    fetchChampions();
  }, [searchSubmitted]);

  const championData = champion.data || {};
  const searchedChampion = championData[filteredChampion];

  return (
    <div>
      {biography && console.log(searchedChampion)}
      {onSearchSubmitted(false)}
      <div className="guide">
        {searchedChampion && (
          <div className="guide-container">
            <div>
              <div className="splash-container">
                <img
                  className="guide-splash"
                  src={`${
                    apiLeague.splashImageURL + searchedChampion.id
                  }_0.jpg`}
                  alt=""
                />
              </div>
              <div className="guide-header">
                <h1>{searchedChampion.name}</h1>
                <p>{searchedChampion.title.toUpperCase()}</p>
              </div>
            </div>
            <div className="biography">
              <p>{biography && biography[filteredChampion].biography}</p>
            </div>
            {/* <div>
              <img
                src={`${apiLeague.squareImageURL + filteredChampion}.png`}
                alt=""
              />
            </div>
            <div className="guide-champion">
              <h1>{searchedChampion.name} ARAM Build & Runes</h1>
              <div className="abilities">
                <img
                  src={`${
                    apiLeague.passiveURL + searchedChampion.passive.image.full
                  }`}
                  alt=""
                />
                {Object.values(searchedChampion.spells).map((skill, index) => (
                  <div key={index}>
                    <img
                      src={`${apiLeague.abilitiesURL + skill.id}.png`}
                      alt={index}
                    />
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

Guide.propTypes = {
  search: PropTypes.string,
  searchSubmitted: PropTypes.bool,
  onSearchSubmitted: PropTypes.func,
};
