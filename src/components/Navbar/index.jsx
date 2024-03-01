import { useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "../Modal";
import { Character } from "../CharacterList";

const Navbar = ({
  numOfResult,
  search,
  setSearch,
  favorites,
  handleRemoveFavorite,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">Logo</div>
        <input
          type="text"
          className="text-field"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="navbar__result">Found {numOfResult} Results</div>
        <button className="heart" onClick={() => setIsOpen((s) => !s)}>
          <HeartIcon className="icon" />
          <span className="badge">{favorites.length}</span>
        </button>
      </nav>
      <Modal setIsOpen={setIsOpen} isOpen={isOpen} title={"Favorites"}>
        {!favorites.length ? (
          <p className="text-white">
            You have no favorite character Yet (・︵・)
          </p>
        ) : (
          favorites.map((item) => (
            <Character key={item.id} item={item}>
              <button
                className="icon red"
                onClick={() => {
                  handleRemoveFavorite(item.id);
                }}
              >
                <TrashIcon />
              </button>
            </Character>
          ))
        )}
      </Modal>
    </>
  );
};
export default Navbar;
