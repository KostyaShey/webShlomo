import React, { Component } from 'react'
import AddRow from '../AddRow/AddRow'
import ListOfItems from '../ListOfItems/ListOfItems'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'
import InputRow from '../InputRow/InputRow'

export default class AllRowsOfType extends Component {

    render() {
        return (
            <div>
                <TitleRow name={this.props.type} />
                <ListOfItems data={this.props.data} />
                <SumRow data={this.props.data} />
                {this.props.addRowVisibility && < AddRow 
                                                type={this.props.type} 
                                                onClick={this.props.changeVisibility}/>}
                {this.props.inputRowVisibility && <InputRow 
                                                onClick={this.props.changeVisibility}
                                                onSubmit={this.props.addRowToList}
                                                type={this.props.type} 
                                                data={this.props.data} />}
            </div>
        )
    }
}
