import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Loading from "./components/Loading";
import "./App.css";
import useCharacters from "./hooks/useCharacters";

const App = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  // const [favorite, setFavorite] = useState([]);
  const [favorite, setFavorite] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );

  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    search
  );

  const handleSelectedCharacter = (id) => {
    setSelectedId(id);
  };
  const handleAddFavorite = (character) => {
    setFavorite((prev) => [...prev, character]);
  };
  console.log(favorite);
  const isFavorite = favorite.map((item) => item.id).includes(selectedId);

  const handleRemoveFavorite = (id) => {
    setFavorite((prev) => prev.filter((fav) => fav.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <>
      <Toaster />
      <Navbar
        numOfResult={characters.length}
        search={search}
        setSearch={setSearch}
        favorites={favorite}
        handleRemoveFavorite={handleRemoveFavorite}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="app">
          <div className="main">
            <CharacterList
              characters={characters}
              onSelectCharacter={handleSelectedCharacter}
              selectedId={selectedId}
            />
            <CharacterDetail
              selectedId={selectedId}
              handleAddFavorite={handleAddFavorite}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
