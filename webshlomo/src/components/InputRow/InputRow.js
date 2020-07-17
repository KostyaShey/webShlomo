import React, { Component } from 'react'
import './InputRow.css'

export default class InputRow extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
             visible: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.setState({visible: !this.state.visible})
    }
    
    render() {
        return (
            <div className="row" style={{display: this.state.visible ? 'block' : 'none' }}>
                <div className="leftBorder"></div>
                <form>
                    <label className="title">
                        Name:
                        <input type="text" name="name" />
                    </label>
                    <label className="value">
                        Value:
                        <input type="text" name="value" />
                    </label>
                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
        )
    }
}
