import React from 'react';
import { ArrowLeftOutlined, StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons';
import './App.css';
import { Stack } from './functional';

const stackNames = ['INS', 'POP', 'POPrev', 'POP2', 'INS2', 'HEAD'];
const stackNamesHTML = {'INS': (<>INS</>),
                        'POP': (<>POP</>),
                        'POPrev': (<>POP<sub>rev</sub></>),
                        'POP2': (<>POP<sub>2</sub></>),
                        'INS2': (<>INS<sub>2</sub></>),
                        'HEAD': (<>HEAD</>)};
class StacksView extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        this.onSpeedChange = this.onSpeedChange.bind(this);
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
                let popVal = Stack.head(move.new_queue[popStack]);
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
                return <>Unknown move</>;
        }
    }

    onSpeedChange(event) {
        this.props.setSpeed(event.target.value);
    }

    render() {
        const move = this.props.move;
        
        
        const moveNum = this.props.moveNum;
        const numMoves = this.props.numMoves;
        const setMoveNum = this.props.setMoveNum;
        const stacks = stackNames.map(
            (name) => {
                const s = move.new_queue[name];
                const nameHTML = stackNamesHTML[name];
                return (
                    <div className="stackDiv" style={{ backgroundColor: move.stacks.includes(name) ? 'aquamarine' : 'white', height: '40px', textAlign: 'right' }}>
                        <div className="element-null">&bull;</div>
                        {s.listAllElements().map((e, i) =>
                            <><ArrowLeftOutlined /><div className="element">{e}</div></>
                        )}
                        <ArrowLeftOutlined /> <span className="stack-name">{nameHTML} </span>
                    </div>)
            }
        );
        const move_number = (
            <div>
                <StepBackwardOutlined onClick={() => setMoveNum(moveNum - 1)} /> {moveNum + 1}/{numMoves} <StepForwardOutlined onClick={() => setMoveNum(moveNum + 1)} />
            </div>
        );
        const speed_select = (
            <div id="speed-select-div">
                Step speed: <select onChange={this.onSpeedChange}>
                    <option value="manual">Manual</option>
                    <option value="auto">Automatic (TODO)</option>
                    <option value="end">Skip to End</option>
                </select>
            </div>
        );
        return (
            <div>
                {move_number}
                <p className="explanation" style={{height: '25px'}}>{this.showExplanation()}</p>
                {/* <div className={this.state.hidden2}> */}
                <div>
                    {stacks}
                </div>
                {speed_select}
            </div>
        )
    }

}

export { StacksView }
