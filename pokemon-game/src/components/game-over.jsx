import "../styles/game-over-style.css";
import { useState, useEffect } from "react";

function GameOver({ resetLevel, resetGame,setLoading, setGameLost }) {
  console.log("came here");

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => {
          return (prevIndex + 1) % 2;
        });
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => {
          if (prevIndex === 0) {
            return 1;
          }

          return (prevIndex - 1) % 2;
        });
      } else if (event.key === "Enter") {
        if (selectedIndex === 0) {
          resetGame();
        } else {
          resetLevel();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <div className="gameover-overlay">
      <div className="over-modal">
        <h2>Game Over!</h2>
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGlsZWxvcHFtYjZsandraTE1cGlwMzkwaTg0dm5nNWNkeDg4Zno4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12Bpme5pTzGmg8/giphy.gif"
          alt=""
        />
        <div className="options">
          <button
            className={0 === selectedIndex ? "selected" : ""}
            onClick={() => {
              setGameLost(false);
              setLoading(true);
              resetLevel();
            }}
          >
            <span className={`arrow ${0 === selectedIndex ? "blink" : ""}`}>
              &#9654;
            </span>
            Play again!
          </button>
          <button
            className={1 === selectedIndex ? "selected" : ""}
            onClick={() => {
              setGameLost(false);
              setLoading(true);
              resetGame();
            }}
          >
            <span className={`arrow ${1 === selectedIndex ? "blink" : ""}`}>
              &#9654;
            </span>
            Quit Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
