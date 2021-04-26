import React from 'react'; 
import { ArrowLeftOutlined } from '@ant-design/icons';
import './App.css';



class SingleMove extends React.Component {
	constructor(props) {
        super(props); 
        this.state = {hidden: "hidden", display_state:"hide-initial"}
    }

	componentDidMount() {
        var that = this;
		setTimeout(function() {
            // if (that.props && that.props.prevMove) {
            //     console.log('prevMove: ', that.props.prevMove); 
            //     let pMove = that.props.prevMove;
            //     pMove.hide(); 
            // }           
			that.show();
            //that.setState({display_state:"show"});
		}, that.props.wait);
        console.log(that.props);
	}

    componentDidUpdate() {
        var that = this;
        if (document.getElementById(that.props.id-1)) {//&& this.state.display_state === "show") {
            console.log('here & now hiding id ', that.props.id-1); 
            // console.log(document.getElementById(that.props.id-1).style); 
            document.getElementById(that.props.id-1).style.display = "none"; 
            //that.setState({display_state:"hide"});
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