import React from 'react';
import './App.css';
import { Button, Space, Input} from 'antd';
import "antd/dist/antd.css";

 const { Search } = Input;

class InputComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handlePush = this.handlePush.bind(this);
        this.handlePop = this.handlePop.bind(this);
    }


    handlePush(event) { 
	const value = this.state.value;
        this.props.push(value == '' ? '?' : value);
        this.setState({value: ''});
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handlePop () {
        this.props.pop();
    }

    render() {
        return (
            
            <div className="functions">
            <Space direction="horizontal">
                <Search
                    placeholder="input number to insert"
                    allowClear
                    enterButton="Insert"
                    size="medium"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onSearch={this.handlePush}
                    maxLength="2"
                />
                <Button type="primary" danger onClick={this.handlePop} disabled={this.props.disabled}>Delete</Button>
                
            </Space>
            </div>
        );
    }

}


export { InputComponent }
