import { useEffect, useState } from "react";
import { fetchBiographyData } from "./BiographyData";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const apiLeague = {
  apiBase: "https://ddragon.leagueoflegends.com/cdn/",
  allChampionsURL: "/data/en_US/champion.json",
  championDataURL: "/data/en_US/champion/",
  splashImageURL: "img/champion/splash/",
  squareImageURL: "/img/champion/",
  abilitiesURL: "/img/spell/",
  passiveURL: "/img/passive/",
};

export default function Lore({ searchSubmitted, onSearchSubmitted }) {
  const [champion, setChampion] = useState([]);
  const [filteredChampion, setfilteredChampion] = useState("");
  const [biographyText, setBiographyText] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [latestVersion, setLatestVersion] = useState();

  const fromChampionPage = useParams();
  const capitalizedSearch = fromChampionPage.search
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).replace(/'/g, "")
    )
    .join("");

  const championData = champion.data || {};
  const searchedChampion = championData[filteredChampion];

  function handleSearchError() {
    if (filteredChampion === undefined) {
      return <h1 className="search-not-found">Sorry, champion not found.</h1>;
    } else {
      return <h1 className="search-not-found">Loading...</h1>;
    }
  }

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json"
        );
        const versionData = await versionRes.json();
        const latestVersion = versionData[0];
        setLatestVersion(latestVersion);

        const allChampionsRes = await fetch(
          `${apiLeague.apiBase + latestVersion + apiLeague.allChampionsURL}`
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
          apiLeague.apiBase +
          latestVersion +
          apiLeague.championDataURL +
          filteredData[0]
        }.json
        `);
        const championData = await championDataRes.json();
        setChampion(championData);

        const bioData = await fetchBiographyData();
        setBiographyText(bioData);
      } catch (error) {
        console.log("Error fetching champion data:", error);
      }
    };
    fetchChampions();
  }, [searchSubmitted]);

  return (
    <>
      {console.log(searchedChampion)}
      {onSearchSubmitted(false)}
      <div className="lore">
        {searchedChampion ? (
          <div className="lore-container">
            <div>
              <div className="splash-container">
                <img
                  className="lore-splash"
                  src={`${
                    apiLeague.apiBase +
                    apiLeague.splashImageURL +
                    searchedChampion.id
                  }_0.jpg`}
                  alt=""
                />
              </div>

              <div className="lore-header">
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
              </ul>

              <div className={activeTab === 1 ? "biography" : "hide-content"}>
                <h2>Who is {searchedChampion.name}?</h2>

                <p>
                  {biographyText && biographyText[filteredChampion]?.biography}
                </p>
              </div>

              <div
                className={
                  activeTab === 2 ? "skills-container" : "hide-content"
                }
              >
                <div className="skills-header">
                  <img
                    src={`${
                      apiLeague.apiBase +
                      latestVersion +
                      apiLeague.squareImageURL +
                      filteredChampion
                    }.png`}
                    alt=""
                  />
                  <h1>{searchedChampion.name} - Skills</h1>
                </div>
                <div className="abilities">
                  <div className="passive">
                    <img
                      src={`${
                        apiLeague.apiBase +
                        latestVersion +
                        apiLeague.passiveURL +
                        searchedChampion.passive.image.full
                      }`}
                      alt=""
                    />
                    <div className="separator"></div>
                    <div>
                      <p className="passive-name">
                        {searchedChampion.passive.name}
                      </p>
                      <p>{searchedChampion.passive.description}</p>
                    </div>
                  </div>
                  {Object.values(searchedChampion.spells).map(
                    (skill, index) => (
                      <div key={index} className="skill">
                        <img
                          src={`${
                            apiLeague.apiBase +
                            latestVersion +
                            apiLeague.abilitiesURL +
                            skill.id
                          }.png`}
                          alt={index}
                        />
                        <div className="separator"></div>
                        <div>
                          <p className="skill-name">{skill.name}</p>
                          <p>{skill.description}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          handleSearchError()
        )}
      </div>
    </>
  );
}

Lore.propTypes = {
  search: PropTypes.string,
  searchSubmitted: PropTypes.bool,
  onSearchSubmitted: PropTypes.func,
};
