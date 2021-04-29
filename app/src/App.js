import React from 'react'; 
import ReactDOM from 'react-dom';
import './App.css';
import {SingleMove} from "./SingleMove";
import { Queue } from './functional'; 
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

let lastId = -1; 
let updated = false;

class App extends React.Component {
  
  constructor(props) {
    super(props); 
    this.state = {value: '', queues: [Queue.emptyQueue()], parent: [-1], cur: 0, moves: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateQueue = (q, moves) => {
  	const queues = this.state.queues.concat([q]);
		const parent = this.state.parent.concat([this.state.cur]);
		console.log("changes one-by-one", moves);
    this.setState({value: "", queues: queues, parent: parent, cur: queues.length - 1, moves: moves});
    updated = true;	
  }

	curQueue = () => {
		return this.state.queues[this.state.cur];
	}
	
  push = (val) => {
    const original = {new_queue: this.curQueue(), move: "", stacks: []};
		const moves = [original]; 
    const q = Queue.push(this.curQueue(), val, moves);
    console.log("just pushed. moves are", moves);
  	this.updateQueue(q, moves);
	};

  pop = () => {
    const original = {new_queue: this.curQueue(), move: "", stacks: []};
		const moves = [original]; 
		const q = Queue.pop(this.curQueue(), moves);
  	this.updateQueue(q, moves);
	};

  handleSubmit(event) {
    event.preventDefault();
    this.push(parseInt(this.state.value)); 
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
      // only increment ids when there are new moves; else keep the old ids
        let id = updated?lastId:lastId-this.state.moves.length;
        const stacks = this.state.moves.map((move, i) => {
          console.log('move: ', move); 
          const queue = move.new_queue; 
          const stackArr = [queue.INS, queue.POP, queue.POPrev, queue.POP2, queue.INS2, queue.HEAD];
          const stackNames = ['INS', 'POP', 'POPrev', 'POP2', 'INS2', 'HEAD'];
          const new_move = <SingleMove key={"singleMove"+id+1} stackArr={stackArr} stackNames={stackNames} stackChanges={move.stacks} explanation={move.move} newQueue={move.new_queue} wait={3000*i} id={id+1}/>;
          id = id+1; 
          return (new_move)
        });	
      if (updated) {
        console.log("lastId is now ", id);
        lastId = id;
        updated = false;
      }

      let versions = [];
      for (let i = 0; i < this.state.queues.length; i++) {
          const q = this.state.queues[i];
          let ancs = [];
          let temp = this.state.parent[this.state.cur];
          while (temp !== -1) {
            ancs.push(temp);
            temp = this.state.parent[temp];
          }
          const spanClass = "version-ref" + (i == this.state.cur ? ' current' : '') + (ancs.includes(i) ? ' parent' : '');
          const version =
              <div key={i}>
                <span className={spanClass} onClick={() => this.setState({cur: i})}>
                  Q<sub>{i}</sub> {/*Queue.listAllElements(q).join(", ")*/} (Size {Queue.size(q)}{Queue.head(q) ? ", Head " + Queue.head(q) : ""}) 
                </span>
              </div>;
          versions.push(version);
      }
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
  
          <div className="stacks">
            <h2> Stacks </h2>
            <div id="stacksID">
              {stacks}
            </div>
            Head: {Queue.head(this.curQueue())}
          </div>
          <br />
          <div className="history" style={{marginTop: '00px'}}>
            <h2> Versions </h2>
            <br />
            {versions}
          </div>
        </div>
      );
    } 
  
}

export default App;
