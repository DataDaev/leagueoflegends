import { useEffect, useState } from "react";
import Navigation from "./Navigation";

const apiLeague = {
  // key: "RGAPI-6cb956b6-f868-4934-a09a-8d24c70f65e2",
  base: "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/champion.json",
};

export default function Champions() {
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
  }, []);

  const champions = championImage.data || {};

  return (
    <div>
      <Navigation />
      <div className="content">
        <div className="championGallery">
          {Object.values(champions).map((champion) => (
            <div className="championCard" key={champion.key}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.name}_0.jpg`}
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
