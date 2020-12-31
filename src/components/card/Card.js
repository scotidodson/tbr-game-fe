import './Card.css';

function Card(props) {
  return (
    <div className="Card">
      <p>{props.cardName}</p>
      <p>{props.cardPrompt}</p>
    </div>
  );
}

export default Card;
