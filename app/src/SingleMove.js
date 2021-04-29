import React from 'react'; 
import { ArrowLeftOutlined } from '@ant-design/icons';
import './App.css';

class SingleMove extends React.Component {
	constructor(props) {
        super(props); 
        this.state = {hidden: "hidden", hidden2: "hidden"}
    }

	componentDidMount() {
        var that = this;
        // setTimeout(function () {
        //     that.show();
        // }, that.props.wait);
		// setTimeout(function() {
		//     that.showLater();
		// }, that.props.wait);
        setTimeout(function () {
            that.show();
        }, that.props.wait);
	}

    componentDidUpdate() {
        var that = this;
        if (document.getElementById(that.props.id-1)) {
            document.getElementById(that.props.id-1).style.display = "none"; 
        }
    }

	show = () => {
		this.setState({hidden : ""});
	}

    hide = () => {
		this.setState({hidden : "hidden"});
	}

    showLater = () => {
        this.setState({hidden2: ""});
    }

    showExplanation = () => {
        let textStr = ''; 
        textStr += this.props.explanation; 
        switch (this.props.explanation) {
            case 'PUSH':
                let pushStack = this.props.stackChanges[0]; 
                let pushVal = this.props.newQueue[pushStack].val; 
                textStr += ' ' + pushVal + ' onto ' + pushStack; 
                return textStr; 
            case 'POP': 
                let popStack = this.props.stackChanges[0]; 
                let popVal = this.props.newQueue[popStack].val; 
                textStr += ' ' + (popVal-1) + ' from ' + popStack; 
                return textStr; 
            case 'BEGIN TRANSFER': 
                textStr = textStr; 
                return textStr; 
            case 'FLIP': 
                let stack1 = this.props.stackChanges[0];
                let stack2 = this.props.stackChanges[1];
                textStr += ' stacks ' + stack1 + ' and ' + stack2; 
                return textStr; 
            case 'END TRANSFER': 
                textStr = textStr; 
                return textStr; 
            default: 
                return textStr; 
        } 
    }

    render() {
        return (
            <div className={this.state.hidden} id={this.props.id}>
                <p className="explanation">{this.showExplanation()}</p>
                {/* <div className={this.state.hidden2}> */}
                <div>
                    {this.props.stackArr.map((s, j) => 
                    {
                        return (<div className="stackDiv" style={{backgroundColor: this.props.stackChanges.includes(this.props.stackNames[j]) ? 'aquamarine' : 'white', height: '40px'}}>
                            {this.props.stackNames[j]} stack: {s.listAllElements().map((e, i) => 
                            i > 0 ? <><ArrowLeftOutlined /><div className="element">{e}</div></> : 
                                    <div className="element"> {e}</div>
                            )}
                        </div>)}
                    )}
                </div>
            </div>
        )
    } 
        
}

export { SingleMove }