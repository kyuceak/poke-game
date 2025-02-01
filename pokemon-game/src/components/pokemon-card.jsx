import "../styles/pokemon-card-style.css";
import Tilt from "react-parallax-tilt";
import pokemonCard from "../assets/pokemon-card.png"

function PokemonCard({ poke, handleCardSelect }) {
  return (
    <Tilt
      onClick={() => handleCardSelect(poke.id)}
      glareEnable={true}
      glareMaxOpacity={0.4}
      glarePosition="all"
      tiltMaxAngleX={25}
      tiltMaxAngleY={25}
      tiltReverse={true}
      className="mycontainer"
      
    >
      <div className="poke-card" onClick={() => handleCardSelect(poke.id)}>
        <div className="card-front">
          <img src={poke.image} draggable="false"/>
          <p>{poke.name}</p>
        </div>

        <div className="card-back">
            <img src={pokemonCard} />
        </div>
      </div>
    </Tilt>
  );
}

export default PokemonCard;
