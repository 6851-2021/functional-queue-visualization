import React from 'react';
import './App.css';
import { InputComponent } from "./Input";
import { StacksView } from "./StacksView";
import { Queue } from './functional';
import { Versions } from './Versions';
import { RightSquareFilled } from '@ant-design/icons';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { queues: [Queue.emptyQueue()], parents: [-1], cur: 0, ops: [[{ new_queue: Queue.emptyQueue(), move_type: "CREATE", stacks: [] }]],  moveNum: 0, speed: "auto"};
    }

    updateQueue = (q, moves) => {
        const queues = this.state.queues.concat([q]);
        const ops = this.state.ops.concat([moves]);
        const parents = this.state.parents.concat([this.state.cur]);
        console.log("changes one-by-one", moves);
        const num_moves = moves.length;
        this.setState({ queues: queues, parents: parents, cur: queues.length - 1, ops: ops, moveNum: (this.state.speed == "end" ? num_moves - 1: 0)});
        clearInterval(this.interval);
        if (this.state.speed == "auto") this.runAuto();
    }

    curQueue = () => {
        return this.state.queues[this.state.cur];
    }

    curOp = () => {
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

    // only should be called for button presses, not internally
    setMoveNum = (i) => {
        if (i >= 0 && i < this.curOp().length) {
            this.setState({moveNum: i});
            clearInterval(this.interval);
        }
    }

    setSpeed = (speed) => {
        this.setState({speed: speed});
        
        const numMoves = this.curOp().length;
	    if (speed == "end") this.setState({moveNum: numMoves - 1});
        else if (speed == "auto") {
            this.runAuto();
        }
    }

    runAuto = () => {
        const handleInterval = () => {
            console.log("running");
            const numMoves = this.curOp().length;
            const moveNum = this.state.moveNum;
            if (moveNum + 1 < numMoves) {
                this.setState({moveNum: moveNum + 1});
                if (moveNum + 2 >= numMoves) {
                    clearInterval(this.interval);
                }
            }
        };
        this.interval = setInterval(handleInterval, 500);
    }

    render() {
        const op = this.curOp();
        const moveNum = this.state.moveNum;
        const move = op[moveNum];

        return (
            <div className="App">
                <h1>Functional Queue Visualizer</h1>

                <InputComponent push={this.push} pop={this.pop}></InputComponent>

                <div className="stacks">
                    <h2> Stacks </h2>
                    <div id="stacksID">
                    <StacksView move={move} moveNum={moveNum} numMoves={op.length} setMoveNum={this.setMoveNum} setSpeed={this.setSpeed} speed={this.state.speed}> </StacksView>
                    </div>
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
