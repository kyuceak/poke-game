import "../styles/pokemon-card-style.css"

function PokemonCard({poke,handleCardSelect})
{

    console.log(poke)

    return (
        <div className="poke-card" onClick={() => handleCardSelect(poke.id)}>
            <img src={poke.image} />
            <p>{poke.name}</p>
        </div>
    )

}



export default PokemonCard;