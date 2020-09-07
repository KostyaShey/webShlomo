import React, { Component } from 'react'
import './InputRow.css'

export default class InputRow extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputTitle: '',
            inputValue: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    get getDataFromInputs() {
        return { name: this.state.inputTitle, value: parseInt(this.state.inputValue) }
    }

    handleSubmit(event) {
        event.preventDefault(); // prevendDefault disables the devault requests on submit.
        var data = this.getDataFromInputs;
        this.setState({
            inputTitle: '',
            inputValue: ''
        });
        this.props.onSubmit(data, this.props.type)

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row noHover">
                    <div className="leftBorder"></div>
                    <div className="inputTitle">
                        <input type="text"
                            name="inputTitle"
                            placeholder="Input Title"
                            onChange={this.handleChange} />
                    </div>
                    <div className="inputValue">
                        <input type="number"
                            name="inputValue"
                            placeholder="Input Value"
                            onChange={this.handleChange} />
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
