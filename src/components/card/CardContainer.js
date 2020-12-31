import React from 'react';
import {
  tbrDecks
} from '../../lib/data.js';
import Card from './Card';
import './Card.css';

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCards = (props) => {
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
        console.log('should deal based on a randomly selected deck')
        break;

      default:
        // all else
        console.log('default deal')
        starterDeck = Object.assign({}, tbrDecks[chosenDeck]);

        // randomize & select correct number

        // render cards with deck name included

        break;
    }
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
        selectedCards.push(index, index + 1);
      }
    selectedCards.length = bookQuant;
    return selectedCards
  }

  render() {
    return ( <
      div className = "CardContainer" > {
        this.renderCards(this.props)
      } <
      /div>
    );
  }
}

export default CardContainer;