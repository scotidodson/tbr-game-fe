import React from 'react';
import './App.css';
import CardContainer from '../card/CardContainer';
import Prompter from '../prompter/Prompter';
// import './App.css';

class App extends React.Component {
  state = {
    dealCards: false,
    cardSelections: null
  };

  renderCards = (selection) => {
    this.setState({
      dealCards: true,
      cardSelections: selection
    })
  }

  render() {
    return (
      <div className="App">
        <header>TBR Planner</header>
        <Prompter renderCards={this.renderCards}/>
        {this.state.dealCards ? <CardContainer cardSelections={this.state.cardSelections} />:null}
      </div>
    );
  }
}

export default App;
