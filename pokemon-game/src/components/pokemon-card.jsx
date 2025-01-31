import "../styles/pokemon-card-style.css"
import Tilt from "react-parallax-tilt"

function PokemonCard({poke,handleCardSelect})
{


    return (

        <Tilt 
        className="poke-card"
        onClick={() => handleCardSelect(poke.id)}
        glareEnable={true}
        glareMaxOpacity={0.4}
        
        glarePosition="all"
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        tiltReverse={true}       
        >

        <div className="poke-card" onClick={() => handleCardSelect(poke.id)}>
            <img src={poke.image} />
            <p>{poke.name}</p>
        </div>
        </Tilt>
    )

}



export default PokemonCard;