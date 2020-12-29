import React from 'react';
import Button from '../button/Button';
import {monthObj,monthArr} from '../../utils/data.js';
import './Prompter.css';


class Prompter extends React.Component {
  state = {
    phase: 'start',
    month: null,
    bookQuant: 1
  };

  
  
  handleClick = (e) => {
    console.log('button clicked')
    const moveTo = e.target.id || '';
    const selection = e.target.innerText || '';

    switch (moveTo) {
      case 'start':
        this.setState({
          ...this.state,
          phase: moveTo
        })
      case 'month':
        this.setState({
          ...this.state,
          phase: moveTo
        })
      case 'quantity':
        this.setState({
          ...this.state,
          phase: moveTo,
          month: selection
        })
  
      default:
        break;
    }
  }

  handleChange = (e) => {
    const quant = e.target.value || 1;
    this.setState({
      ...this.state,
      bookQuant: quant
    })
  }

  handleSubmit = (e) => {
    if (e.preventDefault) e.preventDefault();
    const selection = (((e.target||'').querySelector('#quantSelect'))||'').value || '';
      this.setState({
        ...this.state,
        bookQuant: selection,
        phase: 'deck'
      })
  }

  getMonthButtons = () => {
    let monthButtons = [];
    monthArr.forEach( x => {
      monthButtons.push(<Button key={x} label={x} handleClick={this.handleClick} moveTo="quantity"/>)
    })  
    return monthButtons
  }

  getDeckButtons = () => {
    let monthButtons = [];
    monthArr.forEach( x => {
      monthButtons.push(<Button key={x} label={x} handleClick={this.handleClick} moveTo="quantity"/>)
    })  
    return monthButtons
  }

  calcBooks = (timeframe) => {
    const quantBooks = this.state.bookQuant;
    const calcMonth = this.state.month;
    let perTimeframe;

    switch (timeframe) {
      case 'week':
        const numWeeks = monthObj[calcMonth]/7;
        perTimeframe = Number(quantBooks/numWeeks).toFixed(1);
        if (perTimeframe < 1) perTimeframe = 'less than 1';
        return perTimeframe
      case 'day':
        perTimeframe = Number(quantBooks/monthObj[calcMonth]).toFixed(1);
        if (perTimeframe < 1) perTimeframe = 'less than 1';
        return perTimeframe
      default:
        break;
    }
  }

  getPrompt = (phase) => {
    switch (phase) {
      case 'start':
        return <div>
                <p>explanation here</p>
                <Button label="Let's plan!" handleClick={this.handleClick} moveTo="month"/>
              </div>

      case 'month':
        return <div>
                  <p>Choose a month to plan...</p>
                  <div className="month-buttons-container">
                    {this.getMonthButtons()}
                    {/* replace with icons of shadded out calendars? */}
                  </div>
                </div>

      case 'quantity':
        return <div>
                  <p>Okay, how many books would you like to read in {this.state.month}?</p>
                  <form id="book-quant-form" onSubmit={this.handleSubmit}>
                    <div>
                      <input id="quantSelect" type="number" step="1" min="1" max="100" value={this.state.bookQuant} onChange={this.handleChange} required />
                      <br/>
                      <p>That's about <span>{this.calcBooks('week')} book{this.calcBooks('week')>1?'s':null} per week</span> and <span>{this.calcBooks('day')} book{this.calcBooks('day')>1?'s':null} per day</span>.</p>
                      <input type="submit" value="Next"/>
                    </div>
                  </form>
                  
                </div>

      case 'deck':
        return <div>
                  <p>Select a TBR deck to play with:</p>
                  <div className="deck-buttons-container">
                    {this.getDeckButtons()}
                    {/* replace with images? */}
                  </div>
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
          {/* how many months? */}
          </div>
      </div>
    );
  }
}

export default Prompter;
