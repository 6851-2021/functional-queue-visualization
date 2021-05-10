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
    }

    showExplanation = () => {
        const move = this.props.move;
        switch (move.move_type) {
            case 'PUSH':
                let pushStack = move.stacks[0];
                console.log(move.new_queue[pushStack]);
                let pushVal = Stack.head(move.new_queue[pushStack]);
                return (<>Push {pushVal} onto {stackNamesHTML[pushStack]}</>);
            case 'POP':
                let popStack = move.stacks[0];
                let popVal = Stack.head(move.new_queue[popStack]);
                return (<>Pop {popVal} from {stackNamesHTML[popStack]}</>);
            case 'BEGIN TRANSFER':
                return (<>Enter transfer mode</>)
            case 'FLIP':
                let stack1 = move.stacks[0];
                let stack2 = move.stacks[1];
                let val = Stack.head(move.new_queue[stack2]);
                return (<>Move {val} from {stackNamesHTML[stack1]} to {stackNamesHTML[stack2]}</>);
            case 'END TRANSFER':
                return (<>End transfer mode</>);
            case 'CREATE':
                return <>Create queue</>;
            default:
                return <>Unknown move</>;
        }
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
                    <div className="stackDiv" style={{ backgroundColor: move.stacks.includes(name) ? 'aquamarine' : 'white', height: '40px' }}>
                        {nameHTML}:
                        {s.listAllElements().map((e, i) =>
                            i > 0 ? <><ArrowLeftOutlined /><div className="element">{e}</div></> :
                                <div className="element"> {e}</div>
                        )}
                    </div>)
            }
        );
        const move_number = (
            <div>
                <StepBackwardOutlined onClick={() => setMoveNum(moveNum - 1)} /> {moveNum + 1}/{numMoves} <StepForwardOutlined onClick={() => setMoveNum(moveNum + 1)} />
            </div>
        );
        return (
            <div>
                {move_number}
                <p className="explanation">{this.showExplanation()}</p>
                {/* <div className={this.state.hidden2}> */}
                <div>
                    {stacks}
                </div>
            </div>
        )
    }

}

export { StacksView }
