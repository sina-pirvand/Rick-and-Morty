import { useEffect, useState } from "react";
import {
  ArrowUpCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";

const EpisodesList = ({ episodes }) => {
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  //! SORT EPISODES
  // could be calculated from other states so no new state is needed
  let sortedEpisodes;
  // created => a property included in API data object
  sortBy
    ? (sortedEpisodes = [...episodes].sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      ))
    : (sortedEpisodes = [...episodes].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      ));

  return (
    <div className="character-episodes">
      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes:</h2>
          <button
            onClick={() => {
              setSortBy((sortBy) => !sortBy);
            }}
          >
            <ArrowUpCircleIcon
              className="icon"
              style={{ rotate: sortBy ? "0deg" : "180deg" }}
            />
          </button>
        </div>
        <ul>
          {sortedEpisodes
            .slice(0, showAll ? sortedEpisodes.length : 4)
            .map((item, i) => (
              <li key={item.id}>
                <div>
                  {String(i + 1).padStart(2, "0")}: {item.episode}:{item.name}
                  <strong>{item.name}</strong>
                </div>
                <div className="badge badge--secondary">{item.air_date}</div>
              </li>
            ))}
        </ul>
        {sortedEpisodes.length > 4 && (
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
