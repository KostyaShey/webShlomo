import React, { Component } from 'react'
import AddRow from '../AddRow/AddRow'
import ListOfItems from '../ListOfItems/ListOfItems'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'
import InputRow from '../InputRow/InputRow'

export default class AllRowsOfType extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             showAddRow: true,
             showInputRow: false,
        }
        this.changeVisibility = this.changeVisibility.bind(this);
        }

    changeVisibility (componentName) {
        if (componentName === 'showInputRow') {
            this.setState({showInputRow: !this.state.showInputRow})
            this.setState({showAddRow: !this.state.showAddRow})
        };
        if (componentName === 'showAddRow') {
            this.setState({showAddRow: !this.state.showAddRow})
            this.setState({showInputRow: !this.state.showInputRow})
        };
    }

    render() {
        return (
            <div>
                <TitleRow name={this.props.type} />
                <ListOfItems data={this.props.data} />
                <SumRow data={this.props.data} />
                {this.state.showAddRow && < AddRow 
                                                type={this.props.type} 
                                                onClick={this.changeVisibility}/>}
                {this.state.showInputRow && <InputRow 
                                                onClick={this.changeVisibility}
                                                onSubmit={this.props.addRowToList}
                                                type={this.props.type} 
                                                data={this.props.data} />}
            </div>
        )
    }
}
