import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import Loading from "./components/Loading";
import "./App.css";

const App = () => {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  // const [favorite, setFavorite] = useState([]);
  const [favorite, setFavorite] = useState(
    () => JSON.parse(localStorage.getItem("favorites")) || []
  );

  const error = (err) => toast.error(err, { className: "toast" });
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
    const controler = new AbortController();
    const signal = controler.signal;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${search}`,
          { signal }
        );
        setcharacters(data.results);
      } catch (err) {
        // setcharacters([]);
        if (!axios.isCancel())
          error(`${err.response.data.error}. Most relevant results are shown`);
      } finally {
        setIsLoading(false);
      }
    };
    if (search.length > 0 && search.length < 3) {
      toast.error("Atleast 3 letters needed to Search");
      return;
    }
    fetchData();
    return () => {
      controler.abort();
    };
  }, [search]);

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
