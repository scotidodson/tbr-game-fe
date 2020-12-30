// import '../card/CardContainer.js';
import './Button.css';

function Button(props) {

  var buttonStyle = {
    quantity: {margin: '10px 10px 10px 0',width: '80px'},
    deal: {margin: '10px 10px 10px 0',width: '150px',height: '60px'}
  };

  return (
    <button 
      className="Button" 
      type="button" 
      style={buttonStyle[props.moveTo]}
      onClick={props.handleClick}
      id={props.moveTo}>
      {props.label}
    </button>
  );
}

export default Button;
