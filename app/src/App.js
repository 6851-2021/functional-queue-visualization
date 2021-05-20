import React from 'react';

import { InfoOutlined } from '@ant-design/icons';
import { Button, notification, Row, Col, Typography, Switch } from 'antd';
import { hierarchy } from 'd3-hierarchy';

import './App.css';
import { InputComponent } from "./Input";
import { StacksView } from "./StacksView";
import { Queue } from './functional';
import { Versions } from './Versions';
import { Graph } from './Graph';
import { info_description } from './Info';

const { Title } = Typography;
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { queues: [Queue.emptyQueue()], parents: [-1], cur: 0, ops: [[{ new_queue: Queue.emptyQueue(), move_type: "CREATE", stacks: [] }]],  moveNum: 0, stepMode: "auto", speed: 50, notificationButtonVisible: true, displayLinear:true};
        this.graphData =  {
            name: "0",
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
            name: newIdx.toString(),
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

    enqueue = (val) => {
        const moves = [];
        const q = Queue.enqueue(this.curQueue(), val, moves);
        console.log("just pushed. moves are", moves);
        this.updateQueue(q, moves);
    };

    dequeue = () => {
        const moves = [];
	    console.log("head:", Queue.head(this.curQueue()));
        const q = Queue.dequeue(this.curQueue(), moves);
        this.updateQueue(q, moves);
    };

    setVersion = (i) => {
        this.setState({cur: i, moveNum: 0});
        clearInterval(this.interval);
        if (this.state.stepMode == "auto") this.runAuto();
    }

    // only should be called for button presses, not internally
    setMoveNum = (i) => {
        if (i >= 0 && i < this.curOp().length) {
        // if (i >= 0 && i < this.curOp().length) {
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
        const waittime = 100000/x;
        this.interval = setInterval(handleInterval, waittime);
    }

    notificationClose = () => {
        this.setState({notificationButtonVisible: true});
    }

    openNotificationWithIcon = (type) => {
        this.setState({notificationButtonVisible: false});
        const key = "notification";
        notification[type]({
          key,  // only display one notification at a time
          message: 'Introduction to Functional Queues',
          description: info_description,
          duration: 0,  // don't auto-close the notification,
          onClose: this.notificationClose,
        });
    }
    displayVersionView = (isLinear) => {
        this.setState({displayLinear: isLinear});
    }

    render() {
        // let op = this.curOp();
        // let moveNum = this.state.moveNum;
        // let move = op[moveNum];

        const op = this.curOp();
        const moveNum = this.state.moveNum;
        const move = op[moveNum];
        
        let versionView;
        if (this.state.displayLinear) {
            versionView = <Versions queues={this.state.queues} parents={this.state.parents} cur={this.state.cur} setVersion={this.setVersion}></Versions>;
        } else {
            versionView = <Graph data={this.graphData} width={600} height={400} setVersion={this.setVersion} queues={this.state.queues} cur={this.state.cur} root={this.root}/>;
        }

        return (
            <div className="App">
                 
                <Row type="flex" align="middle" justify="center">
                    <Col span={16} offset={4}><div className="title"><Title>Functional Queue Visualizer</Title></div></Col>
                    <Col span={4}><Button id="notif-button" onClick={() => this.openNotificationWithIcon('info')} shape="circle" icon={<InfoOutlined />} style={{display:this.state.notificationButtonVisible ? "" : "none"}}></Button></Col>
                </Row>

                <InputComponent push={this.enqueue} pop={this.dequeue} disabled={this.curQueue().size === 0}></InputComponent>
                <h2> Functional Stacks </h2>
		<div className="stacks">
                    <div id="stacksID">
                    <StacksView move={move} moveNum={moveNum} numMoves={op.length} setMoveNum={this.setMoveNum} setStepMode={this.setStepMode} setSpeed={this.setSpeed} stepMode={this.state.stepMode} opNum={this.state.ops.length}></StacksView>
                    </div>
                </div>
                <br/>
                <div className="history">
                    <Row type="flex" align="middle" justify="center">
                        <Col span={4} offset={4}>
                            <div class="title-h2"><h2> Version History </h2></div>
                        </Col>
                        <Col span={4}>
                            <div class="toggleVersions"> 
                                <Switch onClick={(checked) => this.displayVersionView(checked)} checkedChildren="linear" unCheckedChildren="graph" defaultChecked />
                            </div>
                        </Col> 
                    </Row>
                    {versionView}
                </div>        
            </div>
        );
    }

}

export default App;
