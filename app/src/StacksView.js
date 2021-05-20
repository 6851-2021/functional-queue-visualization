import React from 'react';
import { ArrowLeftOutlined, ConsoleSqlOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import './App.css';
import { Queue, Stack } from './functional';
import { Select } from 'antd';
import "antd/dist/antd.css";

const { Option } = Select;

const stackNames = ['INS', 'POP', 'POPrev', 'INS2', 'POP2', 'HEAD'];
const stackNamesHTML = {
    'INS': (<>INS</>),
    'POP': (<>POP</>),
    'POPrev': (<>POP<sub>rev</sub></>),
    'POP2': (<>POP<sub>2</sub></>),
    'INS2': (<>INS<sub>2</sub></>),
    'HEAD': (<>HEAD</>)
};
class StacksView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.onStepModeChange = this.onStepModeChange.bind(this);
        this.onSpeedChange = this.onSpeedChange.bind(this);
        this.uniqueKey = 0;
    }

    showExplanation = () => {
        const move = this.props.move;
        switch (move.move_type) {
            case 'PUSH':
                let pushStack = move.stacks[0];
                return (<>Push {move.val} onto <span className="stack-name-expl">{stackNamesHTML[pushStack]}</span></>);
            case 'POP':
                let popStack = move.stacks[0];
                return (<>Pop {move.val} from <span className="stack-name-expl">{stackNamesHTML[popStack]}</span></>);
            case 'BEGIN TRANSFER':
                return (<>Enter transfer mode (assign <span className="stack-name-expl">{stackNamesHTML['HEAD']}</span> to <span className="stack-name-expl">{stackNamesHTML['POP']}</span>)</>)
            case 'FLIP':
                let stack1 = move.stacks[0];
                let stack2 = move.stacks[1];
                return (<>Move {move.val} from <span className="stack-name-expl">{stackNamesHTML[stack1]}</span> to <span className="stack-name-expl">{stackNamesHTML[stack2]}</span></>);
            case 'END TRANSFER 1':
                return (<>End transfer mode (Part 1): assign <span className="stack-name-expl">{stackNamesHTML['INS']}</span> to <span className="stack-name-expl">{stackNamesHTML['INS2']}</span></>);
            case 'END TRANSFER 2':
                return (<>End transfer mode (Part 2): assign <span className="stack-name-expl">{stackNamesHTML['POP']}</span> to <span className="stack-name-expl">{stackNamesHTML['POP2']}</span></>);
            case 'END TRANSFER 3':
                return (<>End transfer mode (Part 3): assign <span className="stack-name-expl">{stackNamesHTML['INS2']}</span>, <span className="stack-name-expl">{stackNamesHTML['POP2']}</span>, <span className="stack-name-expl">{stackNamesHTML['POPrev']}</span>, <span className="stack-name-expl">{stackNamesHTML['HEAD']}</span> to null</>);
            case 'CREATE':
                return <>Create queue</>;
            default:
                return <></>;
        }
    }

    onStepModeChange(value) {
        this.props.setStepMode(value);
    }

    onSpeedChange(event) {
        this.props.setSpeed(parseInt(event.target.value));
    }

    render() {
        const move = this.props.move;
        const move_type = move.move_type;
        const moveNum = this.props.moveNum;
        const numMoves = this.props.numMoves;
        const setMoveNum = this.props.setMoveNum;
        const inTransferMode = Stack.size(move.new_queue["HEAD"]) > 0;
        const stacks = stackNames.map(
            (name) => {

                let enter = (move_type == 'PUSH' && move.stacks[0] == name) || (move_type == 'FLIP' && move.stacks[1] == name) || (move_type == 'BEGIN TRANSFER' && name == 'HEAD') || (move_type == 'END TRANSFER 1' && name == 'INS') || (move_type == 'END TRANSFER 2' && name == 'POP');
                let exit = (move_type == 'POP' && move.stacks[0] == name) || (move_type == 'FLIP' && move.stacks[0] == name) || (move_type == 'END TRANSFER 3' && (name == 'POPrev' || name == 'HEAD' || name == 'INS2' || name == 'POP2'));
                let copy = (move_type == 'BEGIN TRANSFER' && name == 'POP') || (move_type == 'END TRANSFER 1' && name == 'INS2') || (move_type == 'END TRANSFER 2' && name == 'POP2');
                let onlyLast = (move_type == 'PUSH' || move_type == 'POP' || move_type == 'FLIP');

                let s = exit ? move.old_queue[name] : move.new_queue[name];

                const elements = s.listAllElements();
                const elements_disp = elements.map((e, i) => {
                    let isLast = (i == elements.length - 1);
                    let affected = !onlyLast || (onlyLast && isLast);
                    let isHead = isLast && ((inTransferMode && name == "HEAD") || (!inTransferMode && name == "POP"));

                    let fade_class = "";
                    let color = "white";
                    let on_anim_end = () => { };

                    if (affected && enter) {
                        fade_class = "fade-in";
                        color = "aquamarine";
                    } else if (affected && exit) {
                        fade_class = "fade-out";
                        color = "indianred";
                        on_anim_end = (event) => { 
                            event.target.style.display = "none";
                            if (isHead && Queue.size(move.new_queue["HEAD"]) > 0) event.target.previousSibling.classList.add("head-elem"); // hacky :(
                        };
                    } else if (affected && copy) {
                        color = "deepskyblue";
                    } 
                    return (
                        <span className={fade_class} onAnimationEnd={on_anim_end} key={this.props.opNum + moveNum + i + name}>
                            <ArrowLeftOutlined />
                            <div
                                className={"element" + (isHead ? " head-elem" : "")}
                                style={{ backgroundColor: color }}
                                onAnimationEnd={(event) => {event.target.style.backgroundColor = "white";}}
                            >
                                {e}
                            </div>
                        </span>);
                });
                const nameHTML = stackNamesHTML[name];
                return (
                    <div className="stackDiv" key={move + "-" + name + "-stack"}>
                        <div className="element-null">&bull;</div>
                        {elements_disp}
                        <ArrowLeftOutlined /> <span className="stack-name">{nameHTML} </span>
                    </div>)
            }
        );
        const move_number = (
            <div>
                <StepBackwardOutlined onClick={() => setMoveNum(moveNum - 1)} /> {moveNum + 1}/{numMoves} <StepForwardOutlined onClick={() => setMoveNum(moveNum + 1, numMoves)} />
            </div>
        );
        const speed_select = (
            <div id="speed-select-div">
                Step mode: <Select onChange={this.onStepModeChange} style={{ width: 120 }} value={this.props.stepMode}>
                    <Option value="manual">Manual</Option>
                    <Option value="auto">Automatic</Option>
                    <Option value="end">Skip to End</Option>
                </Select>
            </div>
        );
        const speed_slider = (<div>
            Speed: <input type="range" id="speed-range" value={this.props.speed} onChange={this.onSpeedChange}></input>
        </div>
        );
        return (
            <div>
                {move_number}
                <p className="explanation"><i>{this.showExplanation()}</i></p>
                <div>
                    {stacks}
                </div>
                <div >
                    {speed_select}
                    {this.props.stepMode == "auto" && speed_slider}
                </div>
            </div>
        )
    }
}

export { StacksView }
