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

  const error = (err) => toast.error(err, { className: "toast" });
  const handleSelectedCharacter = (id) => {
    setSelectedId(id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${search}`
        );
        setcharacters(data.results);
      } catch (err) {
        // setcharacters([]);
        error(`${err.response.data.error}. Most relevant results are shown`);
      } finally {
        setIsLoading(false);
        console.log(characters);
      }
    };
    if (search.length > 0 && search.length < 3) {
      toast.error("Atleast 3 letters needed to Search");
      return;
    }
    fetchData();
  }, [search]);

  return (
    <>
      <Toaster />
      <Navbar
        numOfResult={characters.length}
        search={search}
        setSearch={setSearch}
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
            <CharacterDetail selectedId={selectedId} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
