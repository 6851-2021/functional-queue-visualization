import React from 'react';
import './App.css';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handlePush = this.handlePush.bind(this);
        this.handlePop = this.handlePop.bind(this);
    }


    handlePush(event) {
        event.preventDefault();
        this.props.push(this.state.value);
        this.setState({value: ''});
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handlePop (event) {
        this.props.pop();
    }

    render() {
        return (
            <div className="functions">
                <form onSubmit={this.handlePush}>
                    <label>
                        <input className="inputs" type="text" value={this.state.value} onChange={this.handleChange} maxLength="2"/>
                    </label>
                    <input className="inputs" type="submit" value="Insert" />
                </form>

                <button onClick={this.handlePop}>Delete</button>
            </div>
        );
    }

}


export { Input }
