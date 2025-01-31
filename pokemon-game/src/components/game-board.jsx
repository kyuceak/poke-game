import PokemonCard from "./pokemon-card";
import "../styles/game-board-style.css"

function GameBoard({pokemonData,handleCardSelect})
{

    return (
    <div className="card-container">

        
        {pokemonData.map((poke) => {
            return <PokemonCard 
            key={poke.id}
            poke={poke}
            handleCardSelect={handleCardSelect}/>
        })}


    </div>)
}



export default GameBoard;