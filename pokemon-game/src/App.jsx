import { useEffect, useState } from "react";
import DifficultySelector from "./components/difficulty-selector";
import "./App.css";
import "@fontsource/press-start-2p";
import ScoreBoard from "./components/score-board";
import GameBoard from "./components/game-board";
import GameOver from "./components/game-over";
import GameWin from "./components/game-win";
function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [resetToggle, setResetToggle] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(0);



  const difficultySettings = {
    Easy: 5,
    Medium: 10,
    Hard: 15,
  };

  const fetchPokemonData = async (limit, offset) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      const fetchedData = data.results.map((poke) => {
        const urlArr = poke.url.split("/");
        const pokeId = urlArr[urlArr.length - 2];

        const object = {
          id: pokeId,
          name: poke.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`,
        };

        return object;
      });
      setPokemonData(fetchedData);
      setLoading(false);
      setGameStarted(true);

      // console.log("GELDİM",gameStarted)
    } catch (error) {
      console.error("Failed to fetch pokemon data: ", error);
    }
  };

  useEffect(() => {
    if (difficulty) {
      fetchPokemonData(difficultySettings[difficulty], offset + 15);
      // console.log("geldim"+" load state: ",loading);

      setOffset(offset + difficultySettings[difficulty]);
    }
  }, [difficulty, resetToggle]);

  const shuffleArray = (arr) => {
    let currentIndex = arr.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr;
  };

  const handleCardSelect = (id) => {
    if (selectedCards.includes(id)) {
      console.log("You Lost!");
      setGameLost(true);
    } else {
      setSelectedCards([...selectedCards, id]);
      setScore(score + 1);
      if (score + 1 > highScore) setHighScore(score + 1);
      setPokemonData((prev) => shuffleArray([...prev]));
      setShuffleCount((prev) => prev + 1); // Force re-render by updating the key
    }
  };

  const resetLevel = () => {
    setLoading(true);
    setSelectedCards([]);
    setScore(0);
    setResetToggle(!resetToggle);
    // setGameLost(false);
  };

  const resetGame = () => {
    
    setSelectedCards([]);
    setScore(0);
    setHighScore(0);
    setDifficulty(null);
    setGameStarted(false);
    setLoading(false);
    // setGameLost(false);
  }

  const advanceLevel = () => {
    debugger; // eslint-disable-line no-debugger

    setSelectedCards([]);
    setScore(0);
    setLoading(false);
   
    if(difficulty == "Easy")
    {
      setDifficulty("Medium");
    }
    else if(difficulty == "Medium")
    {
      setDifficulty("High");
    }
    setResetToggle(!resetToggle);
     

  }

  return (
    <>
      {loading === true ? (
        <div className="loading-div">
          <h1>LOADING GAME</h1>
        </div>
        
      ) : gameStarted ? (
        <>
          <ScoreBoard
            score={score}
            highScore={highScore}
            totalCards={difficultySettings[difficulty]}
            resetGame={resetGame}
          />
          <GameBoard
            pokemonData={pokemonData}
            handleCardSelect={handleCardSelect}
            shuffleCount={shuffleCount}
          />

          {gameLost && <GameOver resetLevel={resetLevel} resetGame={resetGame} setLoading={setLoading} setGameLost={setGameLost}/>}
          {score == difficultySettings[difficulty] && <GameWin resetGame={resetGame} setLoading={setLoading} advanceLevel={advanceLevel}/>}
          
        </>
      ) : (
        <DifficultySelector
          onSelectDifficulty={setDifficulty}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default App;
