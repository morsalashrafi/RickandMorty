import woman from "../assets/image/woman.png";
import man from "../assets/image/man.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";

//isLoading
function CharacterList({ characters, onSelectCharacter, selectedId }) {
 
  return (
    <div className="characters-list">
      {
        //2 isLoading ? <Loader/>  :
        characters.map((character) => (
          <Character key={character.id} character={character}>
            <div
              className="icon"
              onClick={() => onSelectCharacter(character.id)}
            >
              {selectedId === character.id ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
          </Character>
        ))
      }
    </div>
  );
}

export default CharacterList;

export function Character({ character, children }) {
  return (
    <div className="list_character">
      <img
        className="character__img"
        src={character.image}
        alt={character.name}
      />
      <div className="character__info">
        <h2 className="character__name">
          <span className="character__gender">
            {character.gender === "Male" ? (
              <img src={man} alt="man" />
            ) : (
              <img src={woman} alt="woman" />
            )}
          </span>
          <span>{character.name}</span>
        </h2>
        <div className="list-item__info">
          <div className="info">
            <span
              className={`status ${
                character.status === "Dead"
                  ? "red"
                  : character.status === "unknown"
                  ? "blue"
                  : ""
              }`}
            ></span>
            <span>{character.status}</span>
            <span>--{character.species}</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
