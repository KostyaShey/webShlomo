import React, { Component } from 'react'
import './InputRow.css'

export default class InputRow extends Component {
    
    render() {

            return (
                <div className="row">
                    <div className="leftBorder"></div>
                    <form>
                        <div className="inputTitle">
                        <label>
                            <input type="text" name="name" className="title"/>
                        </label>
                        </div>
                        <label className="value">
                            <input type="text" name="value" />
                        </label>
                        <input type="submit" value="Submit" className="button" onClick={() => this.props.onClick('showAddRow')}/>
                    </form>
                </div>
            )
    }
}
