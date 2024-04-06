// import { episodes } from "../../data/data.js";
import woman from "../assets/image/woman.png";
import man from "../assets/image/man.png";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
// import CharacterList from "./CharacterList";
import axios from "axios";
import Loader from "./Loader.jsx";
import { useEffect } from "react";

function CharacterDetail({ selectedId, onAddFavorite ,isAddFavorites}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (!character || !selectedId)
    return <div className="selectedCharacter">Please select a character</div>;

  return (
    <div>
      <CharacterSubInfo
        character={character}
        isAddFavorites={isAddFavorites}
        onAddFavorite={onAddFavorite}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDetail;


function CharacterSubInfo({ character, isAddFavorites, onAddFavorite }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="character__name">
          <span>
            {character.gender === "Male" ? (
              <img src={man} alt="man" />
            ) : (
              <img src={woman} alt="woman" />
            )}
          </span>
          <span>{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${
              character.status === "Dead"
                ? "red"
                : character.status === "unknown"
                ? "blue"
                : ""
            }`}
          ></span>
          <span>{character.status}</span>
          <span>--{character.species}</span>
        </div>
        <div className="location">
          <p>Last Known location :</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          {isAddFavorites ? (
            <p>Already Added To Favorites ✅ </p>
          ) : (
            <button
              onClick={() => onAddFavorite(character)}
              className="btn btn--primary"
            >
              Add To Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({episodes}){
  const [sortBy ,setSortBy] = useState(true);
  let sortedEpisodes;
  if(sortBy){
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }


  return (
    <div className="character-episode">
      <div className="title">
        <h2>List of Episodes</h2>
        <button onClick={()=> setSortBy(is =>!is)}>
          <ArrowUpCircleIcon className="icon" style={{rotate:sortBy ? "0deg" :"180deg"}}/>
        </button>
      </div>
      <ul className="list-ul">
        {sortedEpisodes.map((item, index) => (
          <li key={item.id} className="list-ul__li">
            <div>
              {String(index + 1).padStart(2, "0")}--{item.episode} :{" "}
              <strong className="title-strong">{item.name}</strong>
            </div>
            <div className="character-episode_airDate">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
