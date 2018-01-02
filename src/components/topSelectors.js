import React from 'react';
import {connect} from 'react-redux';
import actionsMap from './data/actionsMap';
var d3 = require("d3");

class topSelector extends React.Component {

    constructor(props) {
        super(props);
        this.channelChange = this
            .channelChange
            .bind(this);
    }

    channelChange(event) {
        let value = event.target.value
        console.log(this.props)
        var filter = this.props.filter
        var action = actionsMap[filter]
        this
            .props
            .dispatch(action(value));
    }

    buildOptions() {
        var obj = this.props.dfData
        var filter = this.props.filter
        // individual values contained in the dimension
        var dimVals = obj.map(row => {
            return row[filter]
        })
        // find the unique values
        var uniques = d3
            .set(dimVals)
            .values()
        let options = uniques.map(val => {
            return <option value={val}>{val}</option>
        })
        return options
    }

    render() {
        return <div className="col-md-2 tile">
            <label className="control-label" style={this.props.labelStyle}>
                {this.props.label}
            </label>
            <select
                className="form-control"
                onChange={this.channelChange}
                selected="All"
                style={this.props.selectStyle}>
                <option value="All">All</option>
                {this.buildOptions()}
            </select>
        </div>;
    }

}

// Function to export the state to redux
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(topSelector);
