import "../styles/game-over-style.css";
import { useState, useEffect } from "react";

function GameWin({resetGame, setLoading, advanceLevel }) {
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
          advanceLevel()
        } else {
          resetGame();
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
        <h2>You Won!</h2>
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3dhbW8zenN2cmdxYTNqMWlkOWM3Y2IweDBpbHA2ZzA1MWhjdm5tMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/e5q0CVGJab5fmW8mme/giphy.gif"
          alt=""
        />
        <div className="options">
          <button
            className={0 === selectedIndex ? "selected" : ""}
            onClick={() => {
              
              setLoading(true);
              advanceLevel()
            }}
          >
            <span className={`arrow ${0 === selectedIndex ? "blink" : ""}`}>
              &#9654;
            </span>
            Advance level
          </button>
          <button
            className={1 === selectedIndex ? "selected" : ""}
            onClick={() => {
            
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

export default GameWin;
