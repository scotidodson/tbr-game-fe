import React from 'react';
import './App.css';
import CardContainer from '../card/CardContainer';
import Prompter from '../prompter/Prompter';
// import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dealCards: false
    };
  };

  renderCards = (selection) => {
    console.log('render cards')
    debugger
  }

  render() {
    return (
      <div className="App">
        <header>TBR Planner</header>
        <Prompter renderCards={this.renderCards}/>
        {this.state.dealCards?<CardContainer/>:null}
      </div>
    );
  }
}

export default App;
