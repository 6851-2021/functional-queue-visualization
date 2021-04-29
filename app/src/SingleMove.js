import React from 'react'; 
import { Queue } from './functional'; 
import { ArrowLeftOutlined } from '@ant-design/icons';
import './App.css';



class SingleMove extends React.Component {
	constructor(props) {
        super(props); 
        this.state = {hidden: "hidden"}
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

    render() {
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
    } 
        
}

export { SingleMove }