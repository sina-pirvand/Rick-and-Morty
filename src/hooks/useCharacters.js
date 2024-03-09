import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useCharacters = (url, search) => {
  const [characters, setcharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = (err) => toast.error(err, { className: "toast" });

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}=${search}`, { signal });
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
  return { isLoading, characters };
};
export default useCharacters;
