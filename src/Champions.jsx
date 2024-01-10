import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import PropTypes from "prop-types";

const apiLeague = {
  base: "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json",
};

export default function Champions({ search }) {
  const [championImage, setChampionImage] = useState([]);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const championDataRes = await fetch(`${apiLeague.base}`);
        const championData = await championDataRes.json();
        setChampionImage(championData);
      } catch (error) {
        console.log("Error fetching champion data:", error);
      }
    };

    fetchChampions();
  }, [search]);

  const champions = championImage.data || {};

  return (
    <div>
      {console.log(champions)}
      <Navigation />
      <div className="content">
        <div className="championGallery">
          {Object.values(champions).map((champion) => (
            <div className="championCard" key={champion.key}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                alt=""
              />
              <p>{champion.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Champions.propTypes = {
  search: PropTypes.string,
};
