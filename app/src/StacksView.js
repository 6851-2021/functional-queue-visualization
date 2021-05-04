import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './App.css';
import { Stack } from './functional';

class StacksView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    showExplanation = () => {
        const move = this.props.move;
        let textStr = '';
        textStr += move.move_type;
        switch (move.move_type) {
            case 'PUSH':
                let pushStack = move.stacks[0];
                console.log(move.new_queue[pushStack]);
                let pushVal = Stack.head(move.new_queue[pushStack]);
                textStr += ' ' + pushVal + ' onto ' + pushStack;
                return textStr;
            case 'POP':
                let popStack = move.stacks[0];
                let popVal = move.new_queue[popStack].head();
                textStr += ' ' + (popVal - 1) + ' from ' + popStack;
                return textStr;
            case 'BEGIN TRANSFER':
                return textStr;
            case 'FLIP':
                let stack1 = move.stacks[0];
                let stack2 = move.stacks[1];
                textStr += ' stacks ' + stack1 + ' and ' + stack2;
                return textStr;
            case 'END TRANSFER':
                return textStr;
            case 'CREATE':
                return textStr;
            default:
                return textStr;
        }
    }

    render() {
        const move = this.props.move;
        const stackNames = this.props.stackNames;
        const stacks = stackNames.map(
            (name) => {
                const s = move.new_queue[name];
                return (<div className="stackDiv" style={{ backgroundColor: move.stacks.includes(name) ? 'aquamarine' : 'white', height: '40px' }}>
                    {name} stack: {s.listAllElements().map((e, i) =>
                        i > 0 ? <><ArrowLeftOutlined /><div className="element">{e}</div></> :
                            <div className="element"> {e}</div>
                    )}
                </div>)
            }
        );
        return (
            <div className={this.state.hidden}>
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