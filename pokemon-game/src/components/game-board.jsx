import PokemonCard from "./pokemon-card";
import "../styles/game-board-style.css";

function GameBoard({ pokemonData, handleCardSelect, shuffleCount }) {
  return (
    <div className="card-container">
      {pokemonData.map((poke) => {
        return (
          <PokemonCard
            key={`${poke.id}-${shuffleCount}`}
            poke={poke}
            handleCardSelect={handleCardSelect}
          />
        );
      })}
    </div>
  );
}

export default GameBoard;
