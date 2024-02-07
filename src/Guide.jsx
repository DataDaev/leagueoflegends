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
  const [activeTab, setActiveTab] = useState(1);
  const [version, setVersion] = useState();

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
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        );
        const versionData = await versionRes.json();
        const latestVersion = versionData[0];
        setVersion(latestVersion);

        const allChampionsRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
        );
        const allChampionsData = await allChampionsRes.json();
        const mappedData = Object.values(allChampionsData.data).map(
          (champion) => champion.id
        );
        const filteredData = mappedData.filter((name) =>
          name.includes(capitalizedSearch)
        );
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
    <>
      {biography && console.log(version)}
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
                <h4>{searchedChampion.title.toUpperCase()}</h4>
              </div>
            </div>
            <div className="champion-content">
              <ul className="tabs">
                <li
                  className={activeTab === 1 ? "active-tab" : ""}
                  onClick={() => setActiveTab(1)}
                >
                  Biography
                </li>
                <li
                  className={activeTab === 2 ? "active-tab" : ""}
                  onClick={() => setActiveTab(2)}
                >
                  Skills
                </li>
                {console.log(activeTab)}
              </ul>
              <div className={activeTab === 1 ? "biography" : "hide-content"}>
                <h2>Who is {searchedChampion.name}?</h2>
                <p>{biography && biography[filteredChampion].biography}</p>
              </div>
              <div className={activeTab === 2 ? "stats" : "hide-content"}>
                <div className="stats-header">
                  <img
                    src={`${apiLeague.squareImageURL + filteredChampion}.png`}
                    alt=""
                  />
                  <h1>{searchedChampion.name} - Skills</h1>
                </div>
                <div className="abilities">
                  <div className="passive">
                    <img
                      src={`${
                        apiLeague.passiveURL +
                        searchedChampion.passive.image.full
                      }`}
                      alt=""
                    />
                    <div className="separator"></div>
                    <p>{searchedChampion.passive.description}</p>
                  </div>
                  {Object.values(searchedChampion.spells).map(
                    (skill, index) => (
                      <div key={index} className="skill">
                        <img
                          src={`${apiLeague.abilitiesURL + skill.id}.png`}
                          alt={index}
                        />
                        <div className="separator"></div>
                        <p>{skill.description}</p>
                      </div>
                    )
                  )}
                  {/* <ul>
                    <li>{searchedChampion.stats.hp}</li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

Guide.propTypes = {
  search: PropTypes.string,
  searchSubmitted: PropTypes.bool,
  onSearchSubmitted: PropTypes.func,
};
