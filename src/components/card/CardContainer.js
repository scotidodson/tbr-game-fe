import React from 'react';
import {tbrDecks} from '../../lib/data.js';
import Card from './Card';
import './Card.css';

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCards = (props) => {
    const cardsToRender = this.selectCards(props) || [];
    let cardComponents = [];
    let i = 1;
    
    // for (const cardObj in cardsToRender) {
    //   return <Card key={i++} cardName={cardObj.deck} cardPrompt={cardObj.prompt} />
    // }

    cardsToRender.forEach(cardObj =>{
      cardComponents.push(<Card key={i++} cardName={cardObj.deck} cardNum ={i} cardPrompt={cardObj.prompt} />)
    })
    return cardComponents
  }

  selectCards = (props) => {
    let starterDeck = [];
    let selectedCards = [];
    const bookQuant = Number(props.cardSelections.bookQuant);
    const chosenDeck = props.cardSelections.tbrDeck;
    
    switch (chosenDeck) {
      case 'Prompt mixer!':
        // combine relevant prompts 
        for (const deckName in tbrDecks) {
          if (tbrDecks[deckName].canMix) {
            tbrDecks[deckName].prompts.forEach(x => {
              starterDeck.push({
                "deck": deckName,
                "prompt": x
              })
            })
          }
        }
        // randomize & select correct number
        selectedCards = this.randomizeCards(starterDeck);
        selectedCards = this.cutDeck(selectedCards,bookQuant);
        // render cards with deck name included
        console.log('combined, selected cards: ', selectedCards)
        break;
        
      case 'Surprise me!':
        let randomDeck = '';  
        let options = [];
        let index = 0;

        // randomly set deck name
        for (const deckName in tbrDecks) {
          if (tbrDecks[deckName].randomSelect) {
            options.push(deckName);
          }
        }
        index = Math.random() * (options.length - 1);
        randomDeck = options.slice(index, ++index)[0] || 'Genre Roulette';

        // create starterDeck array
        tbrDecks[randomDeck].prompts.forEach(x => {
          starterDeck.push({
            "deck": randomDeck,
            "prompt": x
          })
        })

        // randomize & select correct number from starterDeck; starterDeck must be array
        selectedCards = this.randomizeCards(starterDeck);
        selectedCards = this.cutDeck(selectedCards,bookQuant);

        console.log('random deck: ', randomDeck, 'cards: ', selectedCards)
        break;

      default:
        // create starterDeck array
        tbrDecks[chosenDeck].prompts.forEach(x => {
          starterDeck.push({
            "deck": chosenDeck,
            "prompt": x
          })
        })

        // randomize & select correct number from starterDeck; starterDeck must be array
        selectedCards = this.randomizeCards(starterDeck);
        selectedCards = this.cutDeck(selectedCards,bookQuant);
        console.log('chosen deck: ', chosenDeck, 'cards: ', selectedCards)
        break;
    }
    return selectedCards
  }

  randomizeCards = (starterDeck) => {
    let randomizedCards = starterDeck.map((a) => ({
        sort: Math.random(),
        value: a
      }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    return randomizedCards
  }

  cutDeck = (selectedCards, bookQuant) => {
    while (selectedCards.length <= bookQuant) {
        let index = Math.random() * (selectedCards.length - 1);
        selectedCards.push(index, ++index);
      }
    selectedCards.length = bookQuant;
    return selectedCards
  }

  render() {
    return ( 
      <div className = "CardContainer" > 
        {this.renderCards(this.props)} 
      </div>
    );
  }
}

export default CardContainer;