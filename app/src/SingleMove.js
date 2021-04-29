import React from 'react'; 
import { ArrowLeftOutlined } from '@ant-design/icons';
import './App.css';



class SingleMove extends React.Component {
	constructor(props) {
        super(props); 
        this.state = {hidden: "hidden"}
    }

	componentDidMount() {
        var that = this;
		setTimeout(function() {
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