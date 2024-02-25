import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowUpCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import "./characterDetail.css";

const CharacterDetail = ({ selectedId, handleAddFavorite, isFavorite }) => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodeData].flat());
      } catch (err) {
        toast.error(
          `Could not get Character detail 
        (${err.message})`,
          { className: "toast" }
        );
      }
    };
    fetchData();
  }, [selectedId]);

  return (
    <div style={{ flex: 1 }}>
      <Toaster />
      {character ? (
        <div className="character-detail">
          <img
            src={character.image}
            alt={character.name}
            className="character-detail__img"
          />
          <div className="character-detail__info">
            <h3 className="name">
              <span>{character.gender === "Male" ? "🤵" : "👩‍💼"} </span>
              <span> {character.name}</span>
            </h3>
            <div className="info">
              <span
                className={`status ${character.status === "Dead" ? "red" : ""}`}
              ></span>
              <span> {character.status}</span>
              <span> - {character.species}</span>
            </div>
            <div className="location">
              <p>Last Known Location:</p>
              <p>{character.location.name}</p>
            </div>
            <div className="actions">
              {isFavorite ? (
                <p className="favorite-text">Favorite Character ❤</p>
              ) : (
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    handleAddFavorite(character);
                  }}
                >
                  Add to Favorite
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="character-episodes">
        <div className="character-episodes">
          <div className="title">
            <h2>List of Episodes:</h2>
            <button>
              <ArrowUpCircleIcon className="icon" />
            </button>
          </div>
          <ul>
            {episodes.slice(0, showAll ? episodes.length : 4).map((item, i) => (
              <li key={item.id}>
                <div>
                  {String(i + 1).padStart(2, "0")}: {item.episode}:{item.name}
                  <strong>{item.name}</strong>
                </div>
                <div className="badge badge--secondary">{item.air_date}</div>
              </li>
            ))}
          </ul>
          {episodes.length > 4 && (
            <button
              className="btn btn--primary show-all-btn"
              onClick={toggleShowAll}
            >
              {showAll ? (
                <ChevronDoubleUpIcon className="icon-sm" />
              ) : (
                <ChevronDoubleDownIcon className="icon-sm" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default CharacterDetail;
