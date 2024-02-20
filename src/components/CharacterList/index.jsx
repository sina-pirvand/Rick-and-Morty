import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CharacterList = ({ characters }) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <div
      className="characters-list"
      style={{
        boxShadow:
          "inset 0 -3rem linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      {characters.slice(0, showAll ? characters.length : 5).map((item) => (
        <Character item={item} key={item.id} />
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

const Character = ({ item }) => {
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
        <span> -{item.species}</span>
      </div>
      <button className="icon red">
        <EyeIcon />
      </button>
    </div>
  );
};
