import "../styles/score-style.css"

function ScoreBoard({ score, highScore, totalCards,resetGame }) {
    


  return (
    <div className="header">
      <button onClick={resetGame}>Poke Memory Cards!</button>
      
      <div className="scores">
      <h4>Score:{score}</h4>
      <h4>High Score:{highScore}</h4>
      </div>
     
     <p>{score}/{totalCards}</p>

    </div>
  );
}

export default ScoreBoard;
