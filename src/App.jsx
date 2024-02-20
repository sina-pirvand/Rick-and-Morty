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
  const error = (err) => toast.error(err);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        // if (!res.ok) throw new Error("something went wrong");
        // const data = await res.json();
        setcharacters(data.results);
        setTimeout(() => {}, 1500);
      } catch (err) {
        setTimeout(() => {
          // error(err.message);
          error(err.response.data.error);
        }, 2000);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="app">
          <Navbar numOfResult={characters.length} />
          <div className="main">
            <CharacterList characters={characters} />
            <CharacterDetail />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
