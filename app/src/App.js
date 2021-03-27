import React from 'react'; 
import './App.css';
import { Queue } from './functional'; 
import { ArrowLeftOutlined } from '@ant-design/icons';

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
    let stackArr = [this.state.q.INS, this.state.q.POP, this.state.q.POPrev, this.state.q.POP2, this.state.q.INS2, this.state.q.HEAD];
    let stackNames = ['INS stack', 'POP stack', 'POPrev stack', 'POP2 stack', 'INS2 stack', 'HEAD stack'];
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

        {stackArr.map((s, j) => 
          <div className="stackDiv">
            {stackNames[j]}: {s.listAllElements().map((e, i) => 
              i > 0 ? <><ArrowLeftOutlined /><div className="element">{e}</div></> : 
                      <div className="element"> {e}</div>
            )}
          </div>
        )}
      </div>
    );
  }
  
}

export default App;
