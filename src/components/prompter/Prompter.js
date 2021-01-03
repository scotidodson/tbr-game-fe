import React from 'react';
import Button from '../button/Button';
import {monthObj,monthArr,tbrDecks} from '../../lib/data.js';
import './Prompter.css';


class Prompter extends React.Component {
  state = {
    phase: 'start',
    month: null,
    tbrDeck: null,
    bookQuant: 1
  };

  componentDidUpdate() {
    console.log('updated Prompter')
    if (this.state.phase === 'deal') {
      console.log('updated deal prompter')
      this.setState({phase: 'dealt'})
      this.props.dealCards({...this.state})
      
    } 
  }

  handleClick = (e) => {
    console.log('button clicked')
    const moveTo = e.target.id || '';
    const selection = e.target.innerText || '';

    switch (moveTo) {
      case 'start':
        this.setState({
          phase: moveTo
        });
        break;
      case 'month':
        this.setState({
          phase: moveTo
        });
        break;
      case 'quantity':
        this.setState({
          phase: moveTo,
          month: selection
        });
        break;
      case 'deal':
        this.setState({
          phase: moveTo,
          tbrDeck: selection
        });
        break;
      default:
        break;
    }
  }

  handleChange = (e) => {
    const quant = e.target.value || 1;
    this.setState({
      bookQuant: quant
    });
  }

  handleSubmit = (e) => {
    if (e.preventDefault) e.preventDefault();
    const selection = (((e.target||'').querySelector('#quantSelect'))||'').value || '';
      this.setState({
        bookQuant: selection,
        phase: 'deck'
      });
  }

  getMonthButtons = () => {
    let monthButtons = [];
    monthArr.forEach( x => {
      monthButtons.push(<Button key={x} label={x} handleClick={this.handleClick} moveTo="quantity"/>)
    })  
    return monthButtons
  }

  getDeckButtons = () => {
    let deckButtons = [];
    Object.keys(tbrDecks).forEach( x => {
      deckButtons.push(<Button key={x} label={x} handleClick={this.handleClick} moveTo="deal"/>)
    })  
    return deckButtons
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
  renderDeckDescriptions = () => {
    let deckDescriptions = [];
    for (const deckName in tbrDecks) {
      deckDescriptions.push(<div key={deckName}>
                              <h3>{deckName}</h3>
                              <p>{tbrDecks[deckName]["description"]}</p>
                            </div>)
    } 
    return deckDescriptions
  }

  getPrompt = (phase) => {
    switch (phase) {
      case 'start':
        return <div>
                <p>TBR Planner helps you plan your "<span className="bold">T</span>o <span className="bold">B</span>e <span className="bold">R</span>ead" list.</p>
                <br/>
                <p>You can upload your own list of books to play with or choose a TBR deck.</p>
                <p>You choose the number of books and we'll generate your list.</p>
                <br/>
                <p>A TBR game can help shake up your reading and get you out of your comfort zone.</p>
                <p>...it can also help you break through indecision if you just have too many good books to choose where to start.</p>
                <br/>
                <p>Some of the TBR decks (such as Pulitzer Prize Winners) include actual titles.</p>
                <p>Others (like Genre Roulette) will give you prompts instead and you will choose a title for it. </p>
                <br/>
                <p>It's all for fun - happy reading!</p>
                <br/>

                <p>I want to read 
                  <span>
                    <input id="quantSelect" type="number" step="1" min="1" max="100" value={this.state.bookQuant} onChange={this.handleChange} required /> 
                  </span>
                  book{this.calcBooks('day')>1?'s':null} in  
                  <span>  
                    <select id="month" name="month">
                      <option selected>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                  </span>
                </p>
                <p>and I want to <span>  
                    <select id="method" name="method">
                      <option selected>use a TBR Planner deck</option>
                      <option>use my own list of books</option>
                    </select>
                  </span>
                </p>
                <Button label="Start" handleClick={this.handleClick} moveTo="month"/>
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
                  <p>About the decks....</p>
                  <div className="deck-info-container">
                    {this.renderDeckDescriptions()}
                  </div>
                </div>
      case 'dealt':
        return <div>
                  <p>Awesome - you selected the <span>{this.state.tbrDeck}</span> deck.</p>
                  <p>Flip the cards to reveal your {this.state.month} reading list!</p>
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
      </div>
    );
  }
}

export default Prompter;
