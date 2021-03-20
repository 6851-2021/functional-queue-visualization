import React from 'react'; 
import './App.css';
import { Queue } from './functional'; 

class App extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = {value: '', q: new Queue()};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  push = (val) => {
    console.log("pushing", val); 
    this.setState({value: val, q: Queue.push(this.state.q, val)}); 
  };

  head = () => {
    console.log("head"); 
    console.log(Queue.head(this.state.q)); 
  };

  pop = () => {
    console.log("popping"); 
    this.setState({q: Queue.pop(this.state.q)});
  };

  handleSubmit(event) {
    event.preventDefault();
    this.push(parseInt(this.state.value)); 
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <h1>Functional Queue Implementation</h1>
        <div className="functions">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input className="inputs" type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input className="inputs" type="submit" value="Insert" />
        </form>

        <button onClick={this.pop}>Delete</button>
        </div>

        {'INS stack: ' + this.state.q.INS.listAllElements()}<br></br>
        {'POP stack: ' + this.state.q.POP.listAllElements()}<br></br>
        {'POPrev stack: ' + this.state.q.POPrev.listAllElements()}<br></br>
        {'POP2 stack: ' + this.state.q.POP2.listAllElements()}<br></br>
        {'INS2 stack: ' + this.state.q.INS2.listAllElements()}<br></br>
        {'HEAD stack: ' + this.state.q.HEAD.listAllElements()}<br></br>
      </div>
    );
  }
  
}

export default App;
