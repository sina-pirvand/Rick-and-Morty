import { ArrowUpRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CharacterList = ({ characters, onSelectCharacter, selectedId }) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="characters-list">
      {characters.slice(0, showAll ? characters.length : 5).map((item) => (
        <Character item={item} key={item.id}>
          <button
            className="icon green"
            onClick={() => {
              onSelectCharacter(item.id);
              handleScrollTop();
            }}
          >
            {selectedId === item.id ? <EyeIcon /> : <ArrowUpRightIcon />}
          </button>
        </Character>
      ))}
      {characters.length > 5 && (
        <button
          onClick={toggleShowAll}
          className="btn btn--primary"
          style={{ margin: "1rem auto", display: "inherit" }}
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      )}
    </div>
  );
};
export default CharacterList;

export const Character = ({ item, children }) => {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "🧑" : "👱‍♀️"} </span>
        <span> {item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${item.status === "Dead" ? "red" : ""}`}>
          {item.satus}
        </span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  );
};
