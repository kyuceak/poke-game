import { useEffect, useState } from "react";
import "../styles/difficulty-style.css";

function DifficultySelector({ onSelectDifficulty, loading, setLoading }) {
  const difficulties = ["Easy", "Medium", "Hard"];
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => {
          return (prevIndex + 1) % difficulties.length;
        });
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => {
          if (prevIndex === 0) {
            return difficulties.length - 1;
          }

          return (prevIndex - 1) % difficulties.length;
        });
      } else if (event.key === "Enter") {
        onSelectDifficulty(difficulties[selectedIndex]);
        setLoading(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, difficulties, onSelectDifficulty]);

  return  (
    <div className="modal">
      <div className="diff-container">
        <h2>Select Difficulty</h2>
        <div className="options">
          {difficulties.map((level, index) => (
            <button
              key={level}
              className={index === selectedIndex ? "selected" : ""}
              onClick={() => {
                setLoading(true);
                onSelectDifficulty(level);
              }}
            >
              <span
                className={`arrow ${index === selectedIndex ? "blink" : ""}`}
              >
                &#9654;
              </span>
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DifficultySelector;
