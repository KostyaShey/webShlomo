import React, { Component } from 'react'
import AddRow from '../AddRow/AddRow'
import SumRow from '../SumRow/SumRow'
import TitleRow from '../TitleRow/TitleRow'
import './AllRowsOfType.css'
import InputRow from '../InputRow/InputRow'
import ItemRow from '../ItemRow/ItemRow'
import NoData from '../NoData/NoData'

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
                <div>  
                    <TitleRow name={this.props.typeOfData} />
                    Loading
                </div>
            )
        } else if (this.props.data.length === 0) {
            return (
                <div>
                    <TitleRow name={this.props.typeOfData} />
                    <NoData 
                        type={this.props.typeOfData}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        date={this.props.date}
                        />
                </div>
            )
        } else {
            return (
                <div>
                    <TitleRow name={this.props.typeOfData} />
                    {this.props.data.map(item => <ItemRow
                        item={item}
                        typeOfData={this.props.typeOfData}
                        deleteFromDB={this.props.deleteFromDB}
                        readFromDB={this.props.readFromDB}
                        updateInDB={this.props.updateInDB}
                        date={this.props.date}
                        key={item._id['$oid']} />)}
                    <SumRow data={this.props.data} />
                    {this.state.showAddRow && < AddRow
                        typeOfData={this.props.typeOfData}
                        changeVisibility={this.changeVisibility} />}
                    {this.state.showInputRow && <InputRow
                        changeVisibility={this.changeVisibility}
                        writeToDB={this.props.writeToDB}
                        readFromDB={this.props.readFromDB}
                        date={this.props.date}
                        typeOfData={this.props.typeOfData}/>}
                </div>
            )
        }
    }
}
