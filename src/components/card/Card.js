import './Card.css';

function Card(props) {
  function handleClick(e) {
    e.currentTarget.classList.toggle('is-flipped');
  }
  return (
    <div className="Card">
      <div className="promptCard" onClick={handleClick}>
        <div className="card__face card__face--front">
          <p>{props.cardName}</p>
        </div>
        <div className="card__face card__face--back">
          <p>Book {props.cardNum}</p>
          <p>{props.cardPrompt}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
