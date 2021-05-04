import { ReactComponent } from '*.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (<div className="functions">
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input className="inputs" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input className="inputs" type="submit" value="Insert" />
            </form>

            <button onClick={this.pop}>Delete</button>
        </div>
        );
    }

}



