import React from 'react';
import './App.css';
import CardContainer from '../card/CardContainer';
import Prompter from '../prompter/Prompter';
// import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phase: 'start'
    };
  };

  render() {
    return (
      <div className="App">
        <header>TBR Planner</header>
        <Prompter/>
        {/* <CardContainer/> */}
      </div>
    );
  }
}

export default App;
