import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo/f37469473209043ce8ad3236c1992736-removebg-preview.png";
import { useState } from "react";
import { Character } from "./CharacterList";
import Modal from "./Modal";

function NavBar({ children }) {
  return (
    <nav className="nav">
      {/* <img className="nav__logo" src={logo} />
      <input className="text-field" type="text" placeholder="Search..." />
      <div className="nav__result">Found {numOfResult} Characters</div>
      <button className="heart">
        <HeartIcon />
        <span className="badge">5</span>
      </button> */}

      <Logo />

      {/* <SearchResult numOfResult={numOfResult} /> */}
      {children}
    </nav>
  );
}

export default NavBar;

function Logo() {
  return <img className="nav__logo" src={logo} />;
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="text-field"
      type="text"
      placeholder="Search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="nav__result">Found {numOfResult} Characters</div>;
}

export function Favorites({ favorites, onDeleteFavorite }) {
  console.log(favorites);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    console.log("Toggle Modal - isOpen:", !isOpen);
    setIsOpen((is) => !is);
  };

  return (
    <div>
      <Modal title="List Of Favourite" open={isOpen} onOpen={setIsOpen}>
        <div className="characters-list">
          {favorites.map((character) => (
            <Character key={character.id} character={character}>
              <div
                className="icon"
                onClick={() => onDeleteFavorite(character.id)}
              >
                <TrashIcon />
              </div>
            </Character>
          ))}
        </div>
      </Modal>
      <button className="heart" onClick={toggleModal}>
        <HeartIcon />
        <span className="badge">{favorites.length}</span>
      </button>
    </div>
  );
}
