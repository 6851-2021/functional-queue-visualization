import React from 'react'; 
import { Queue } from './functional'; 
import { ArrowLeftOutlined } from '@ant-design/icons';
import './App.css';



class SingleMove extends React.Component {
	constructor(props) {
        console.log('in constructor');
        super(props); 
        this.state = {hidden: "hidden", loaded: false}
    }

	async componentDidMount() {
        var that = this;
		await setTimeout(async function() {
            await that.hidePrevMove(); 
			await that.show();
		}, that.props.wait);
        console.log(that.props);
        this.setState({loaded: true});
	}

    hidePrevMove = () => {
        if (document.getElementById(this.props.id-1)) {
            console.log('here & now hiding id: ', this.props.id-1);
            document.getElementById(this.props.id-1).style.visibility = "hidden";
        }
    }

	show = () => {
		this.setState({hidden : ""});
	}

    hide = () => {
		this.setState({hidden : "hidden"});
	}

    render() {
        if (this.state.loaded) {
            return (
                <div className={this.state.hidden} id={this.props.id}>
                    {this.props.stackArr.map((s, j) => 
                        <div className="stackDiv">
                            {this.props.stackNames[j]}: {s.listAllElements().map((e, i) => 
                            i > 0 ? <><ArrowLeftOutlined /><div className="element">{e}</div></> : 
                                    <div className="element"> {e}</div>
                            )}
                        </div>
                    )}
                </div>
            )
        } else {
            return (<h1>Loading...</h1>)
        }    
    }
}

export { SingleMove }