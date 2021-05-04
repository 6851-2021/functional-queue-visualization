import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Input } from "./Input";
import { StacksView } from "./StacksView";
import { Queue } from './functional';
import { Versions } from './Versions';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '', queues: [Queue.emptyQueue()], parent: [-1], cur: 0, ops: [[{new_queue: Queue.emptyQueue(), move_type: "CREATE", stacks: []}]] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateQueue = (q, moves) => {
    const queues = this.state.queues.concat([q]);
    const ops = this.state.ops.concat([moves]);
    const parent = this.state.parent.concat([this.state.cur]);
    console.log("changes one-by-one", moves);
    this.setState({ value: "", queues: queues, parent: parent, cur: queues.length - 1, ops: ops });
  }

  curQueue = () => {
    return this.state.queues[this.state.cur];
  }

  curOps = () => {
    return this.state.ops[this.state.cur];
  }

  push = (val) => {
    const moves = [];
    const q = Queue.push(this.curQueue(), val, moves);
    console.log("just pushed. moves are", moves);
    this.updateQueue(q, moves);
  };

  pop = () => {
    const original = { new_queue: this.curQueue(), move_type: "", stacks: [] };
    const moves = [original];
    const q = Queue.pop(this.curQueue(), moves);
    this.updateQueue(q, moves);
  };

  handleSubmit(event) {
    event.preventDefault();
    this.push(parseInt(this.state.value));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const ops = this.curOps();
    const move = ops[ops.length - 1];
    const stackNames = ['INS', 'POP', 'POPrev', 'POP2', 'INS2', 'HEAD'];
    const stack = <StacksView move={move} stackNames={stackNames}> </StacksView>

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
          <span className={spanClass} onClick={() => this.setState({ cur: i })}>
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
           {stack}
          </div>
            Head: {Queue.head(this.curQueue())}
        </div>
        <br />
        <div className="history" style={{ marginTop: '00px' }}>
          <h2> Versions </h2>
          <br />
          {versions}
        </div>
      </div>
    );
  }

}

export default App;
