import React from 'react';
import { Button, Space, Input} from 'antd';
import './App.css';
import "antd/dist/antd.css";

 const { Search } = Input;

class InputComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleEnqueue = this.handleEnqueue.bind(this);
        this.handleDequeue = this.handleDequeue.bind(this);
    }


    handleEnqueue(event) { 
	    const value = this.state.value;
        this.props.push(value == '' ? '?' : value);
        this.setState({value: ''});
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleDequeue () {
        this.props.pop();
    }

    render() {
        return (
            
            <div className="functions">
            <Space direction="horizontal">
                <Search
                    placeholder="input number to insert"
                    enterButton="Enqueue"
                    size="medium"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onSearch={this.handleEnqueue}
                    maxLength="2"
                />
                <Button type="primary" danger onClick={this.handleDequeue} disabled={this.props.disabled}>Dequeue</Button>
                
            </Space>
            </div>
        );
    }

}


export { InputComponent }
