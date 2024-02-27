import { useEffect, useState } from "react";
import {
  ArrowUpCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";

const EpisodesList = ({ episodes }) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
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
  );
};

export default EpisodesList;
