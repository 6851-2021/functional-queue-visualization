import React from 'react';
import './App.css';
import { Input } from "./Input";
import { StacksView } from "./StacksView";
import { Queue } from './functional';
import { Versions } from './Versions';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { queues: [Queue.emptyQueue()], parents: [-1], cur: 0, ops: [[{ new_queue: Queue.emptyQueue(), move_type: "CREATE", stacks: [] }]] };
    }

    updateQueue = (q, moves) => {
        const queues = this.state.queues.concat([q]);
        const ops = this.state.ops.concat([moves]);
        const parents = this.state.parents.concat([this.state.cur]);
        console.log("changes one-by-one", moves);
        this.setState({ queues: queues, parents: parents, cur: queues.length - 1, ops: ops });
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

    setVersion = (i) => {
        this.setState({cur: i});
    }

    render() {
        const ops = this.curOps();
        const move = ops[ops.length - 1];
        const stackNames = ['INS', 'POP', 'POPrev', 'POP2', 'INS2', 'HEAD'];
        const stack = <StacksView move={move} stackNames={stackNames}> </StacksView>

        return (
            <div className="App">
                <h1>Functional Queue Implementation</h1>

                <Input push={this.push} pop={this.pop}></Input>

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
                    <Versions queues={this.state.queues} parents={this.state.parents} cur={this.state.cur} setVersion={this.setVersion}></Versions>
                </div>

            </div>
        );
    }

}

export default App;
