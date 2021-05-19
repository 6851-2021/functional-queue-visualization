import React from 'react';
import './App.css';
import { InputComponent } from "./Input";
import { StacksView } from "./StacksView";
import { Queue } from './functional';
import { Versions } from './Versions';
import { Graph } from './Graph';
import { InfoOutlined } from '@ant-design/icons';
import { Button, notification, Row, Col, Typography } from 'antd';

import { hierarchy } from 'd3-hierarchy';

const { Title } = Typography;
const info_description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac nisl elementum, venenatis eros quis, laoreet tellus. Aenean vel fermentum lectus. Duis pulvinar fringilla orci, et dignissim turpis ultrices dignissim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus accumsan ut libero ac mattis. Morbi elementum enim sed risus imperdiet, eu consectetur erat faucibus. Curabitur imperdiet et ante nec aliquam. Suspendisse in nibh maximus tellus fermentum sollicitudin in at augue. Maecenas mollis mattis quam tristique placerat. Vestibulum eget lobortis risus. Nullam vitae suscipit ex, faucibus blandit ligula. Duis lobortis nulla et mollis fringilla. Nulla tempus, lacus aliquet consectetur facilisis, ex eros rutrum libero, eu suscipit ipsum turpis vel lorem. Vivamus mollis facilisis risus quis auctor. Duis scelerisque vestibulum leo. Etiam magna tortor, venenatis tincidunt dignissim eu, mollis vel ipsum. Morbi sagittis odio quis magna bibendum luctus. Sed fringilla eros id ligula iaculis faucibus. Donec vehicula vestibulum felis a interdum. Quisque sagittis, erat a pretium feugiat, mi magna tempus orci, nec pretium tellus neque eget erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sagittis elit at ligula vehicula, eu pellentesque turpis mollis. Cras mi arcu, lacinia sed vulputate quis, mollis quis enim. Maecenas scelerisque maximus est, sit amet commodo massa sodales vitae. Vestibulum hendrerit luctus euismod. Proin et erat vestibulum elit mattis pharetra. Integer ultrices commodo dui, eu vehicula lectus pulvinar quis. In sodales orci lectus, quis euismod nulla rhoncus nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec ac metus nunc. Nulla posuere nisl vitae congue feugiat. Phasellus ac purus eget diam dignissim pellentesque et non tellus. In commodo efficitur elementum. Vivamus mollis ante eget gravida lobortis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam fringilla laoreet sapien, et pellentesque ligula consectetur at. Aliquam sed pellentesque leo. Nulla vel risus justo. Fusce facilisis semper dui, sed semper ante tincidunt sed. Donec non dictum ipsum. Praesent commodo ipsum quam, at mattis velit mattis vitae. Vestibulum varius commodo felis ut consequat. Suspendisse nec nunc egestas, dictum ante nec, accumsan erat. Suspendisse lorem metus, commodo vitae volutpat aliquet, vehicula vitae velit. Praesent rhoncus turpis urna, nec pharetra arcu condimentum non. Sed ut arcu et dui faucibus pulvinar a quis purus. Donec et porta sapien. Etiam auctor eu mi ac iaculis.";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { queues: [Queue.emptyQueue()], parents: [-1], cur: 0, ops: [[{ new_queue: Queue.emptyQueue(), move_type: "CREATE", stacks: [] }]],  moveNum: 0, stepMode: "auto", speed: 50, notificationButtonVisible: true};
        this.graphData =  {
            name: "Q0",
            children: [
            ]
        };
        this.root = hierarchy(this.graphData, d => (this.graphData.children));
        this.root.id = 0;
        this.hashmap = {'0':this.root}; // idx: node
    }

    updateQueue = (q, moves) => {
        const newIdx = this.state.queues.length;
        const parentIdx = this.state.cur;
        
        const queues = this.state.queues.concat([q]);
        const ops = this.state.ops.concat([moves]);
        const parents = this.state.parents.concat([this.state.cur]);
        console.log("changes one-by-one", moves);
        const num_moves = moves.length;
        this.setState({ queues: queues, parents: parents, cur: queues.length - 1, ops: ops, moveNum: (this.state.stepMode == "end" ? num_moves - 1: 0)});
        clearInterval(this.interval);
        if (this.state.stepMode == "auto") this.runAuto();

        this.updateGraph(parentIdx, newIdx);
    }
    
    updateGraph = (parentIdx, newIdx) => {
        let parentNode = this.hashmap[parentIdx];
        console.log('parent node is ', parentNode);
        
        var newNodeObj = {
            name: "Q" + newIdx.toString(),
            attributes: [],
            children: []
        };
        var newNode = hierarchy(newNodeObj);
        newNode.depth = parentNode.depth + 1; 
        newNode.height = parentNode.height - 1;
        newNode.parent = parentNode; 
        newNode.id = newIdx;
        this.hashmap[newIdx] = newNode; 
        if(!parentNode.children){
            parentNode.children = [];
            parentNode.data.children = [];
        }
        parentNode.children.push(newNode);
        parentNode.data.children.push(newNode.data);
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
        const moves = [];
	    console.log("head:", Queue.head(this.curQueue()));
        const q = Queue.pop(this.curQueue(), moves);
        this.updateQueue(q, moves);
    };

    setVersion = (i) => {
        this.setState({cur: i, moveNum: this.state.ops[i].length - 1});
    }

    // only should be called for button presses, not internally
    setMoveNum = (i) => {
        if (i >= 0 && i < this.curOp().length) {
            this.setState({moveNum: i});
            clearInterval(this.interval);
        }
    }

    setStepMode = (stepMode) => {
        this.setState({stepMode: stepMode});
        
        const numMoves = this.curOp().length;
	    if (stepMode == "end") this.setState({moveNum: numMoves - 1});
        else if (stepMode == "auto") {
            this.runAuto();
        }
    }

    setSpeed = (speed) => {
        this.setState({speed: speed});
        console.log("new speed: ", speed);
    }

    runAuto = () => {
        const handleInterval = () => {
            console.log("running");
            const numMoves = this.curOp().length;
            const moveNum = this.state.moveNum;
            if (moveNum + 1 < numMoves) {
                this.setState({moveNum: moveNum + 1});
            }
            if (moveNum + 2 >= numMoves) {
                clearInterval(this.interval);
            }
        };
        const speed = this.state.speed;
        const x = 10 + speed;
        const waittime = 50000/x;
        this.interval = setInterval(handleInterval, waittime);
    }

    notificationClose = () => {
        this.state.notificationButtonVisible = true;
        console.log(this.state.notificationButtonVisible);
    }

    openNotificationWithIcon = (type) => {
        this.state.notificationButtonVisible = false;
        console.log(this.state.notificationButtonVisible);
        const key = "notification";
        notification[type]({
          key,  // only display one notification at a time
          message: 'What is this?',
          description: info_description,
          duration: 0,  // don't auto-close the notification
          onClose: this.notificationClose,
        });
    }

    render() {
        const op = this.curOp();
        const moveNum = this.state.moveNum;
        const move = op[moveNum];

        return (
            <div className="App">
                <Row type="flex" align="middle" justify="center">
                    <Col span={16} offset={4}><div class="title"><Title>Functional Queue Visualizer</Title></div></Col>
                    <Col span={4}><Button onClick={() => this.openNotificationWithIcon('info')} shape="circle" icon={<InfoOutlined />} style={{display:this.state.notificationButtonVisible ? "" : "none"}}></Button></Col>
                </Row>

                <InputComponent push={this.push} pop={this.pop} disabled={this.curQueue().size === 0}></InputComponent>

                <div className="stacks">
                    <h2> Stacks </h2>
                    <div id="stacksID">
                    <StacksView move={move} moveNum={moveNum} numMoves={op.length} setMoveNum={this.setMoveNum} setStepMode={this.setStepMode} setSpeed={this.setSpeed} stepMode={this.state.stepMode}> </StacksView>
                    </div>
                </div>
                <br/>
                <Row type="flex" justify="center">
                    <Col span={24}>
                        <div className="history">
                            <h2> Versions </h2>
                            {/* <Versions queues={this.state.queues} parents={this.state.parents} cur={this.state.cur} setVersion={this.setVersion}></Versions> */}
                            <Graph data={this.graphData} width={600} height={400} setVersion={this.setVersion} queues={this.state.queues} cur={this.state.cur} root={this.root}/>
                        </div>
                    </Col>
                </Row>
                    
            </div>
        );
    }

}

export default App;
