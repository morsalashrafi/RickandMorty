import "./App.css";
import NavBar, { SearchResult } from "./components/NavBar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail.jsx";
import { allCharacters } from "../data/data.js";
import Loader from "./components/Loader.jsx";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Search } from "./components/NavBar";
import { Favorites } from "./components/NavBar";

function App() {
  //const [characters, setCharacters] = useState(allCharacters);

  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITE")) || []
  );




  // Axios
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        // console.log(data);
        setCharacters(data.results.slice(0, 5));
      } catch (error) {
        if (!axios.isCancel()) {
          console.log(error.name);
          setCharacters([]);
          console.log(error.response.data.error);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);



  useEffect(() => {
    localStorage.setItem("FAVOURITE", JSON.stringify(favorites));
  }, [favorites]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  // console.log(selectedId);

  const handleAddFavorite = (char) => {
    // setFavorites([...favorites ,char]);
    setFavorites((prevFav) => [...prevFav, char]);
    console.log(char);
  };

  const handleRemoveFavorite = (id) => {
    setFavorites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddFavorites = favorites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className="container">
      <div>
        <Toaster />
        <NavBar>
          <Search query={query} setQuery={setQuery} />
          <SearchResult numOfResult={characters.length} />
          <Favorites
            favorites={favorites}
            onDeleteFavorite={handleRemoveFavorite}
          />
        </NavBar>
      </div>
      <Main>
        {/* 1 */}
        {isLoading ? (
          <Loader />
        ) : (
          <CharacterList
            selectedId={selectedId}
            characters={characters}
            onSelectCharacter={handleSelectCharacter}
          />
        )}

        
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isAddFavorites={isAddFavorites}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
