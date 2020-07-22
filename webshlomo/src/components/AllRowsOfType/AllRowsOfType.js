import React, { Component } from 'react'
import AddRow from '../AddRow/AddRow'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'
import InputRow from '../InputRow/InputRow'
import ItemRow from '../ItemRow/ItemRow'

export default class AllRowsOfType extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             showAddRow: true,
             showInputRow: false,
        }
        this.changeVisibility = this.changeVisibility.bind(this);
        }

    changeVisibility () {

            this.setState({showInputRow: !this.state.showInputRow})
            this.setState({showAddRow: !this.state.showAddRow})

        }
    

    render() {
        return (
            <div>
                <TitleRow name={this.props.type} />
                {this.props.data.map(item => <ItemRow item={item} />)}
                <SumRow data={this.props.data} />
                {this.state.showAddRow && < AddRow 
                                                type={this.props.type} 
                                                changeVisibility={this.changeVisibility}/>}
                {this.state.showInputRow && <InputRow 
                                                changeVisibility={this.changeVisibility}
                                                onSubmit={this.props.addRowToList}
                                                type={this.props.type} 
                                                data={this.props.data} />}
            </div>
        )
    }
}
