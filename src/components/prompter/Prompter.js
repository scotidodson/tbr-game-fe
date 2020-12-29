import React from 'react';
import Button from '../button/Button';
import {monthObj,monthArr} from '../../utils/data.js';
import './Prompter.css';


class Prompter extends React.Component {
  state = {
    phase: 'start',
    month: null
  };

  
  
  handleClick = (e) => {
    console.log('button clicked')
    const selection = e.target.innerText || '';

    if (monthArr.includes(selection)) {
      this.setState({
        phase: 'quantity',
        month: selection
      })
    } 
  }

  getMonthButtons = () => {
    let monthButtons = [];
    monthArr.forEach( x => {
      monthButtons.push(<Button label={x} handleClick={this.handleClick}/>)
    })  
    return monthButtons
  }

  getPrompt = (phase) => {
    switch (phase) {
      case 'start':
        return <div>
                  <p>Let's get started!</p>
                  <p>Choose a month to plan...</p>
                  <div className="month-buttons-container">
                    {this.getMonthButtons()}
                  </div>
                </div>

      case 'quantity':
        return <div>
                  <p>Okay, how many books would you like to read in {this.state.month}?</p>
                  {/* replace with icons of shadded out calendars? */}
                  
                </div>


      case 'start':
        return <div>
                  <p>Let's get started!</p>
                  <p>Are you planning for one or more months?</p>
                  <Button label="one"/>
                  <Button label="more"/>
                </div>

      default:
        break;
    }
  }

  render() {
    return (
      <div className="Prompter">
          <div>
          {this.getPrompt(this.state.phase)}
          </div>
          {/* how many months? */}
      </div>
    );
  }
}

export default Prompter;
