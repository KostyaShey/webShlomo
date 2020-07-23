import React, { Component } from 'react'
import './InputRow.css'

export default class InputRow extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             inputTitle: 'Input Title',
             inputValue: 'Input Value'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value});
    }

    get getDataFromInputs () {
        return {name: this.state.inputTitle, value: this.state.inputValue, id: this.props.data.length}
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.getDataFromInputs, this.props.type);
    }


    render() {

            return (
                <form onSubmit={this.handleSubmit}>
                    <div className="row noHover">
                        <div className="leftBorder"></div>  
                        <div className="inputTitle">
                            <input type="text"
                                name="inputTitle" 
                                value={this.state.inputTitle} 
                                onChange={this.handleChange}/>
                        </div>
                        <div className="inputValue">
                            <input type="value"
                                name="inputValue" 
                                value={this.state.inputValue} 
                                onChange={this.handleChange}/>
                            </div>
                        <div className="inputButtons">
                                <button>&#xf00c;</button>
                                <button type="button" onClick={this.props.changeVisibility}>&#xf05e;</button>
                        </div>
                    </div>
                </form>
            )
    }
}
