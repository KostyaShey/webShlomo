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

    changeVisibility() {

        this.setState({ showInputRow: !this.state.showInputRow })
        this.setState({ showAddRow: !this.state.showAddRow })

    }

    render() {
        if (this.props.loading === true) {
            return (
                <div>Loading</div>
            )
        } else {
            return (
                <div>
                    <TitleRow name={this.props.type} />
                    {this.props.data.map(item => <ItemRow
                        item={item}
                        removeRowFromList={this.props.removeRowFromList}
                        typeOfData={this.props.type}
                        deleteFromDB={this.props.deleteFromDB}
                        readFromDB={this.props.readFromDB}
                        key={item._id['$oid']} />)}
                    <SumRow data={this.props.data} />
                    {this.state.showAddRow && < AddRow
                        type={this.props.type}
                        changeVisibility={this.changeVisibility} />}
                    {this.state.showInputRow && <InputRow
                        changeVisibility={this.changeVisibility}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        type={this.props.type}/>}
                </div>
            )
        }
    }
}
