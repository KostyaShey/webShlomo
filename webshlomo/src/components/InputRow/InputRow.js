import React, { Component } from 'react'
import './InputRow.css'

export default class InputRow extends Component {
    
    render() {

            return (
                <div className="row">
                    <div className="leftBorder"></div>
                    <form>
                        <div className="inputTitle">
                            <input type="text" name="inputTitle" className="title"/>
                        </div>
                        <div>
                            <input type="text" name="value" />
                        </div>
                        <div>
                            <input type="submit" value="Submit" className="button" onClick={() => this.props.onClick('showAddRow')}/>
                        </div>
                    </form>
                </div>
            )
    }
}
