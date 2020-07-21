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

    render() {

            return (
                <form onSubmit={() => this.props.onSubmit(this.getDataFromInputs, this.props.type)}>
                    <div className="row noHover ">
                        <div className="leftBorder"></div>  
                        <div className="inputTitle">
                            <input type="text"
                                name="inputTitle" 
                                value={this.state.inputTitle} 
                                onChange={this.handleChange}/>
                        </div>
                        <div className="inputValue">
                            <input type="text"
                                name="inputValue" 
                                value={this.state.inputValue} 
                                onChange={this.handleChange}/>
                            </div>
                        <div className="inputButton">
                            <input type="submit"
                                name="submit" 
                                style={{fontFamily: "FontAwesome"}} 
                                value="&#xf00c;" 
                                />
{/*                             <input type="submit"
                                name="cancel"  
                                style={{fontFamily: "FontAwesome"}} 
                                value="&#xf05e;" 
                                /> */}
                        </div>
                    </div>
                </form>
            )
    }
}
