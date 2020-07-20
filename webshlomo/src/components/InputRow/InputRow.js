import React, { Component } from 'react'
import './InputRow.css'

export default class InputRow extends Component {
    
    render() {

            return (
                <form>
                    <div className="row noHover ">
                        <div className="leftBorder"></div>  
                        <div className="inputTitle">
                            <input type="text" name="inputTitle" value="Title"/>
                        </div>
                        <div className="inputValue">
                            <input type="text" name="value" value="Value €"/>
                            </div>
                        <div className="inputButton">
                            <input type="submit" style={{fontFamily: "FontAwesome"}} value="&#xf00c;" onClick={() => this.props.onClick('showAddRow')}/>
                        </div>
                    </div>
                </form>
            )
    }
}
