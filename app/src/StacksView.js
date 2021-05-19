import React from 'react';
import { ArrowLeftOutlined, ConsoleSqlOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import './App.css';
import { Stack } from './functional';
import { Select } from 'antd';
import "antd/dist/antd.css";

const { Option } = Select;

const stackNames = ['INS', 'POP', 'POPrev', 'POP2', 'INS2', 'HEAD'];
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
                console.log(move.new_queue[pushStack]);
                return (<>Push {move.val} onto <span className="stack-name-expl">{stackNamesHTML[pushStack]}</span></>);
            case 'POP':
                let popStack = move.stacks[0];
                return (<>Pop {move.val} from <span className="stack-name-expl">{stackNamesHTML[popStack]}</span></>);
            case 'BEGIN TRANSFER':
                return (<>Enter transfer mode</>)
            case 'FLIP':
                let stack1 = move.stacks[0];
                let stack2 = move.stacks[1];
                return (<>Move {move.val} from <span className="stack-name-expl">{stackNamesHTML[stack1]}</span> to <span className="stack-name-expl">{stackNamesHTML[stack2]}</span></>);
            case 'END TRANSFER':
                return (<>End transfer mode</>);
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
        console.log("move: ", move);
        const moveNum = this.props.moveNum;
        const numMoves = this.props.numMoves;
        const setMoveNum = this.props.setMoveNum;
        const stacks = stackNames.map(
            (name) => {

                let enter = (move_type == 'PUSH' && move.stacks[0] == name) || (move_type == 'FLIP' && move.stacks[1] == name);
                let exit = (move_type == 'POP' && move.stacks[0] == name) || (move_type == 'FLIP' && move.stacks[0] == name);

                let s = exit ? move.old_queue[name] : move.new_queue[name];

                const elements = s.listAllElements();
                const elements_disp = elements.map((e, i) => {
                    let isLast = (i == elements.length - 1);
                    let affected = (move_type == 'PUSH' || move_type == 'POP' || move_type == 'FLIP') && isLast;
                    let fade_class = "";
                    let color = "white";
                    let on_anim_end = () => { };
                    if (affected && enter) {
                        fade_class = "fade-in";
                        color = "aquamarine";
                    } else if (affected && exit) {
                        fade_class = "fade-out";
                        color = "red";
                        on_anim_end = (event) => { event.target.style.display = "none"; };
                    }
                    console.log("meow", move + moveNum + i + name);
                    return (
                        <span className={fade_class} onAnimationEnd={on_anim_end} key={this.props.opNum + moveNum + i + name}>
                            <ArrowLeftOutlined />
                            <div
                                className="element"
                                style={{ backgroundColor: color }}>
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
                <p className="explanation" style={{ height: '25px' }}>{this.showExplanation()}</p>
                {/* <div className={this.state.hidden2}> */}
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
