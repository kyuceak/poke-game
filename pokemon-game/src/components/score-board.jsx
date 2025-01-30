import "../styles/score-style.css"

function ScoreBoard({ score, highScore, totalCards }) {
    


  return (
    <div className="header">
      <h2>Poke Memory Cards!</h2>
      
      <div className="scores">
      <h4>Score:{score}</h4>
      <h4>High Score:{highScore}</h4>
      </div>
     
     <p>{score}/{totalCards}</p>

    </div>
  );
}

export default ScoreBoard;
