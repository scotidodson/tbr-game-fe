// import '../card/CardContainer.js';
import './Button.css';

function Button(props) {

  var buttonStyle = {
    margin: '10px 10px 10px 0',width: '80px'
  };

  return (
    <button 
      className="Button" 
      type="button" 
      style={buttonStyle}
      onClick={props.handleClick}>
      {props.label}
    </button>
  );
}

export default Button;
