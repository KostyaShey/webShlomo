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
    

    render() {

            return (
                <form>
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
                                style={{fontFamily: "FontAwesome"}} 
                                value="&#xf00c;" 
                                onClick={() => this.props.onClick('showAddRow')}/>
                            <input type="submit" 
                                style={{fontFamily: "FontAwesome"}} 
                                value="&#xf05e;" 
                                onClick={() => this.props.onClick('showAddRow')}/>
                        </div>
                    </div>
                </form>
            )
    }
}
