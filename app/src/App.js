import React from 'react'; 
import './App.css';
import { Queue } from './functional'; 
import { ArrowLeftOutlined } from '@ant-design/icons';

// sequence ins 1, ins2, ins3. assume 1 & 2 are already in the DS.
// let testcase_weak = new WeakMap();
// testcase_weak.set([1], ["ins", "pop2"]);
// console.log(testcase_weak); 
let testcase_1 = [["POP", "POPrev"], ["INS", "INS2"]];
// let testcase_1 = {1: ["POP", "POPrev"], "2,3": ["INS", "INS2"]};
// let testcase_1 = {1: ["POP", "POPrev"], 2: ["INS", "INS2"], 3: ["INS", "INS2"]}; 


class App extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = {value: '', q: new Queue()};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  push = (val) => {
    console.log("pushing", val); 
    let originalQ = this.state.q; 
    this.setState({value: val, q: Queue.push(this.state.q, val)}); 
    // let transArr = getTransition or gaurav's function --> [[], [], []]..
    // showSteps(originalQ, transArr)
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

  showSteps(ogQ, arr) {
    // TODO
  }

  render() {
    let stackArr = [this.state.q.INS, this.state.q.POP, this.state.q.POPrev, this.state.q.POP2, this.state.q.INS2, this.state.q.HEAD];
    let stackNames = ['INS', 'POP', 'POPrev', 'POP2', 'INS2', 'HEAD'];
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
          <div id={stackNames[j] + '-div'} className="stackDiv">
            {stackNames[j] + ' stack'}: {s.listAllElements().map((e, i) => 
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
