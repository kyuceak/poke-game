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

  function generateNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }
  const fetchPokemonData = async () => {
    let count = difficultySettings[difficulty]; // Number of Pokémon to fetch
    let promises = [];
    let list = [];

    for (let i = 0; i < count; i++) {
      let randomNum = generateNumber(100); // generate random Pokémon ID
      if (list.includes(randomNum)) {
        count++;
        continue;
      } else {
        list.push(randomNum);
      }

      // push fetch promises into the array
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
          .then((response) => response.json())
          .then((data) => ({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
          }))
          .catch((error) => {
            console.error(
              `Failed to fetch Pokémon with ID ${randomNum}:`,
              error
            );
          })
      );
    }

    try {
      const fetchedData = await Promise.all(promises); // wait for all requests to complete
      setPokemonData(fetchedData.filter(Boolean));
      setLoading(false);
      setGameStarted(true);
    } catch (error) {
      console.error("Failed to fetch all Pokémon data:", error);
    }
  };

  useEffect(() => {
    if (difficulty) {
      fetchPokemonData();
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
  };

  const advanceLevel = () => {
    debugger; // eslint-disable-line no-debugger

    setSelectedCards([]);
    setScore(0);

    if (difficulty == "Easy") {
      setDifficulty("Medium");
    } else if (difficulty == "Medium") {
      setDifficulty("Hard");
    }
    setResetToggle(!resetToggle);
  };

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

          {gameLost && (
            <GameOver
              resetLevel={resetLevel}
              resetGame={resetGame}
              setLoading={setLoading}
              setGameLost={setGameLost}
            />
          )}
          {score == difficultySettings[difficulty] && (
            <GameWin
              resetGame={resetGame}
              setLoading={setLoading}
              advanceLevel={advanceLevel}
            />
          )}
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
